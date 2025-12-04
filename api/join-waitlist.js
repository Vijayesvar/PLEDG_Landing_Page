import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

const WaitlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    amount: { type: String, required: true },
    term: { type: String, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation error in development
const Waitlist = mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { name, email, phone, amount, term, notes } = req.body;

        if (!name || !phone || !amount || !term) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newEntry = new Waitlist({
            name,
            email,
            phone,
            amount,
            term,
            notes,
        });

        await newEntry.save();

        res.status(201).json({ message: 'Successfully joined waitlist' });
    } catch (error) {
        console.error('Waitlist API Error:', error);
        res.status(500).json({ message: `Internal server error: ${error.message}`, error: error.message });
    }
}

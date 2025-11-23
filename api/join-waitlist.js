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

// Define Schema
const WaitlistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    source: {
        type: String,
        default: 'website',
    }
});

// Prevent model recompilation error in development
const Waitlist = mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);

export default async function handler(request, response) {
    const { method } = request;

    await dbConnect();

    if (method === 'POST') {
        try {
            const { email } = request.body;

            if (!email) {
                return response.status(400).json({ success: false, message: 'Email is required' });
            }

            // Check if email already exists
            const existingUser = await Waitlist.findOne({ email });
            if (existingUser) {
                return response.status(200).json({ success: true, message: 'You are already on the waitlist!' });
            }

            const newEntry = await Waitlist.create({ email });
            return response.status(201).json({ success: true, data: newEntry });
        } catch (error) {
            console.error('Waitlist API Error:', error);
            return response.status(400).json({ success: false, message: error.message });
        }
    } else {
        return response.status(405).json({ success: false, message: 'Method not allowed' });
    }
}

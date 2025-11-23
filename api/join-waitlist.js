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
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
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
        phone: {
            type: String,
            trim: true,
        },
        amount: {
            type: String,
            required: [true, 'Please provide a loan amount'],
            trim: true,
        },
        term: {
            type: String,
            required: [true, 'Please select a loan term'],
            trim: true,
        },
        notes: {
            type: String,
            trim: true,
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
                const { name, email, phone, amount, term, notes } = request.body;

                if (!email || !name || !amount || !term) {
                    return response.status(400).json({ success: false, message: 'Please fill in all required fields' });
                }

                // Check if email already exists
                const existingUser = await Waitlist.findOne({ email });
                if (existingUser) {
                    return response.status(200).json({ success: true, message: 'You are already on the waitlist!' });
                }

                const newEntry = await Waitlist.create({
                    name,
                    email,
                    phone,
                    amount,
                    term,
                    notes
                });

                return response.status(201).json({ success: true, data: newEntry });
            } catch (error) {
                console.error('Waitlist API Error:', error);
                return response.status(400).json({ success: false, message: error.message });
            }
        } else {
            return response.status(405).json({ success: false, message: 'Method not allowed' });
        }
    }

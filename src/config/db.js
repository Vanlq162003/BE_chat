import mongoose from 'mongoose';

export async function connectToDatabase() {
    try {
        const uri = process.env.MONGO_URL;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

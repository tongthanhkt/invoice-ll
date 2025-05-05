import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the User model
export default mongoose.models.User || mongoose.model('User', userSchema); 
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} }
}, { minimize: false });

// Delete the cached model to force reload with new schema
if (mongoose.models.User) {
    delete mongoose.models.User;
}

const User = mongoose.model('User', userSchema);

export default User;
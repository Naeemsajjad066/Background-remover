import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    photo: { type: String, required : false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    creditBalance: { type: Number, default: 5 },
})

const userModel = mongoose.models.user || mongoose.model('User', userSchema)
export default userModel;
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Add a name']
    },
    email:{
        type: String,
        require: [true, 'Add a email'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'Add a password']
    },
},
{
    timestamps: true
})

export const User = mongoose.model('User', userSchema)
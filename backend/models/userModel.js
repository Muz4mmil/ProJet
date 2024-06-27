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
    image:{
        type: String,
        require: [true, 'Add a image']
    }
},
{
    timestamps: true
})

export const User = mongoose.model('User', userSchema)
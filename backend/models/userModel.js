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
    },
    picture:{
        type: String,
    },
    saved: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
})

export const User = mongoose.model('User', userSchema)
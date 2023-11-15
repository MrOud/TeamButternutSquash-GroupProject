import mongoose from 'mongoose'


const NewsSchema = new mangoose.Schema ( {
    eventDate: {
        type: Date, 
        trim: true, 
        default: Date.now
    }, 

    playerRef: {
        type : String, 
        trim: true,
        required: 'player ID required'
    }, 

    message: {
        type: String,
        trim: true,
        required: 'message required'
    }
})
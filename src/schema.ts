import * as mongoose from 'mongoose';

const FeedSchema = new mongoose.Schema({
    name: String,
    url: String,
    added: {
        type: Date,
        default: Date.now()
    },
    id: String
})

export const Feed = mongoose.model('Feed', FeedSchema);
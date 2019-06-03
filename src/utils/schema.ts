import * as mongoose from 'mongoose';

const FeedSchema = new mongoose.Schema({
    name: String,
    url: String,
    last_updated: {
        type: Date,
        default: Date.now()
    },
    id: String
})

export const Feed = mongoose.model('Feed', FeedSchema);

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    content_snippet : String,
    link: String
})

export const Article = mongoose.model('Article', ArticleSchema);

const LogSchema = new mongoose.Schema({
    description: String,
    type: {
        type: String,
        enum: ['INFO','ERROR','SUCCESS'],
        default: 'INFO'
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

export const Log = mongoose.model('Log', LogSchema);
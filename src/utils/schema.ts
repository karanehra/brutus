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

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    content_snippet : String,
    link: String
})

export const Article = mongoose.model('Article', ArticleSchema);
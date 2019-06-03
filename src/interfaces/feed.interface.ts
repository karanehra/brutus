import { Document } from "mongoose";

export default interface FeedType extends Document {
    url: string
}
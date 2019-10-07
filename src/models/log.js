import { Schema, model } from "mongoose";

const logSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  logType: {
    type: String,
    enum: ["SUCCESS", "ERROR", "INFO", "FATAL"]
  },
  tag: String
});

const Log = model("Log", logSchema);

export default Log;

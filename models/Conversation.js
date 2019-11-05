const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import dbConnection from "./../db/mongoose";

const ConversationSchema = new Schema(
    {
        senderId :  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        recipientId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

module.exports = dbConnection.model("Conversation", ConversationSchema);
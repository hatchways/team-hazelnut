import Conversation from "../models/Conversation";
import Message from "../models/Message";
import Profile from "../models/Profile";


// POST a conversation (new conversation)
module.exports.createConversation = function(req, res, next) {
    const conversation = new Conversation({
        senderId : req.user,
        recipientId : req.body.recipientId,
    });
    if (!conversation.recipientId) {
        return res.status(400).json({ message: "Please select recipient"});
    } else {
        conversation.save(function(err, conversation){
            if (err) return next(err);
            res.json(conversation);
        });
    }
};

module.exports.getConversations = function(req, res, next) {
    var arr = [];
    Conversation.find({ senderId: req.user })
        .populate("recipientId")
        .exec(function(err, conversations){
            if (err) return next(err);
            conversations.map(item => {
                Profile.find({ userId: item["recipientId"]["_id"] }, function(err, profile) {
                    if (err) return next(err);
                    const inside = [];
                    inside.push(item);
                    inside.push(profile[0]);
                    arr.push(inside);
                });
            });
            res.json(conversations);
        });
};


// POST /conversation/:conversation_id/message (new message)
module.exports.createMessage = function(req, res, next) {
    const message = new Message({
        conversationId: req.body.conversationId,
        userId: req.user,
        body: req.body.body
    });
    if (message.conversationId && message.body) {
        message.save(function(err, conversation){
            if (err) return next(err);
            res.json(conversation);
        });
    } else {
        return res.status(400).json({ message: "Please enter conversationId and message"});
    }
};


// GET /conversation/:conversation_id (body list of messages sent already)
module.exports.getMessages = function(req, res, next) {
    Message.find({ "conversationId": req.params.conversation_id })
        .populate('conversationId') 
        .populate("userId")
        .exec(function(err, message){
            if(err) return next(err);
            res.json(message);
        });
};


// DELETE /conversation/:conversation_id 
module.exports.deleteConversation = function(req, res, next) {
  Conversation.remove({ _id: req.params.conversation_id}, function(err, conversation){
      if (err) return next(err);
      res.json({ message: "successfully deleted" });
  });
}
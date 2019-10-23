var express = require("express");
var router = express.Router();
const authenticate = require("./utils/auth");

var conversation_controller = require("../controllers/conversationController");


router.post("/", authenticate, conversation_controller.createConversation);
router.get("/list", conversation_controller.getConversations);
router.post("/:conversation_id/message", authenticate, conversation_controller.createMessage);
router.get("/:conversation_id", conversation_controller.getMessages);

router.delete("/delete/:conversation_id", conversation_controller.deleteConversation);

module.exports = router;
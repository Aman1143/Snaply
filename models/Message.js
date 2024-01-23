import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
	conversationId: {
		type: String,
	  },
	  sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref:"User",
	  },
	  text: {
		type: String,
	  },
	},
	{ timestamps: true }


)

const Message=new mongoose.model("Message",messageSchema);
export default Message;
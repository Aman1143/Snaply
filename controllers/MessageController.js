import Message from '../models/Message.js';
export const addChat = async (req, res) => {
	try {
		const saveDMessage = await Message.create({
			conversationId: req.body.conversationId,
			sender: req.body.sender,
			text: req.body.text,
		});
		await saveDMessage.save();
		console.log(saveDMessage);
		res.status(200).json(saveDMessage);
	} catch (error) {
		res.status(500).json(error);
	}
}


export const getMesage = async (req, res) => {
	// console.log("kjdffjg");
	// console.log(req.params);
	try {
		let mesage = await Message.find({
			conversationId: req.params.conversationId
		}).populate('sender');
		// console.log(mesage);
		res.status(200).json({mesage,message:"okk"});
	} catch (error) {
		res.status(500).json({error,message:"Internal Server Error"});
	}
}
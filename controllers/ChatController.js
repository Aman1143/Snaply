import Chat from '../models/Chat.js'


export const newChat = async (req, res) => {
	try {
		const newC = await Chat({
			members: [req.body._id, req.body.receivedId],
		})
		const savedChat = await newC.save();
		// console.log(savedChat);
		res.status(200).json(savedChat);
	} catch (error) {
		req.status(500).json(error);
	}
}

export const chatUser = async (req, res) => {
	try {
		// console.log(req.params);
		const userChat = await Chat.find({
			members: { $in: [req.params.userId] },
		})
		// console.log(userChat);
		res.status(200).json(userChat);
	} catch (error) {
		res.status(500).json(error);
	}
}

export const bothUserChat = async (req, res) => {
	try {
		const chat = await Chat.findOne({
			members: { $all: [req.params.firstUserId, req.params.secondUserId] },
		})

		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json(error);
	}
}
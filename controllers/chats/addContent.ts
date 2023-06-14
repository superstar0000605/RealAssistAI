import Chat from "../../models/chat";
import { IContent } from "../../types";
import { validationResult } from "express-validator";

export default async (req, res) => {
	const errors = validationResult(req.body);

	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	const chatId = req.body.chatId;
	try {
		const chat = await Chat.findById(chatId);
		if (!chat) {
			return res.status(404).json({ errors: [{ msg: "chat not found" }] });
		}

		const content: IContent = {
			aicontent: req.body.aicontent,
			usercontent: req.body.usercontent
		};

		const newContents = [...chat.contents, content];

		chat.contents = newContents;
		await chat.save();

		res.status(201).json(chat);
	} catch (error) {
		console.log(error);
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "invalid objectId" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};

import { validationResult } from "express-validator";
import Chat, { ChatDocument } from "../../models/chat";
import { IChat } from "../../types";

export default async (req, res) => {
	const errors = validationResult(req.body);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const newChat: IChat = {
			name: req.body.name,
			contents: req.body.contents,
		};
		const newChatDoc: ChatDocument = new Chat(newChat);
		await newChatDoc.save();

		res.status(201).json(newChatDoc);
	} catch (err) {
		console.log(err);
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};

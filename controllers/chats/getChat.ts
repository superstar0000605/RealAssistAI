import { Request, Response } from "express";
import Chat from "../../models/chat";

export default async (req: Request, res: Response) => {
	const chatId = req.params.id;
    console.log("111",chatId)
	try {
		const chat = await Chat.findById(chatId);

		if (!chat) {
			return res.status(404).json({ errors: [{ msg: "chat not found" }] });
		}

		res.status(200).json(chat);
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "invalid objectId" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};

import { Request, Response } from "express";
import Chat from "../../models/chat";

export default async (req: Request, res: Response) => {
	try {
		const chats = await Chat.find();
		res.json(chats);
	} catch (error) {
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};

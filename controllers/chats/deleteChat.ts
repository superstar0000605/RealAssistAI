import { Request } from "express";
import { Document } from "mongoose";
import Chat from "../../models/chat";

export default async (req, res) => {
	const chatId = req.params.id as string;
	try {
		const chatToDelete = await Chat.findById(chatId);
		if (!chatToDelete) {
			return res.status(404).json({
				errors: [{ msg: "post doesn't exist or no longer available." }],
			});
		}
		await chatToDelete.deleteOne();
		res.status(200).json({ msg: "deleted successfully" });
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "invalid objectId" }] });
		}
		res.status(500).json({ errors: [{ msg: "server error" }] });
	}
};

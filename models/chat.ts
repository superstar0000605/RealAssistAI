import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";
import { IChat } from "../types";
const chatSchema = new Schema({
	name: String,
	contents: [
		{
			aicontent: String,
			usercontent: String,
			companyname: String,
			companydescription: String,
			date: {
				type: Date,
				default: Date.now(),
			},
		},
	],
	date: {
		type: Date,
		default: Date.now(),
	},
});
export interface ChatDocument extends Document, IChat {}

export default model<ChatDocument>("Chat", chatSchema);

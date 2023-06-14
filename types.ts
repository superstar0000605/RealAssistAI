import { ObjectId } from "mongodb";

export interface IChat {
	name: String;
    contents: IContent[];
    date?: Date;
}

export interface IContent {
    aicontent: String;
    usercontent: String;
    date?: Date;
}

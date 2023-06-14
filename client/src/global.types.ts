export interface ContentType {
	_id?: string;
	aicontent: string;
	usercontent: string;
	companyname?: string;
	companydescription?: string;
	date?: string;
}

export interface ChatType {
	_id?: string;
	name: string;
	contents: ContentType[];
	date?: string;
}
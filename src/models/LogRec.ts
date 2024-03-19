import { Document } from "mongoose";
import MongoDbHelper from "../helpers/mongoHelper";

export interface ILogRec {
	Created?: string;
	UserID: string;
	Msg: string;
	Data: string;
}

export class LogRec implements ILogRec {
	Created?: string = "";
	UserID: string = "";
	Msg: string = "";
	Data: string = "";

	constructor(data?: LogRec | string) {
		if (data) {
			if (typeof data !== "object") data = JSON.parse(data);
			Object.assign(this, data);
		} else {
		}
	}
}

export const LogRecSchema = MongoDbHelper.generateSchemaFromInterface(new LogRec());

export interface LogRecDoc extends ILogRec, Document {}

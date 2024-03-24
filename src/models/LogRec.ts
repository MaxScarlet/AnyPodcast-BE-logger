import { Document } from "mongoose";
import MongoDbHelper from "../helpers/mongoHelper";
import { LogLevel } from "./LogLevel";

export interface ILogRec {
	Created?: string;
	UserID: string;
	Msg: string;
	Data: string;
	LogType: LogLevel;
}

export class LogRec implements ILogRec {
	Created?: string = "";
	UserID: string = "";
	Msg: string = "";
	Data: string = "";
	LogType: number = 0;
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

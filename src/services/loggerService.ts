import { CrudApiService } from "../controllers/crudApiController";
import { IDbHelper } from "../helpers/IDbHelper";

import { LogRec, LogRecDoc } from "../models/LogRec";

export class LoggerService implements CrudApiService<LogRec> {
	constructor(private dbHelper: IDbHelper<LogRecDoc> | IDbHelper<LogRec>) {}

	async get_all(filter: any): Promise<LogRec[] | null> {
		const fields = ["Msg", "Data"];
		const sort = { Created: -1 };
		let items = await this.dbHelper.get_list<LogRec>(filter, fields, sort);
		const itemsStart = items.findIndex((item) => item.Msg.startsWith("=== "));
		items = items.slice(0, itemsStart + 1);
		// const responseTemp = items.map((itm) => {
		// 	const { __v, _id, ...resp } = itm;
		// 	return resp;
		// });
		// return responseTemp;
		return items;
	}

	async get(id: string): Promise<LogRec | null> {
		const item = await this.dbHelper.get<LogRec>(id);
		return item || null;
	}

	async create(item: LogRec): Promise<LogRec> {
		item.Created = new Date().toISOString();
		console.log("service", item);

		const response = await this.dbHelper.create<LogRec>(item);
		return response;
	}

	async update(id: string, updated: LogRec): Promise<LogRec | null> {
		const item = await this.dbHelper.update<LogRec>(id, updated);
		return item || null;
	}

	async delete(id: string): Promise<void> {
		await this.dbHelper.delete<LogRec>(id);
	}
}

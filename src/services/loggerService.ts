import { CrudApiService } from "../controllers/crudApiController";
import { IDbHelper } from "../helpers/IDbHelper";

import { LogRec, LogRecDoc } from "../models/LogRec";
import { SearchParams } from "../models/SearchParams";

export class LoggerService implements CrudApiService<LogRec> {
	constructor(private dbHelper: IDbHelper<LogRecDoc> | IDbHelper<LogRec>) {}

	async get_all(queryString: SearchParams): Promise<LogRec[] | null> {
		if (queryString && !queryString.UserID) {
			return null;
		}
		const fields = ["Msg", "Data"];

		const items = await this.dbHelper.get_list<LogRec>(queryString, fields);
		return items;
	}

	async get(id: string): Promise<LogRec | null> {
		const item = await this.dbHelper.get<LogRec>(id);
		return item || null;
	}

	async create(item: LogRec): Promise<LogRec> {
		item.Created = new Date().toISOString();
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

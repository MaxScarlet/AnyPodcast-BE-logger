import { APIGatewayProxyEvent } from "aws-lambda";
import { CrudApiController } from "./controllers/crudApiController";
import MongoDbHelper from "./helpers/mongoHelper";
import { LogRecDoc, LogRecSchema } from "./models/LogRec";
import { LoggerService as Service } from "./services/loggerService";

const tableName = process.env.DB_TABLE!;

const dbHelper = new MongoDbHelper<LogRecDoc>("LogRec", LogRecSchema, tableName);
const crudService = new Service(dbHelper);
const crudController = new CrudApiController(crudService);

export const handler = async (event: APIGatewayProxyEvent) => {
	console.log("event", event);
	await dbHelper.connect();
	return crudController.handleRequest(event);
};

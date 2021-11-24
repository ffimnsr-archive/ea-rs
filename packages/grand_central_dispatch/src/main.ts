import express from "express";
import log from "loglevel";
import bodyParser from "body-parser";
import { ListAccountsRequest } from "@/models/account";
import { accountService } from "@/services/account_service";

const SERVICE_PORT = 8080;

const app = express();

log.setLevel(process.env.NODE_ENV !== "production" ? log.levels.DEBUG : log.levels.INFO);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => {
	res.send("Open Sesame: Grand Central Dispatch Service");
});

app.get("/list", async (_, res) => {
	log.trace("List accounts");
	const param: ListAccountsRequest = {
		pageSize: 10,
		pageToken: "",
	};

	const accounts = await accountService.listAccounts(param);
	log.trace("List accounts response:", accounts.accounts);
	res.json(accounts);
});

app.listen(SERVICE_PORT, () => {
	log.info("Open Sesame: Grand Central Dispatch Service");
	log.info(`Service is listening on localhost:${SERVICE_PORT}`);
});

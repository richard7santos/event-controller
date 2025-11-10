import { Client, Account, Databases, Storage } from "appwrite";

const APPWRITE_ENDPOINT = "https://appwrite.cintespbr.org/v1";
const APPWRITE_PROJECT = "68f6d14f003a3e2ceea0";

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client, APPWRITE_ENDPOINT, APPWRITE_PROJECT };

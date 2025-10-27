import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint("https://appwrite.cintespbr.org/v1")
    .setProject('68f6d14f003a3e2ceea0');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

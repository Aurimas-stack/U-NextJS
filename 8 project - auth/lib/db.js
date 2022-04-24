import { MongoClient } from "mongodb";

export const connecToDB = async () => {
    const client = await MongoClient.conect("URL");

    return client;
}
import { SingleStoreClient } from "@singlestore/client";

const client = new SingleStoreClient();

const connection = client.connect({
  host: process.env.SINGLESTORE_HOST,
  user: process.env.SINGLESTORE_USER,
  password: process.env.SINGLESTORE_PASSWORD,
  port: parseInt(process.env.SINGLESTORE_PORT || '3306')
});

export default client;
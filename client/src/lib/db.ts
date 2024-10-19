import { SingleStoreClient, type DatabaseType } from "@singlestore/client";

const DB_NAME = "ergovision"

// Create a client instance without AI
export const client = new SingleStoreClient(); 

// Connect to the database
const connection = client.connect({
  host: process.env.SINGLESTORE_HOST,
  user: process.env.SINGLESTORE_USER,
  password: process.env.SINGLESTORE_PASSWORD,
  port: parseInt(process.env.SINGLESTORE_PORT || '3306')
});

// Use the connected database and table
export const db = connection.database.use<DatabaseType>(DB_NAME);

// Change to use the "users" table
export const usersTable = db.table.use("users");

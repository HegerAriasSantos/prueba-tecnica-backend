import { MongoClient, Db } from "mongodb";
import { ENV } from "../../shared/config/env";

export class MongoDBConnection {
	private static instance: MongoDBConnection;
	private client: MongoClient;
	private db: Db;

	private constructor() {
		const uri = ENV.DATABASE_URL;
		const dbName = ENV.DB_NAME;
		this.client = new MongoClient(uri);
		this.db = this.client.db(dbName);
	}

	public static async getInstance(): Promise<MongoDBConnection> {
		if (!MongoDBConnection.instance) {
			MongoDBConnection.instance = new MongoDBConnection();
			await MongoDBConnection.instance.connect();
		}
		return MongoDBConnection.instance;
	}

	private async connect(): Promise<void> {
		try {
			await this.client.connect();
			console.log("Connected to MongoDB");
		} catch (error) {
			console.error("MongoDB connection error:", error);
			throw error;
		}
	}

	public getDb(): Db {
		return this.db;
	}

	public async close(): Promise<void> {
		await this.client.close();
		console.log("MongoDB connection closed");
	}
}

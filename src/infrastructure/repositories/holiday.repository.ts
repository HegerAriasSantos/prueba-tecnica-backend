import { Collection, ObjectId } from "mongodb";
import { Holiday } from "../../domain/entities/holiday.entity";
import { IHolidayRepository } from "../../domain/repositories/holiday.repository.interface";
import { MongoDBConnection } from "../../infrastructure/database/mongodb.connection";

export class HolidayRepository implements IHolidayRepository {
	private collection: Collection<Holiday>;

	constructor() {
		this.initializeCollection();
	}

	private async initializeCollection(): Promise<void> {
		const mongoConnection = await MongoDBConnection.getInstance();
		this.collection = mongoConnection.getDb().collection<Holiday>("holidays");
	}

	async create(entity: Holiday): Promise<Holiday> {
		const result = await this.collection.insertOne(entity);
		return { ...entity, _id: result.insertedId.toString() };
	}

	async findById(id: string): Promise<Holiday | null> {
		const result = await this.collection.findOne({ _id: new ObjectId(id) });
		return result ? { ...result, _id: result._id.toString() } : null;
	}
	async findByDescription(description: string): Promise<Holiday | null> {
		const result = await this.collection.findOne({ description: description });
		return result ? { ...result, _id: result._id.toString() } : null;
	}
	async findAllRecurrent(): Promise<Holiday[]> {
		const entities = await this.collection
			.find({ isRecurrent: true })
			.toArray();
		return entities.map(holiday => ({
			...holiday,
			_id: holiday._id.toString(),
		}));
	}

	async findAll(): Promise<Holiday[]> {
		const entities = await this.collection.find().toArray();
		return entities.map(holiday => ({
			...holiday,
			_id: holiday._id.toString(),
		}));
	}

	async update(id: string, user: Partial<Holiday>): Promise<Holiday | null> {
		const result = await this.collection.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{ $set: user },
			{ returnDocument: "after" },
		);
		return result ? { ...result, _id: result._id.toString() } : null;
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
		return result.deletedCount === 1;
	}
}

import { Identifiable, IdType, Optional } from "../common";

export interface Repository<T extends Identifiable> {
	findAll(): T[];
	findByID(id: IdType): Optional<T>;
	create(entity: Omit<T, "id">): T;
	deleteById(id: IdType): Optional<T>;
	count(): number;
}

export interface IdGenerator<K> {
	getNextId(): K;
}

export class NumberIdGenerator implements IdGenerator<number> {
	private nextId = 0;
	getNextId(): number {
		return ++this.nextId;
	}
}

export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
	constructor(private idGen: IdGenerator<IdType>) {}
	private entities = new Map<IdType, T>();
	findAll() {
		return Array.from(this.entities.values());
	}

	findByID(id: number) {
		return this.entities.get(id);
	}

	create(entityCreateDto: Omit<T, "id">) {
		const entity = { id: this.idGen.getNextId(), ...entityCreateDto } as T;
		this.entities.set(entity.id, entity);
		return entity;
	}
	deleteById(id: number) {
		const deleted = this.entities.get(id) as Optional<T>;
		this.entities.delete(id);
		return deleted;
	}
	count() {
		return this.entities.size;
	}
}

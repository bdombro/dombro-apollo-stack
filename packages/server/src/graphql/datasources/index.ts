import InMemoryDataSource from './inMemory';

export interface DataSources {
	inMemory: InMemoryDataSource;
}

export default function createDataSources(): Readonly<DataSources> {
	return {
		inMemory: new InMemoryDataSource(),
	};
}

import UserDataSource from './default';

export interface DataSources {
	user: UserDataSource;
}

export default function createDataSources(): Readonly<DataSources> {
	return {
		user: new UserDataSource(),
	};
}

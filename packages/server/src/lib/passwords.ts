import bcrypt from 'bcrypt';

export default {
	hash: (password: string) => bcrypt.hash(password, 10),
	compare: bcrypt.compare,
};

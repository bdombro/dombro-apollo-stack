import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { ForbiddenError, ValidationError } from 'apollo-server-errors';

import { ContextInit } from '../../context';
import { PagedResult } from '../../../lib/pagination';
import {
	CreatePostInput,
	CreateUserInput,
	QueryPostsArgs,
	QueryUsersArgs,
	UpdatePostInput,
	UpdateUserInput,
} from '../../../generated';
import { NotFoundError } from '../../../lib/errors';
import passwords from '../../../lib/passwords';

const now = new Date();

enum Roles {
	ADMIN = 'admin',
	EDITOR = 'editor',
}

export interface DbUser {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	password?: string;
	emailConfirmed: boolean;
	active: boolean;
	roles: Roles[];
	name: string;
}

const testUser: DbUser = {
	id: '1234',
	createdAt: now,
	updatedAt: now,
	email: 'h@h.com',
	emailConfirmed: true,
	active: true,
	password: '$2b$10$UAwotKUBOp8A4y5tmGIxuOpdm5fTfpSVjb2ULmEN3BYz1OkkvtVnq', // 'password' with 10 rounds bcrypt
	roles: [Roles.ADMIN, Roles.EDITOR],
	name: 'Heather',
};
const dbUsers: DbUser[] = [testUser];

export interface DbPost {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	authorId: string;
	title: string;
}

const testPost: DbPost = {
	id: '1234',
	createdAt: now,
	updatedAt: now,
	authorId: '1234',
	title: 'Hi!',
};
const dbPosts: DbPost[] = [testPost];

export default class InMemoryDataSource extends DataSource<ContextInit> {
	protected context!: ContextInit;

	public initialize(config: DataSourceConfig<ContextInit>): void {
		this.context = config.context;
	}

	protected hasRole(role: Roles): boolean {
		return this.context.user.roles.includes(Roles.ADMIN) || this.context.user.roles.includes(role);
	}

	protected assertRole(role: Roles): void {
		if (!this.hasRole(role)) {
			throw new ForbiddenError(`Missing required permissions`);
		}
	}

	protected sanitizeUser(user: DbUser): DbUser {
		const sanitized = this.hasRole(Roles.ADMIN)
			? user
			: {
					...user,
					createdAt: now,
					updatedAt: now,
					emailConfirmed: true,
					active: true,
					password: '',
					roles: [],
			  };
		return sanitized;
	}

	public async userById(id: DbUser['id']): Promise<Partial<DbUser> | undefined> {
		const user = dbUsers.find(r => r.id === id);
		if (!user) throw new NotFoundError(`No user found for ${id}`);
		return this.sanitizeUser(user);
	}

	// userByEmail is for auth, so don't sanitize.
	public async userByEmail(email: DbUser['email']): Promise<DbUser | undefined> {
		const user = dbUsers.find(r => r.email === email);
		if (!user) throw new NotFoundError(`No user found for ${email}`);
		return user;
	}

	public async users({ filters, first, after }: QueryUsersArgs): Promise<PagedResult<DbUser>> {
		const rows = dbUsers.map(this.sanitizeUser.bind(this));
		return {
			results: rows.slice(0, first),
			hasNextPage: rows.length > first,
			hasPreviousPage: Boolean(after),
		};
	}

	public async createUser(input: CreateUserInput): Promise<DbUser> {
		const userExists = dbUsers.find(r => r.email === input.email);
		if (userExists) throw new ValidationError(`User with ${input.email} pre-exists`);
		const now = new Date();
		const user: DbUser = {
			...input,
			id: `${dbUsers.length + 1}`,
			password: input.password ? await passwords.hash(input.password) : '',
			createdAt: now,
			updatedAt: now,
			emailConfirmed: false,
			roles: [Roles.EDITOR],
			active: true,
		};
		dbUsers.push(user);
		return this.sanitizeUser(user);
	}

	public async updateUser(input: UpdateUserInput): Promise<DbUser> {
		if (this.context.user.id !== input.id) this.assertRole(Roles.ADMIN);
		const { id, ...delta } = input;
		const deltaNoNulls = Object.fromEntries(Object.entries(delta).filter(([_, v]) => v !== null));
		const user = dbUsers.find(r => r.id === id);

		if (!user) throw new NotFoundError(`User with id ${id} not found`);

		if (input.email && input.email != user.email) {
			const userExists = dbUsers.find(r => r.email === input.email);
			if (userExists) throw new ValidationError(`User with ${input.email} pre-exists`);
		}

		const userNext: DbUser = {
			...user,
			...deltaNoNulls,
			updatedAt: new Date(),
		};
		dbUsers[dbUsers.findIndex(r => r.id === id)] = userNext;
		return user;
	}

	public async postById(id: DbPost['id']): Promise<DbPost | undefined> {
		const post = dbPosts.find(r => r.id === id);
		return post;
	}

	public async posts({ filters, first, after }: QueryPostsArgs): Promise<PagedResult<DbPost>> {
		const rows = dbPosts;
		return {
			results: rows.slice(0, first),
			hasNextPage: rows.length > first,
			hasPreviousPage: Boolean(after),
		};
	}

	public async createPost(input: CreatePostInput): Promise<DbPost> {
		this.assertRole(Roles.EDITOR);
		if (!input.authorId) input.authorId = this.context.user.id;
		if (this.context.user.id !== input.authorId && !this.hasRole(Roles.ADMIN)) {
			throw new ForbiddenError(`Permission denied to create post with author != current user`);
		}
		if (!dbUsers.find(u => u.id === input.authorId)) {
			throw new ValidationError(`User with id ${input.authorId} not found`);
		}
		const now = new Date();
		const post: DbPost = {
			...input,
			id: `${dbPosts.length + 1}`,
			createdAt: now,
			updatedAt: now,
		};
		dbPosts.push(post);
		return post;
	}

	public async updatePost(input: UpdatePostInput): Promise<DbPost> {
		this.assertRole(Roles.EDITOR);
		const { id, ...delta } = input;
		const deltaNoNulls = Object.fromEntries(Object.entries(delta).filter(([_, v]) => v !== null));
		const post = dbPosts.find(r => r.id === id);
		if (!post) throw new NotFoundError(`Post with id ${id} not found`);
		if (this.context.user.id !== post.authorId) this.assertRole(Roles.ADMIN);
		const postNext: DbPost = {
			...post,
			...deltaNoNulls,
			updatedAt: new Date(),
		};
		dbPosts[dbPosts.findIndex(r => r.id === id)] = postNext;
		return post;
	}
}

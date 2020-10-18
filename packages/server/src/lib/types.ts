/** Merge 2 types, properties types from the latter override the ones defined on the former type */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>>;

export type WithPartial<T, K extends keyof T> = Merge<T, Partial<Pick<T, K>>>;

export type Maybe<T> = T | undefined | null;

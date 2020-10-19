// tsconfig root is src, allow us to load the package.json
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { name, version } from '../../package.json';

interface PackageMeta {
	name: string;
	version: string;
}
export default ({ name, version } as unknown) as PackageMeta;

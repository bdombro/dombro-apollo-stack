import { RouteMeta } from "../types";

const slug = "posts";
const routeMeta: RouteMeta = {
  title: "Posts",
  slug,
  path: `/${slug}`,
  allowRoles: ["editor"],
};
export default routeMeta;

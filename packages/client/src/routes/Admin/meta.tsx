import { RouteMeta } from "../types";

const slug = "admin";
const routeMeta: RouteMeta = {
  title: "Admin Dashboard",
  slug,
  path: `/${slug}`,
  allowRoles: ["admin"],
  hidden: true,
};
export default routeMeta;

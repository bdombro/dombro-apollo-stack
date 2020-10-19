import { RouteMeta } from "../types";

const slug = "dashboard";
const routeMeta: RouteMeta = {
  title: "Dashboard",
  slug,
  path: `/${slug}`,
  allowRoles: ["editor"],
};
export default routeMeta;

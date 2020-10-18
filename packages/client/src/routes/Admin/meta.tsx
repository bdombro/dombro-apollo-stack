import { RouteMeta } from "../types";

const slug = "admin";
const routeMeta: RouteMeta = {
  title: "Admin Dashboard",
  slug,
  path: `/${slug}`,
  permissions: ["admin.dashboard"],
  hidden: true,
};
export default routeMeta;

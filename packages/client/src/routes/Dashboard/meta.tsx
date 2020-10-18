import { RouteMeta } from "../types";

const slug = "dashboard";
const routeMeta: RouteMeta = {
  title: "Dashboard",
  slug,
  path: `/${slug}`,
  permissions: ["active.dashboard"],
};
export default routeMeta;

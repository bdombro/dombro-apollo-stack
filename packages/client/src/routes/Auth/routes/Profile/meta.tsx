import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "profile";
const routeMeta: RouteMeta = {
  title: "Profile",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  permissions: ["active.dashboard"],
  parent: ParentMeta,
};
export default routeMeta;

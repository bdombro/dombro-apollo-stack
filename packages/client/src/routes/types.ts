export type RouteMeta = {
  title: string;
  slug: string;
  path: string;
  permissions?: string[];
  hidden?: boolean; // assume true else specified
  parent?: RouteMeta;
  // icon?: string;
};

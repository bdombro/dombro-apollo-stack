import React from "react";

export type DefaultProps = {
  permissions?: string[];
  hidden?: boolean;
  children: React.ReactNode;
};
export type DefaultComponent = React.FC<DefaultProps>;

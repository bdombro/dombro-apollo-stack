module.exports = {
  client: {
    name: "LocalApollo",
    service: {
      name: "localApollo",
      localSchemaFile: "../server/src/generated/schema.graphql",
      includes: ["src/**/*.{tsx,ts,jsx,js}"],
    },
  },
};

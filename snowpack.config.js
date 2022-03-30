// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  moduleResolution: "node",
  root: "./public",
  //workspaceRoot: "/src/Svelte",
  exclude: ['**/node_modules/**/*'],

  mount: {
    public: '/',
    'src/Svelte': '/',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-typescript'
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    open: "none",
  },
  buildOptions: {
    /* ... */
  },
};

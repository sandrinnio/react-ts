import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /(^index\.js$)/ }, () => ({
        namespace: "a",
        path: "index.js",
      }));

      build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => ({
        namespace: "a",
        path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
      }));

      build.onResolve(
        { filter: /.*/ },
        async (
          args: esbuild.OnResolveArgs
        ): Promise<esbuild.OnResolveResult> => ({
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        })
      );
    },
  };
};

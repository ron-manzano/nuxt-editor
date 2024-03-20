import { defineNuxtModule, addImports, addComponent } from "@nuxt/kit";

import { name, version } from "../package.json";

import type { ModuleOptions } from "./types";

import { transpileTiptapModules } from "./imports/tiptap";

// Module options TypeScript interface definition

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "editor",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: "Alice",
    lowlight: false,
  },
  async setup(options, nuxt) {
    // const { resolve } = createResolver(import.meta.url);

    const tiptapModules = transpileTiptapModules(options, nuxt);

    nuxt.options.build.transpile = [
      ...nuxt.options.build.transpile,
      ...tiptapModules,
    ];

    console.info("Editor initialized");
  },
});

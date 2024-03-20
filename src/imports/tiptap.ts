import { addImports, addComponent } from "@nuxt/kit";

const tiptapComposables = [
  { name: "useEditor", path: "@tiptap/vue-3", as: "useTiptapEditor" },
];

const tiptapNodes = [
  { name: "Node", path: "@tiptap/core" },
  { name: "Blockquote", path: "@tiptap/extension-blockquote" },
  { name: "BulletList", path: "@tiptap/extension-bullet-list" },
  { name: "OrderedList", path: "@tiptap/extension-ordered-list" },
  { name: "ListItem", path: "@tiptap/extension-list-item" },
  { name: "CodeBlock", path: "@tiptap/extension-code-block" },
  { name: "Document", path: "@tiptap/extension-document" },
  { name: "HardBreak", path: "@tiptap/extension-hard-break" },
  { name: "Heading", path: "@tiptap/extension-heading" },
  { name: "HorizontalRule", path: "@tiptap/extension-horizontal-rule" },
  { name: "Paragraph", path: "@tiptap/extension-paragraph" },
  { name: "Text", path: "@tiptap/extension-text" },
];

const tiptapMarks = [
  { name: "Mark", path: "@tiptap/core" },
  { name: "Bold", path: "@tiptap/extension-bold" },
  { name: "Code", path: "@tiptap/extension-code" },
  { name: "Italic", path: "@tiptap/extension-italic" },
  { name: "Link", path: "@tiptap/extension-link" },
  { name: "Strike", path: "@tiptap/extension-strike" },
];

const tiptapExtensions = [
  { name: "Extension", path: "@tiptap/core" },
  { name: "StarterKit", path: "@tiptap/starter-kit" },
  { name: "BubbleMenu", path: "@tiptap/extension-bubble-menu" },
  { name: "Gapcursor", path: "@tiptap/extension-gapcursor" },
  { name: "FloatingMenu", path: "@tiptap/extension-floating-menu" },
  { name: "Dropcursor", path: "@tiptap/extension-dropcursor" },
  { name: "History", path: "@tiptap/extension-history" },
];

const tiptapImports = [
  { name: "Editor", path: "@tiptap/vue-3" },

  ...tiptapNodes,
  ...tiptapMarks,
  ...tiptapExtensions,
];

const tiptapComponents = [
  { name: "EditorContent", path: "@tiptap/vue-3" },
  { name: "FloatingMenu", path: "@tiptap/vue-3" },
  { name: "BubbleMenu", path: "@tiptap/vue-3" },
];

const lowlightImports = [
  { name: "all", path: "lowlight" },
  { name: "common", path: "lowlight" },
  { name: "createLowlight", path: "lowlight" },
  { name: "CodeBlockLowlight", path: "@tiptap/extension-code-block-lowlight" },
];

// const placeholderImports = [
//   {
//     name: "Placeholder",
//     path: "components/nuxt-stubs",
//     local: true,
//   },
// ];

export const transpileTiptapModules = (options: any, nuxt:any) => {
  const transpileModules = new Set<string>([]);
  let optionalImports: { [key: string]: any }[] = [];
  let optionalComponents: { [key: string]: any }[] = [];
  const customCSS: string[] = [];

  // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
  for (const obj of tiptapComposables) {
    addImports({
      as: obj.as || obj.name,
      name: obj.name,
      from: obj.path,
      // _internal_install: obj.path,
    });
    transpileModules.add(obj.path);
  }

  for (const obj of tiptapImports) {
    addImports({
      as: `Tiptap${obj.name}`,
      name: obj.name,
      from: obj.path,
      // _internal_install: obj.path,
    });
    transpileModules.add(obj.path);
  }

  for (const obj of tiptapComponents) {
    addComponent({
      // mode: "client",
      name: `Tiptap${obj.name}`,
      export: obj.name,
      filePath: obj.path,
      // _internal_install: obj.path,
    });
    transpileModules.add(obj.path);
  }

  if (options.lowlight !== false) {
    optionalImports = [...optionalImports, ...lowlightImports];
    const lldefaultTheme = options.lowlight?.theme || "github-dark";
    const highlightJSVersion =
      options.lowlight?.highlightJSVersion || "11.9.0";
    const llThemeCSS = `https://unpkg.com/@highlightjs/cdn-assets@${highlightJSVersion}/styles/${lldefaultTheme}.min.css`;

    nuxt.options.app.head.link = [
      ...(nuxt.options.app.head.link || []),
      { rel: "stylesheet", href: llThemeCSS },
    ];
  }

  optionalComponents = [...optionalComponents];

  for (const obj of optionalImports) {
    addImports({
      as: `${options.prefix}${obj.name}`,
      name: obj.name,
      from: obj.path,
      // _internal_install: obj.path,
    });
    transpileModules.add(obj.path);
  }

  for (const obj of optionalComponents) {
    addComponent({
      // mode: "client",
      name: `${options.prefix}${obj.name}`,
      export: obj.name,
      filePath: obj.path,
      // _internal_install: obj.path,
    });
    transpileModules.add(obj.path);
  }

  nuxt.options.css = [...nuxt.options.css, ...customCSS];

  return transpileModules;
}

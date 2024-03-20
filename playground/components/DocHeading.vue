<template>
  <div ref="docHeadingContainerRef">
    <div id="block-container">
      <TiptapEditorContent :editor="headingEditor" />
      <TiptapEditorContent :editor="chunkEditor" />
      <div id="heading-menu">
        <button
          class="flex group items-center justify-center border text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap bg-transparent border-transparent text-neutral-500 dark:text-neutral-400 hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200 h-8 gap-1 min-w-[2rem] px-2 w-auto"
        >
          <img
            src="~/assets/svg/plus.svg"
            alt="Icon"
            class="w-4 h-4"
          >
        </button>
        <button
          class="flex group items-center justify-center border text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap bg-transparent border-transparent text-neutral-500 dark:text-neutral-400 hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200 h-8 gap-1 min-w-[2rem] px-2 w-auto"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="true"
          aria-controls="radix-:r0:"
          data-state="open"
        >
          <img
            src="~/assets/svg/double-vspread.svg"
            alt="Icon"
            class="w-4 h-4"
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import tippy from "tippy.js";
export default defineComponent({
  props: {
    headingContent: {
      type: String,
      required: true,
    },
    chunkContent: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const docHeadingContainerRef = ref<HTMLElement | null>(null);
    const headingTemplate = TiptapExtension.create({
      name: "heading-template",
      addExtensions() {
        const extensions = [];
        extensions.push(TiptapDocument);
        extensions.push(TiptapHeading);
        extensions.push(TiptapText);
        return extensions;
      },
    });

    const chunkTemplate = TiptapExtension.create({
      name: "chunk-template",
      addExtensions() {
        const extensions = [];
        extensions.push(TiptapDocument);
        extensions.push(TiptapParagraph);
        extensions.push(TiptapText);
        return extensions;
      },
    });

    const headingEditor = useTiptapEditor({
      content: props.headingContent,
      extensions: [headingTemplate],
      editorProps: {
        attributes: {
          class: "prose dark:prose-invert m-5 focus:outline-none w-full max-w-none",
        },
      },
    });

    const chunkEditor = useTiptapEditor({
      content: props.chunkContent,
      extensions: [chunkTemplate],
      editorProps: {
        attributes: {
          class: "prose dark:prose-invert m-5 focus:outline-none w-full max-w-none",
        },
      },
    });
    onMounted(() => {
      // const docHeadingContainerRef = this.$refs.docHeadingContainer;
      // const blockContainer = document.querySelector("#heading-1234");
      const headingEditorContainer = headingEditor.value?.view.dom;
      // @ts-ignore
      tippy(docHeadingContainerRef.value, {
        content: document.querySelector("#heading-menu"),
        getReferenceClientRect: () => {
          return headingEditorContainer?.getBoundingClientRect();
        },
        interactive: true,
        placement: "left-start",
        hideOnClick: "toggle",
        appendTo: document.body,
      });
    });

    return {
      headingEditor,
      chunkEditor,
      docHeadingContainerRef,
    };
  },
});
</script>

<style scoped>
/* Add your component-specific styles here */
#block-container {
  margin: auto;
  width: 80%;
  max-width: 1200px;
  padding: 10px;
}

#heading-menu {
  display: flex;
}
</style>

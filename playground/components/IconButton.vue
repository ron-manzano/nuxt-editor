<template>
  <button
    :class="buttonClass"
    :aria-haspopup="ariaHasPopup"
    :type="type"
    :aria-expanded="ariaExpanded"
    :aria-controls="ariaControls"
    :data-state="dataState"
    @click="$emit('click')"
  >
    <img
      :src="iconSrc"
      :alt="altText"
      class="w-4 h-4"
    >
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    iconSrc: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "Icon",
    },
    buttonClass: {
      type: String,
      default:
        "flex group items-center justify-center border text-sm font-semibold rounded-md disabled:opacity-50 whitespace-nowrap bg-transparent border-transparent text-neutral-500 dark:text-neutral-400 hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-white/10 dark:hover:text-neutral-300 dark:active:text-neutral-200 h-8 gap-1 min-w-[2rem] px-2 w-auto",
    },
    type: {
      type: String as () => "button" | "submit" | "reset" | undefined,
      default: "button",
    },
    ariaHasPopup: {
      type: [Boolean] as const,
      default: null,
    },
    ariaExpanded: {
      type: Boolean,
      default: null,
    },
    ariaControls: {
      type: String,
      default: null,
    },
    dataState: {
      type: String,
      default: null,
    },
  },
  emits: ["click"],
});
</script>

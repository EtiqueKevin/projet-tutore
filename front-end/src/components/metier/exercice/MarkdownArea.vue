<script setup>
import { computed, ref } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  markdownText: {
    type: String,
    required: true,
  },
});

const markdown = ref(props.markdownText);

const htmlContent = computed(() => marked(markdown.value));
</script>

<template>
 <div v-html="htmlContent" class="p-4 prose dark:prose-white prose-base"></div>
</template>

<style scoped>

</style>
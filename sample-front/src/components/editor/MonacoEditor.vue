<template>
  <div ref="editorContainer" class="w-full flex-grow"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const props = defineProps({
  language: String,
  value: String
});

const emit = defineEmits(['update:value']);

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

const editorContainer = ref(null);
let editor = null;
let resizeObserver = null;

const getTheme = () => document.body.classList.contains('dark') ? 'vs-dark' : 'vs-light';

onMounted(() => {
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: props.value,
      language: props.language,
      theme: getTheme(),
    });

    editor.onDidChangeModelContent(() => {
      emit("update:value", editor.getValue());
    });

    resizeObserver = new ResizeObserver(() => {
      editor.layout();
    });

    resizeObserver.observe(editorContainer.value);

    const observer = new MutationObserver(() => {
      editor.updateOptions({ theme: getTheme() });
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
});

onBeforeUnmount(() => {
  if (resizeObserver && editorContainer.value) {
    resizeObserver.unobserve(editorContainer.value);
  }
  if (editor) {
    editor.dispose();
  }
});

watch(() => props.value, (newValue) => {
  if (editor && newValue !== editor.getValue()) {
    editor.setValue(newValue);
  }
});

watch(() => props.language, (newLanguage) => {
  if (editor && newLanguage) {
    monaco.editor.setModelLanguage(editor.getModel(), newLanguage);
  }
});
</script>
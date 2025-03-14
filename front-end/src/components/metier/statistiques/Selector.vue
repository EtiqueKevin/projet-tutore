<script setup>
const props = defineProps({
  modules: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    required: false
  }
});

const emit = defineEmits(['update:modelValue', 'change']);
</script>

<template>
  <div class="mb-5">
    <select 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change')"
      :disabled="modules.length === 0"
      class="w-64 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
    >
      <option 
        v-for="module in modules" 
        :key="module.id" 
        :value="module.id"
      >
        {{ module.name }}
      </option>
    </select>
  </div>
</template>
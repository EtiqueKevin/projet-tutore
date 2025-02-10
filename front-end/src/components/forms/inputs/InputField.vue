<script setup>
defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  id: String,
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  autocomplete: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :type="type"
    :id="id"
    :required="required"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :title="placeholder"
    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
  />
</template>
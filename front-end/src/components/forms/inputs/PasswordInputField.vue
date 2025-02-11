<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  id: String,
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  autocomplete: String
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)
</script>

<template>
  <div class="relative text-black">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="showPassword ? 'text' : 'password'"
      :id="id"
      :required="required"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :title="placeholder"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
    />
    <button 
      type="button" 
      @click="showPassword = !showPassword" 
      title="Afficher le mot de passe"
      class="absolute right-0 px-3 text-black top-1/2 -translate-y-1/2"
    >
      <i :class="['fas', showPassword ? 'fa-eye' : 'fa-eye-slash']"></i>
    </button>
  </div>
</template>
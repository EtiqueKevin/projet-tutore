<script setup>
import { Doughnut } from 'vue-chartjs'
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  CategoryScale 
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['chartClick'])

const options = {
  ...props.chartOptions,
  onClick: (event, elements) => {
    if (elements.length > 0) {
      emit('chartClick', elements[0].index)
    }
  }
}
</script>

<template>
  <Doughnut 
    :data="chartData"
    :options="options"
  />
</template>
<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Legend,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartData
} from 'chart.js'
import type { ChartConfiguration } from 'chart.js/auto'
import { Bar } from 'vue-chartjs'
import { computed, type ComputedRef } from 'vue'
import { useQuasar } from 'quasar'
import { toCurrency } from '@/calc/util'

const $q = useQuasar()
ChartJS.register(Title, Legend, Tooltip, BarElement, CategoryScale, LinearScale)

const HOUSE_GROUP = 'house'
const RENT_GROUP = 'rent'

const props = defineProps<{
  title: string
  data: ChartData<'bar', number[], number>
}>()

const chartConfig: ComputedRef<ChartConfiguration<'bar', number[], number>> = computed(() => {
  return {
    type: 'bar',
    data: props.data,
    options: {
      plugins: {
        title: {
          display: true,
          text: props.title
        },
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            title: (tooltipItems) => `Year ${tooltipItems[0].label}`,
            label: (context) => `${context.dataset.label}: ${toCurrency(context.parsed.y)}`,
            footer: (tooltipItems) => {
              const houseSum = tooltipItems
                .filter((value) => value.dataset.stack == HOUSE_GROUP)
                .reduce((sum, next) => sum + next.parsed.y, 0)

              const rentSum = tooltipItems
                .filter((value) => value.dataset.stack == RENT_GROUP)
                .reduce((sum, next) => sum + next.parsed.y, 0)

              const footer: Array<string> = []
              houseSum && footer.push(`House Total: ${toCurrency(houseSum)}`)
              rentSum && footer.push(`Rent Total: ${toCurrency(rentSum)}`)

              return footer
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Year'
          }
        },
        y: {
          stacked: true,
          ticks: {
            callback: (value) => toCurrency(Number(value))
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      responsive: true,
      aspectRatio: $q.screen.lt.md ? 1 : 1.5
    }
  }
})
</script>

<template>
  <Bar id="my-chart-id" :options="chartConfig.options" :data="chartConfig.data" />
</template>

<style scoped></style>

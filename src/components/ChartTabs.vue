<script setup lang="ts">
import { ref, type ComputedRef, computed, type Ref } from 'vue'
import type { ChartData } from 'chart.js'
import type { CalcHouseOutput, CalcRentOutput, Paid } from '@/calc/types'
import ChartBase from '@/components/ChartBase.vue'

const props = defineProps<{
  calcHouse: CalcHouseOutput
  calcRent: CalcRentOutput
}>()

const tab = ref('totals')

function generatePaidDatasets(
  paidHouse: Ref<Array<Paid>>,
  paidRent: Ref<Array<Paid>>
): ComputedRef<ChartData<'bar', number[], number>> {
  return computed(() => {
    return {
      labels: Array.from(new Array(paidHouse.value.length), (x, i) => i + 1),
      datasets: [
        {
          label: 'House Principal',
          data: paidHouse.value.map((row) => row.principal),
          stack: 'house',
          backgroundColor: '#4bc0c0'
        },
        {
          label: 'House Interest',
          data: paidHouse.value.map((row) => row.interest),
          stack: 'house',
          backgroundColor: '#ff6384'
        },
        {
          label: 'House Expenses',
          data: paidHouse.value.map((row) => row.expenses),
          stack: 'house',
          backgroundColor: '#ff9f40'
        },
        {
          label: 'House Taxes',
          data: paidHouse.value.map((row) => row.taxes),
          stack: 'house',
          backgroundColor: '#ffcd56'
        },
        {
          label: 'House Opportunity',
          data: paidHouse.value.map((row) => row.opportunity),
          stack: 'house',
          backgroundColor: '#c9cbcf'
        },
        {
          label: 'Rent Payments',
          data: paidRent.value.map((row) => row.expenses),
          stack: 'rent',
          backgroundColor: '#ff9f40'
        },
        {
          label: 'Rent Opportunity',
          data: paidRent.value.map((row) => row.opportunity),
          stack: 'rent',
          backgroundColor: '#c9cbcf'
        }
      ]
    }
  })
}

const totalDataset = generatePaidDatasets(
  computed(() => props.calcHouse.paidTotal),
  computed(() => props.calcRent.paidTotal)
)
const yearlyDataset = generatePaidDatasets(
  computed(() => props.calcHouse.paidYearly),
  computed(() => props.calcRent.paidYearly)
)
const recurringDataset: ComputedRef<ChartData<'bar', number[], number>> = computed(() => {
  return {
    labels: Array.from(new Array(props.calcHouse.recurringYearly.length), (x, i) => i + 1),
    datasets: [
      {
        label: 'House Payments',
        data: props.calcHouse.recurringYearly.map((row) => (row == 0 ? 0 : row / 12)),
        stack: 'house',
        backgroundColor: '#4bc0c0'
      },
      {
        label: 'Rent Payments',
        data: props.calcRent.recurringYearly.map((row) => (row == 0 ? 0 : row / 12)),
        stack: 'rent',
        backgroundColor: '#ff9f40'
      }
    ]
  }
})

const currentTitleDataset = computed(() => {
  switch (tab.value) {
    case 'totals':
      return { title: 'Total Paid (Cumulative)', dataset: totalDataset.value }
    case 'yearly':
      return { title: 'Total Paid (Year By Year)', dataset: yearlyDataset.value }
    case 'recurring':
      return { title: 'Recurring Monthly Payments', dataset: recurringDataset.value }
    default:
      throw new Error(`Unknown tab: ${tab.value}`)
  }
})
</script>

<template>
  <q-card>
    <q-tabs v-model="tab" class="bg-primary text-white" align="justify">
      <q-tab name="totals" label="Cumulative"></q-tab>
      <q-tab name="yearly" label="Yearly"></q-tab>
      <q-tab name="recurring" label="Recurring"></q-tab>
    </q-tabs>
    <q-separator />
    <ChartBase
      class="q-pa-md"
      :title="currentTitleDataset.title"
      :data="currentTitleDataset.dataset"
    ></ChartBase>
    <div v-if="tab != 'recurring'" class="text-subtitle text-grey text-center">
      Excludes selling profits
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CalcInputType } from '@/calc/types'
import { toCurrency, clipFloat, divSafe } from '@/calc/util'
import HelpTooltip from '@/components/HelpTooltip.vue'

const props = defineProps<{
  modelValue: number
  title: string
  type: CalcInputType
  min: number
  max: number
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

// guards to prevent invalid numbers or excessive precision
const value = computed({
  get() {
    switch (props.type) {
      case CalcInputType.Percent:
        return clipFloat(props.modelValue * 100, 2)
      case CalcInputType.Years:
        return clipFloat(props.modelValue, 0)
      default:
        return clipFloat(props.modelValue, 2)
    }
  },
  set(value) {
    const clippedValue = Math.max(props.min, Math.min(props.max, value))
    switch (props.type) {
      case CalcInputType.Percent:
        emit('update:modelValue', clipFloat(divSafe(clippedValue, 100), 4))
        break
      case CalcInputType.Years:
        emit('update:modelValue', clipFloat(clippedValue, 0))
        break
      case CalcInputType.Dollar:
      case CalcInputType.Number:
      default:
        emit('update:modelValue', clipFloat(clippedValue, 2))
    }
  }
})
</script>

<template>
  <q-item>
    <q-item-section side top style="width: 8em">
      <q-input
        v-if="type == CalcInputType.Percent"
        outlined
        input-class="text-right"
        type="number"
        suffix="%"
        v-model="value"
      >
      </q-input>
      <q-input
        v-if="type == CalcInputType.Dollar"
        outlined
        input-class="text-right"
        type="number"
        prefix="$"
        v-model="value"
      >
      </q-input>
      <q-input
        v-if="type == CalcInputType.Years"
        input-class="text-right"
        outlined
        type="number"
        suffix="Y"
        v-model="value"
      >
      </q-input>
      <q-input
        v-if="type == CalcInputType.Number"
        input-class="text-right"
        outlined
        type="number"
        v-model="value"
      >
      </q-input>
    </q-item-section>
    <q-item-section class="q-px-md">
      <q-item-label>
        {{ title }}
        <HelpTooltip>
          <slot></slot>
        </HelpTooltip>
      </q-item-label>
      <q-slider
        v-if="type == CalcInputType.Percent"
        type="number"
        :min="min"
        :max="max"
        :step="0.1"
        label
        :label-value="`${value}%`"
        :marker-labels="[
          { value: min, label: `${min}%` },
          { value: max, label: `${max}%` }
        ]"
        v-model="value"
      >
      </q-slider>
      <q-slider
        v-if="type == CalcInputType.Dollar"
        type="number"
        :min="min"
        :max="max"
        :step="1"
        label
        :label-value="toCurrency(value)"
        :marker-labels="[
          { value: min, label: toCurrency(min) },
          { value: max, label: toCurrency(max) }
        ]"
        v-model="value"
      >
      </q-slider>
      <q-slider
        v-if="type == CalcInputType.Years"
        type="number"
        :min="min"
        :max="max"
        :step="1"
        snap
        markers
        label
        :marker-labels="[
          { value: min, label: min },
          { value: max, label: max }
        ]"
        v-model="value"
      >
      </q-slider>
      <q-slider
        v-if="type == CalcInputType.Number"
        type="number"
        :min="min"
        :max="max"
        :step="0.25"
        label
        :marker-labels="[
          { value: min, label: min },
          { value: max, label: max }
        ]"
        v-model="value"
      >
      </q-slider>
    </q-item-section>
  </q-item>
</template>

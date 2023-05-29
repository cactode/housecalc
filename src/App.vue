<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { calcHouse, calcRent } from '@/calc/calc'
import { saveToQueryString, restoreFromQueryString } from '@/calc/share'
import BasicInputs from '@/components/BasicInputs.vue'
import MortgageInputs from '@/components/MortgageInputs.vue'
import ChartTabs from '@/components/ChartTabs.vue'
import CalcSummary from '@/components/CalcSummary.vue'
import HelpPopup from '@/components/HelpPopup.vue'

const $q = useQuasar()
const restored = restoreFromQueryString($q)

const vars = ref(restored.basicVars)
const mortgageVars = ref(restored.mortgageVars)

const calcHouseOutput = computed(() => calcHouse(vars.value, mortgageVars.value))
const calcRentOutput = computed(() => calcRent(vars.value))

const helpOpen = ref(false)

function share() {
  saveToQueryString(vars.value, mortgageVars.value)
  $q.notify({
    message: 'Copied link to clipboard...',
    position: 'top'
  })
}
</script>

<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <a href="./">
            <q-avatar>
              <img src="favicon.png" />
            </q-avatar>
          </a>
          <span class="q-pl-md" v-if="$q.screen.gt.sm">cactode's house & rent calculator</span>
        </q-toolbar-title>
        <q-btn class="q-ma-sm bg-secondary" @click="share()" label="Share" icon="share" />
        <q-btn class="q-ma-sm bg-grey-9" @click="helpOpen = true" label="Help" icon="help" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-mx-auto row" :style="`max-width: ${$q.screen.sizes.xl}px`">
        <div class="col-md-4 col-12 q-pa-md">
          <BasicInputs v-model="vars"></BasicInputs>
          <MortgageInputs :vars="vars" v-model="mortgageVars"></MortgageInputs>
        </div>
        <div class="col-md-8 col-12">
          <div class="q-pa-md">
            <CalcSummary :calcHouse="calcHouseOutput" :calcRent="calcRentOutput"></CalcSummary>
          </div>
          <div class="q-pa-md">
            <ChartTabs :calcHouse="calcHouseOutput" :calcRent="calcRentOutput"></ChartTabs>
          </div>
        </div>
      </div>
    </q-page-container>

    <HelpPopup v-model="helpOpen"></HelpPopup>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        made with <q-icon name="favorite" color="red" class="q-mx-xs"></q-icon> by
        <a class="q-ml-xs text-white" href="https://cactode.club">cactode</a>.
        <a class="q-mx-xs text-white" href="https://github.com/cactode/housecalc">source code</a>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<style scoped></style>

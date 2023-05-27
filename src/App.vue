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

const leftDrawerOpen = ref(false)
const helpOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function share() {
  saveToQueryString(vars.value, mortgageVars.value)
  $q.notify({
    message: 'Copied link to clipboard...',
    position: 'top'
  })
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="favicon.png" />
          </q-avatar>
          <span class="q-pl-md" v-if="$q.screen.gt.sm">cactode's house vs. rent calculator</span>
        </q-toolbar-title>
        <q-btn class="q-ma-sm bg-secondary" @click="share()" label="Share" icon="share" />
        <q-btn class="q-ma-sm bg-grey-9" @click="helpOpen = true" label="Help" icon="help" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      :width="Math.min(600, $q.screen.width)"
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <BasicInputs v-model="vars">
        <q-btn
          v-if="$q.screen.lt.md"
          dense
          flat
          round
          icon="arrow_back"
          @click="toggleLeftDrawer"
        />
      </BasicInputs>
      <MortgageInputs :vars="vars" v-model="mortgageVars"></MortgageInputs>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md q-mx-auto" style="max-width: 100em">
        <div class="q-pb-md">
          <CalcSummary :calcHouse="calcHouseOutput" :calcRent="calcRentOutput"></CalcSummary>
        </div>
        <div class="q-pt-md">
          <ChartTabs :calcHouse="calcHouseOutput" :calcRent="calcRentOutput"></ChartTabs>
        </div>
      </div>
    </q-page-container>

    <HelpPopup v-model="helpOpen"></HelpPopup>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        made with <q-icon name="favorite" color="red" class="q-mx-xs"></q-icon> by
        <a class="q-ml-xs text-white" href="https://cactode.club">cactode</a>.
        <a class="q-mx-xs text-white" href="https://github.com/cactode/housecalc">source</a>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<style scoped></style>

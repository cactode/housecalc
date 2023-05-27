<script setup lang="ts">
import { CalcInputType, type BasicVars, type MortgageVars } from '@/calc/types'
import { computed, type ComputedRef } from 'vue'
import { getDefaultMortgage } from '@/stores/defaults'
import NumSlideInput from '@/components/NumSlideInput.vue'

const props = defineProps<{
  vars: BasicVars
  modelValue: Array<MortgageVars>
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: Array<MortgageVars>): void
}>()

const mortgageVars = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

// prevent mortgage start years from overlapping
const minStartYears: ComputedRef<Array<{ min: number; max: number }>> = computed(() => {
  return mortgageVars.value.map((mortgage, i) => {
    return {
      min: i == 0 ? 0 : mortgageVars.value[i - 1].startYear + 1,
      max:
        i == 0
          ? 0
          : mortgageVars.value.length - 1 == i
          ? 40
          : mortgageVars.value[i + 1].startYear - 1
    }
  })
})

// adds a mortgage to the end and sets some convenient defaults
function addMortgage(mortgage: MortgageVars) {
  const previousMortgage = mortgageVars.value[mortgageVars.value.length - 1]
  mortgage.startYear = previousMortgage.startYear + 5
  mortgage.downPct = 0
  let term = previousMortgage.termYear - (mortgage.startYear - previousMortgage.startYear)
  mortgage.termYear = term > 0 ? term : 5
  mortgageVars.value.push(mortgage)
}

// removes a mortgage by index
function removeMortgage(index: number) {
  if (index > 0) {
    mortgageVars.value.splice(index, 1)
  }
}
</script>

<template>
  <q-list bordered separator>
    <q-item-label header>MORTGAGES</q-item-label>
    <q-expansion-item
      v-for="(mortgage, index) in mortgageVars"
      v-bind:key="index"
      bordered
      expand-separator
      default-opened
    >
      <template v-slot:header>
        <q-item-section>
          <q-item-label>Mortgage #{{ index + 1 }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-model="mortgage.isArm"
            color="primary"
            :label="mortgage.isArm ? 'ARM' : 'Fixed'"
          ></q-toggle>
        </q-item-section>
        <q-item-section side>
          <q-btn
            dense
            color="red"
            icon="remove"
            @click="removeMortgage(index)"
            :disabled="index == 0"
          ></q-btn>
        </q-item-section>
      </template>
      <NumSlideInput
        title="Start"
        v-model="mortgage.startYear"
        v-if="index > 0"
        :type="CalcInputType.Years"
        :min="minStartYears[index].min"
        :max="minStartYears[index].max"
      >
        The year this mortgage starts. When it starts, it will replace the previous mortgage and
        take over its outstanding balance.
      </NumSlideInput>
      <NumSlideInput
        title="Interest Rate"
        v-model="mortgage.interestPct"
        :type="CalcInputType.Percent"
        :min="0"
        :max="20"
      >
        The interest charged on the unpaid balance of the loan each year. This is similar to APR,
        but does not include fees. Those are accounted for separately.
        <br />
        If this is a fixed mortgage, this interest will remain constant for the duration of the
        loan.
        <br />
        If this is an ARM mortgage, this interest will change after the initial fixed period.
      </NumSlideInput>
      <NumSlideInput
        title="Term"
        v-model="mortgage.termYear"
        :type="CalcInputType.Years"
        :min="1"
        :max="40"
      >
        The term is the number of years over which the loan is designed to be repaid. Most mortgages
        are either 15, 20, or 30 years.
        <br />
        If the house is sold before the mortgage is paid off, the remaining balance will be paid off
        with the proceeds of the sale.
        <br />
        If the term completes, the house will be fully owned and the mortgage will end.
        <br />
        If a new mortgage is started before the term completes, the new mortgage will replace the
        old one.
      </NumSlideInput>
      <NumSlideInput
        title="Down Payment"
        v-model="mortgage.downPct"
        :type="CalcInputType.Percent"
        :min="0"
        :max="100"
      >
        The down payment is the amount of money which is paid up front. This is typically 20% of the
        purchase price but can be as low as 3.5% for an FHA loan.
      </NumSlideInput>
      <NumSlideInput
        title="Loan Origination Fee Percent"
        v-model="mortgage.startFeePct"
        :type="CalcInputType.Percent"
        :min="0"
        :max="10"
      >
        Fees charged when the mortgage is created, calculated as a percentage of the principal
        amount.
      </NumSlideInput>
      <NumSlideInput
        title="Loan Origination Fee Percent"
        v-model="mortgage.startFee"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="50000"
      >
        Fees charged when the mortgage is created, calculated as a flat fee. Can be used in
        conjunction with the percent fee.
      </NumSlideInput>
      <NumSlideInput
        title="Points"
        v-model="mortgage.points"
        :type="CalcInputType.Number"
        :min="0"
        :max="20"
      >
        Fees charged up-front by the lender to reduce the interest rate of the loan. Each point is
        equal to 1% of the loan amount.
      </NumSlideInput>
      <NumSlideInput
        title="PMI Rate"
        v-model="mortgage.pmiPct"
        :type="CalcInputType.Percent"
        :min="0"
        :max="3"
      >
        Private mortgage insurance. This is automatically applied if the down payment is less than
        20% of the purchase price.
        <br />
        This can be set to 0% if this loan is exempt from PMI.
      </NumSlideInput>
      <div v-if="mortgage.isArm">
        <NumSlideInput
          title="ARM Fixed Rate Term"
          v-model="mortgage.arm.fixedYear"
          :type="CalcInputType.Years"
          :min="1"
          :max="10"
        >
          The period of time during which the interest rate is fixed. After this period, the
          interest rate will change to the floating interest rate.
          <br />
          This is typically 3, 5, 7, or 10 years.
        </NumSlideInput>
        <NumSlideInput
          title="ARM Floating Interest Rate"
          v-model="mortgage.arm.interestFloatPct"
          :type="CalcInputType.Percent"
          :min="0"
          :max="20"
        >
          The floating interest rate for an ARM (adjustable) loan. This is the rate charged after
          the initial fixed rate period.
          <br />
          This rate is typically based on the LIBOR index plus a margin and will change over time. A
          best estimate of the average floating interest rate can be used.
        </NumSlideInput>
      </div>
    </q-expansion-item>
    <q-item>
      <q-item-section>
        <q-btn
          dense
          color="primary"
          label="Add Mortgage"
          @click="addMortgage(getDefaultMortgage())"
        ></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

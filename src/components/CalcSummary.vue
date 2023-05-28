<script setup lang="ts">
import { computed } from 'vue'
import type { CalcHouseOutput, CalcRentOutput } from '@/calc/types'
import { toCurrency, divSafe } from '@/calc/util'
import HelpTooltip from '@/components/HelpTooltip.vue'

const props = defineProps<{
  calcHouse: CalcHouseOutput
  calcRent: CalcRentOutput
}>()

const lastPaidHouse = computed(
  () => props.calcHouse.paidTotal[props.calcHouse.paidTotal.length - 1]
)
const lastPaidRent = computed(() => props.calcRent.paidTotal[props.calcRent.paidTotal.length - 1])

const avgMonthlyHouse = computed(
  () =>
    props.calcHouse.recurringYearly.reduce((a, b) => a + b, 0) /
    props.calcHouse.recurringYearly.length
)
const avgMonthlyRent = computed(
  () =>
    props.calcRent.recurringYearly.reduce((a, b) => a + b, 0) /
    props.calcRent.recurringYearly.length
)

const houseNetGain = computed(() => props.calcHouse.sellRevenue - props.calcHouse.netLosses)
const rentNetGain = computed(() => -props.calcRent.netLosses)
const houseIsBestGain = computed(() => houseNetGain.value > rentNetGain.value)
</script>

<template>
  <q-markup-table>
    <thead class="bg-primary text-white">
      <tr>
        <th colspan="3" class="text-left">
          <div class="text-body2">SUMMARY</div>
        </th>
      </tr>
    </thead>
    <thead class="bg-grey-4">
      <tr>
        <th class="text-left"><b>Category</b></th>
        <th class="text-right"><b>For House</b></th>
        <th class="text-right"><b>For Rent</b></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-left">
          Principal Paid
          <HelpTooltip>
            This is money paid to reduce the loan balance of the house.
            <br />
            When the principal equals the purchase price of the house, the loan is paid off.
            <br />
            Money paid towards the principal will be recovered when the house is sold.
            <br />
            This does not apply to rent.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(lastPaidHouse.principal) }}</td>
        <td class="text-right">-</td>
      </tr>
      <tr>
        <td class="text-left">
          Interest Paid
          <HelpTooltip>
            This is money paid towards the interest on the loan.
            <br />
            This money goes to the mortgage provider and is not recovered when the house is sold.
            <br />
            This does not apply to rent.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(lastPaidHouse.interest) }}</td>
        <td class="text-right">-</td>
      </tr>
      <tr>
        <td class="text-left">
          Expenses Paid
          <HelpTooltip>
            This is money paid towards general expenses.
            <br />
            This includes things like maintenance, repairs, utilities, fees, etc.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(lastPaidHouse.expenses) }}</td>
        <td class="text-right">{{ toCurrency(lastPaidRent.expenses) }}</td>
      </tr>
      <tr>
        <td class="text-left">
          Taxes Paid
          <HelpTooltip>
            This is money paid in taxes for housing-related reasons.
            <br />
            This includes things like property taxes, sales taxes, etc.
            <br />
            This also includes estimated savings from mortgage interest tax deductions.
            <br />
            This does not apply to rent.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(lastPaidHouse.taxes) }}</td>
        <td class="text-right">-</td>
      </tr>
      <tr>
        <td class="text-left">
          Opportunity Costs
          <HelpTooltip>
            The calculator assumes that everything you spent in a year <i>could</i> have instead
            been placed in traditional investments.
            <br />
            This is the estimated amount of money you would have earned if you had done so.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(lastPaidHouse.opportunity) }}</td>
        <td class="text-right">{{ toCurrency(lastPaidRent.opportunity) }}</td>
      </tr>
      <tr>
        <td class="text-left">
          Total Costs
          <HelpTooltip>
            This is the total amount of money spent on housing-related expenses.
            <br />
            This includes principal, interest, expenses, taxes, and opportunity costs.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(calcHouse.netLosses) }}</td>
        <td class="text-right">{{ toCurrency(calcRent.netLosses) }}</td>
      </tr>
      <tr>
        <td class="text-left">
          Selling Profit
          <HelpTooltip>
            This is the estimated profit from selling the house at the end of the ownership period.
            <br />
            This is calculated by subtracting the final loan balance from the final value of the
            house.
            <br />
            This does not apply to rent.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(calcHouse.sellRevenue) }}</td>
        <td class="text-right">-</td>
      </tr>
      <tr>
        <td class="text-left">
          Monthly Payment
          <HelpTooltip>
            This is the average monthly payment made towards recurring housing costs.
            <br />
            These recurring costs include anything that is paid monthly or yearly (loan payments,
            rent, taxes, etc).
            <br />
            It does not include any one-time costs (down payment, closing costs, etc).
            <br />
            Savings from mortgage interest tax deductions are included; it is assumed that you will
            adjust your income tax withholdings to account for this deduction.
          </HelpTooltip>
        </td>
        <td class="text-right">{{ toCurrency(divSafe(avgMonthlyHouse, 12)) }}</td>
        <td class="text-right">{{ toCurrency(divSafe(avgMonthlyRent, 12)) }}</td>
      </tr>
      <tr>
        <td class="text-left text-bold" style="font-size: 12pt">
          Net Gain
          <HelpTooltip class="q-mb-xs">
            This is the total amount of money gained or lost from the housing decision.
            <br />
            This is calculated by subtracting the total costs from the selling profit (if any).
            <br />
            A positive number means you made money. Congrats!
          </HelpTooltip>
        </td>
        <td class="text-right text-bold" style="font-size: 12pt">
          <span :class="houseIsBestGain ? '' : 'text-red-14'">{{ toCurrency(houseNetGain) }}</span>
        </td>
        <td class="text-right text-bold" style="font-size: 12pt">
          <span :class="!houseIsBestGain ? '' : 'text-red-14'">{{
            toCurrency(-calcRent.netLosses)
          }}</span>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

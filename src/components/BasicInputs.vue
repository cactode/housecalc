<script setup lang="ts">
import { computed } from 'vue'
import { MAX_INTEREST_DEDUCTION } from '@/stores/constants'
import { toCurrency } from '@/calc/util'
import { CalcInputType, type BasicVars } from '@/calc/types'
import NumSlideInput from '@/components/NumSlideInput.vue'
import HelpTooltip from '@/components/HelpTooltip.vue'

const props = defineProps<{
  modelValue: BasicVars
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: BasicVars): void
}>()

const inputs = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <q-list bordered separator class="rounded-borders">
    <q-item-label header> INPUTS </q-item-label>
    <q-expansion-item bordered expand-separator label="House Variables" icon="home" default-opened>
      <NumSlideInput
        title="Ownership Period"
        :type="CalcInputType.Years"
        :min="1"
        :max="40"
        v-model="inputs.financial.sellYear"
      >
        How long the house is owned for before it gets sold.
        <br />
        If the house is sold before the mortgage is paid off, the remaining mortgage balance is paid
        off with the proceeds of the sale.
      </NumSlideInput>
      <NumSlideInput
        title="Price"
        :type="CalcInputType.Dollar"
        :min="100000"
        :max="4000000"
        v-model="inputs.house.price"
      >
        The purchase valuation of the house.
      </NumSlideInput>
      <NumSlideInput
        title="Yearly Appreciation Rate"
        :type="CalcInputType.Percent"
        :min="-3"
        :max="10"
        v-model="inputs.house.apprecPct"
      >
        The yearly appreciation rate of the house's valuation. This is not inflation-adjusted.
        <br />
        The default value is the historical average from 2004-2019 in King County, Washington, as
        determined from the Home Price Index from the U.S FHFA.
        <br />
        Note that this number is extremely hard to predict and is intrinsically tied to the economy
        in general.
      </NumSlideInput>
      <NumSlideInput
        title="Remodeling Costs"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="100000"
        v-model="inputs.house.remodelCost"
      >
        One-time costs of remodeling the house after purchase. This can include things like
        painting, new flooring, new appliances, etc.
      </NumSlideInput>
      <NumSlideInput
        title="Seller Credits"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="200000"
        v-model="inputs.house.sellerCredits"
      >
        Money received from the seller to cover closing costs, repairs, etc.
        <br />
        This is treated as a "rebate" and does not reduce the assessed purchase value of the house.
        Rather, it decreases your total expenses.
        <br />
        Credits are not treated as general income and are not taxed, but they will be taxed as
        profit for capital gains tax purposes.
        <br />
        Seller credits cannot exceed 3% of the purchase price if 0%-10% is put down, 6% if 10%-25%
        is put down, or 9% if more than 25% is put down.
      </NumSlideInput>
      <NumSlideInput
        title="Monthly Utilities Costs"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="1000"
        v-model="inputs.house.utilitiesMonth"
      >
        Monthly costs incurred for utilities. This can include things like electricity, water, gas,
        internet, etc. This accounts for general inflation.
      </NumSlideInput>
      <NumSlideInput
        title="Yearly Upkeep Costs"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="10000"
        v-model="inputs.house.upkeepYear"
      >
        Yearly upkeep costs. This accounts for general inflation.
        <br />
        This does not account for house value appreciation, as it is assumed that the house will
        cost the same amount to fix regardless of its value.
        <br />
        As a general rule of thumb: each square foot of livable space will add $1 to the yearly
        upkeep costs.
      </NumSlideInput>
      <NumSlideInput
        title="Monthly HOA Fees"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="2000"
        v-model="inputs.house.hoaMonth"
      >
        Monthly HOA fees. This accounts for general inflation.
      </NumSlideInput>
      <NumSlideInput
        title="Insurance Percentage Costs"
        :type="CalcInputType.Percent"
        :min="0"
        :max="0.5"
        v-model="inputs.house.insurancePct"
      >
        Yearly insurance costs as a percentage of the current house price. This accounts for house
        value appreciation.
      </NumSlideInput>
      <NumSlideInput
        title="Selling Fees"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="100000"
        v-model="inputs.house.sellingFees"
      >
        Flat fees charged for the sale of the house. These can include realtor fees, closing costs,
        seller credits, etc.
      </NumSlideInput>
      <NumSlideInput
        title="Selling Percentage Fees"
        :type="CalcInputType.Percent"
        :min="0"
        :max="15"
        v-model="inputs.house.sellingFeesPct"
      >
        Fees charged for the sale of the house as a percentage of the final price. This can be used
        instead of / in conjunction with the flat fees.
      </NumSlideInput>
    </q-expansion-item>
    <q-expansion-item bordered expand-separator label="Rent Variables" icon="location_city">
      <NumSlideInput
        title="Rent Monthly Cost"
        :type="CalcInputType.Dollar"
        :min="100"
        :max="15000"
        v-model="inputs.rent.priceMonth"
      >
        Rent paid each month. This accounts for rent inflation.
      </NumSlideInput>
      <NumSlideInput
        title="Monthly Utilities Costs"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="1000"
        v-model="inputs.rent.utilitiesMonth"
      >
        Monthly costs incurred for utilities. This can include things like electricity, water, gas,
        internet, etc. This accounts for general inflation.
      </NumSlideInput>
      <NumSlideInput
        title="Rent Yearly Appreciation Rate"
        :type="CalcInputType.Percent"
        :min="-3"
        :max="10"
        v-model="inputs.rent.apprecPct"
      >
        The yearly appreciation rate of rent prices. This is not inflation-adjusted.
        <br />
        The default value is the historical average over 2005-2019 in King County, Washington as
        determined from census data.
        <br />
        Note that this number is extremely hard to predict and is intrinsically tied to the economy
        in general.
      </NumSlideInput>
    </q-expansion-item>
    <q-expansion-item bordered expand-separator label="Tax Variables" icon="account_balance">
      <q-item>
        <q-item-section>
          <q-item-label>
            Tax Filing Status
            <HelpTooltip>
              Determines the tax brackets that will be used for income tax and capital gains tax
              calculations. Tax brackets are from 2023.
            </HelpTooltip>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-select
            outlined
            v-model="inputs.taxes.singleFiler"
            emit-value
            map-options
            :options="[
              { label: 'Single', value: true },
              { label: 'Married Filing Jointly', value: false }
            ]"
          />
        </q-item-section>
      </q-item>
      <NumSlideInput
        title="Existing Itemized Deductions"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="50000"
        v-model="inputs.taxes.itemDeductions"
      >
        Existing itemized deductions. Used to estimate mortgage interest deductions.
        <br />
        Interest paid on up to {{ toCurrency(MAX_INTEREST_DEDUCTION) }} of mortgage debt is
        deductible.
        <br />
        The calculator calculates your taxes:
        <ul>
          <li>With the standard deduction</li>
          <li>With any of your itemized deductions</li>
          <li>With the mortgage deduction + your itemized deductions.</li>
        </ul>
        If the mortgage deduction saves you money over the first two options, the savings will be
        subtracted from the "Taxes" section of the results. If not, the mortgage deduction will not
        be used.
      </NumSlideInput>
      <NumSlideInput
        title="Property Tax Percentage"
        :type="CalcInputType.Percent"
        :min="0"
        :max="3"
        v-model="inputs.taxes.propertyPct"
      >
        Yearly property tax as a percentage of the current house price. Accounts for house value
        appreciation. The default value is for King County, Washington
      </NumSlideInput>
      <q-item>
        <q-item-section>
          <q-item-label>
            Add Washington-Specific Taxes
            <HelpTooltip>
              Whether or not Washington-specific taxes like REET should be assessed when the house
              is sold.
            </HelpTooltip>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="inputs.taxes.addReet"></q-toggle>
        </q-item-section>
      </q-item>
      <NumSlideInput
        v-if="inputs.taxes.addReet"
        title="Local REET Tax Percentage"
        :type="CalcInputType.Percent"
        :min="0"
        :max="2"
        v-model="inputs.taxes.reetLocalPct"
      >
        REET tax is charged at the state level. The calculator automatically includes this. REET is
        also charged at the county level. Refer to Washington's tax code for your county's rates.
        The default value is for King County, Washington.
      </NumSlideInput>
    </q-expansion-item>
    <q-expansion-item bordered expand-separator label="Financial Variables" icon="attach_money">
      <NumSlideInput
        title="Yearly Income"
        :type="CalcInputType.Dollar"
        :min="0"
        :max="1000000"
        v-model="inputs.financial.incomeYear"
      >
        Yearly pre-tax income. Used to estimate mortgage interest deductions.
      </NumSlideInput>
      <NumSlideInput
        title="Savings Investment Rate"
        :type="CalcInputType.Percent"
        :min="0"
        :max="10"
        v-model="inputs.financial.investPct"
      >
        Rate at which unspent capital can be expected to grow through investments each year. This is
        used to calculate opportunity cost.
      </NumSlideInput>
      <NumSlideInput
        title="General Inflation Rate"
        :type="CalcInputType.Percent"
        :min="0"
        :max="10"
        v-model="inputs.financial.inflatePct"
      >
        Rate at which the general cost of living is expected to increase each year.
      </NumSlideInput>
    </q-expansion-item>
  </q-list>
</template>

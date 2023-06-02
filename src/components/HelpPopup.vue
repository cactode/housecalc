<script setup lang="ts">
import { computed } from 'vue'
import imgUrl from '@/assets/born-to-die.gif'
import HelpTooltip from '@/components/HelpTooltip.vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const help = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <q-dialog v-model="help" transition-show="rotate" transition-hide="rotate">
    <q-card>
      <q-card-section>
        <div class="row items-center">
          <div class="col text-h5">Calculator Help</div>
          <div class="col">
            <q-btn class="float-right" dense flat icon="close" v-close-popup />
          </div>
        </div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-lg">
        <div class="text-body1">
          <div class="text-h6">What does this do?</div>
          <div class="text-body1">
            Purchasing a home is a daunting task. There are tons of variables that can affect how
            much money you'll save or lose in the long run, but it's hard to figure out which
            variables matter and which ones don't.
            <br /><br />
            This calculator is designed to give you an easy way to "fiddle" with the knobs and
            explore how they affect things like long-term profits, short-term mortgage payments,
            etc.
            <br /><br />
            This calculator also strives to be as <i>accurate</i> as possible. Factors including
            refinancing, mortgage interest deductions, opportunity cost and more are included.
          </div>
          <br />
          <div class="text-h6">How do I use it?</div>
          <div class="text-body1">
            Use the sliders on the left to change the calculator's inputs. The tables and charts on
            the right will automatically update themselves. The "Summary" table shows the financial
            breakdown of your expenses and gains after your ownership period ends and you sell your
            house. The "Charts" section shows how your expenses and gains change over time.
            <br /><br />
            If you don't know what something means, click the
            <HelpTooltip>Don't click this one, though. This one is useless.</HelpTooltip>
            for more details.
            <br /><br />
            By default, the calculator assumes that you'll have one mortgage for the duration of the
            loan. If you want to change mortgages (e.g. refinancing for a better rate, changing the
            loan type from ARM to Fixed), you can click "Add Mortgage" and use the "Start" input to
            change when the new mortgage takes over.
            <br /><br />
            If you want to share your results with someone else, you can click "Share" to generate a
            link.
          </div>
          <br />
          <div class="text-h6">What's included in these calculations?</div>
          <div class="text-body1">
            Lots of things! Here's a list of the most important ones:
            <br />
            <ul>
              <li>Buying costs</li>
              <li>Property taxes</li>
              <li>Sales taxes</li>
              <li>Selling costs</li>
              <li>Opportunity costs</li>
              <li>Mortgage interest deduction tax benefits</li>
              <li>House appreciation</li>
              <li>Rent and general inflation</li>
              <li>Fixed mortgage payments</li>
              <li>ARM mortgage payments</li>
              <li>Refinancing between mortgages</li>
              <li>Mortgage closing costs and fees</li>
              <li>Mortgage down payments and fees</li>
              <li>Washington-specific taxes (optional)</li>
              <li><i>etc...</i></li>
            </ul>
          </div>
          <div class="text-h6">My state charges extra sales taxes. What about those?</div>
          <div class="text-body1">
            If you live in Washington (me too!), you're in luck. This calculator can apply
            Washington's REET sales taxes if you turn on the "Add Washington-Specific Taxes" toggle.
            <br /><br />
            Otherwise, you'll need to factor those in by hand.
          </div>
          <br />
          <div class="text-h6">Why are the default prices so high?</div>
          <div class="text-body1">
            I live in Seattle. Every day, our real estate market strays further from God's light.
          </div>
          <br />
          <div class="text-h6">How accurate is it?</div>
          <div class="text-body1">
            Pretty accurate... I think? I am not a realtor / tax lawyer / loan officer / webdev, so
            take everything this spits out with a grain of salt. If you <i>are</i> one of those
            things and you spot an error, please let me know!
            <br />
            <a href="https://en.wikipedia.org/wiki/Garbage_in,_garbage_out"
              >Also, there's an old saying...</a
            >
            <br />
            This calculator is only as accurate as the inputs you provide to it! The prepopulated
            values are best estimates - make sure you change them to fit your exact situation!
          </div>
          <br />
          <div class="text-h6">I found a mistake in the math!</div>
          <div class="text-body1">
            Woops!
            <a href="https://github.com/cactode/housecalc/issues"
              >Please let me know so I can fix it!</a
            >
          </div>
          <br />
          <div class="text-h6">Why does the UX look terrible?</div>
          <q-img :src="imgUrl" style="max-width: 256px"></q-img>
          <div class="text-body1">
            I'm not a webdev, so I'm slapping this together using Quasar's UI components. It's not
            much, but it's honest work.
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

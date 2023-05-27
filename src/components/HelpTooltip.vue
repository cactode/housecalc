<template>
  <q-icon name="help_outline" color="grey-8" size="sm">
    <q-popup-proxy>
      <q-banner>
        <p class="text-body1 q-pa-sm" style="max-width: 25em">
          <slot></slot>
        </p>
      </q-banner>
    </q-popup-proxy>
  </q-icon>
</template>

<template>
  <q-item v-if="text !== 'Catalog'" class="GNL__drawer-item" clickable to="/" >
    <q-item-section avatar>
      <q-icon :name="icon" class="text-grey-6"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ text }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item v-else class="GNL__drawer-item"  clickable to="/catalog" exact>
    <q-item-section avatar>
      <q-icon :name="icon" class="text-grey-6"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ text }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    text: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.GNL__drawer-item {
  line-height: 24px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
}

.GNL__drawer-item .q-item__section--avatar .q-icon {
  color: #5f6368;
}

.GNL__drawer-item .q-item__label {
  color: #3c4043;
  letter-spacing: .01785714em;
  font-size: .850rem;
  font-weight: 500;
  line-height: 1.25rem;
}
</style>

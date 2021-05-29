<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-white text-grey-8">
      <q-toolbar class="GNL__toolbar">

        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap text-dark text-weight-bold">
          <!--img src="https://fonts.gstatic.com/s/i/materialicons/settings/v15/24px.svg">-->
          <q-icon name="settings_applications" color="primary"/>
          ORDER <span class="text-primary q-pl-sm"> APP</span>
        </q-toolbar-title>

        <q-space/>
        <q-select outlined class="GNL__toolbar-input q-pt-md"
                  color="bg-grey-7 shadow-1" bottom-slots v-model="model" :options="options" label="Shop Location"
                  :dense="dense" :options-dense="denseOpts">
          <template v-slot:prepend>
            <q-icon name="place" @click.stop/>
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="model = ''" class="cursor-pointer"/>
          </template>
        </q-select>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="video_call">
            <q-tooltip>Video Call</q-tooltip>
          </q-btn>
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="chat">
            <q-tooltip>Chat</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="250"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <EssentialLink
            v-for="link in links1"
            :key="link.title"
            v-bind="link"
          />
          <q-separator inset class="q-my-sm"/>

          <q-item-label
            header
            class="text-grey-7 text-weight-bold"
          >
            INVENTORY
          </q-item-label>

          <EssentialLink
            v-for="link in links2"
            :key="link.title"
            v-bind="link"
          />
          <q-separator inset class="q-my-sm"/>

          <q-item-label
            header
            class="text-grey-7 text-weight-bold">
            STATISTICS
          </q-item-label>

          <EssentialLink
            v-for="link in links3"
            :key="link.title"
            v-bind="link"
          />

          <q-separator inset class="q-my-sm q-px-sm"/>

          <div class="row justify-center text-caption">
            <span class="col-2">
                About
            </span>
            <span class="col-2">
              Press
            </span>
            <span class="col-3">
              Copyright
            </span>
            <span class="col-3">
              Contact us
            </span>
          </div>
          <div class="row justify-evenly text-caption">
            <span class="col-3">
                Creators
            </span>
            <span class="col-3">
              Advertise
            </span>
            <span class="col-3">
              Developer
            </span>
          </div>
          <div class="row justify-center text-caption q-pt-sm">
            <span class="col-3">
                Terms
            </span>
            <span class="col-3">
              Privacy
            </span>
            <span class="col-5">
              Policy & Safety
            </span>
          </div>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      model: null,
      leftDrawerOpen: false,
      options: [
        'MD DAKAR', 'MD ABIDJAN', 'MD LOME', 'MD DOUALA', 'MD BAMAKO'
      ],
      links1: [
        {icon: 'home', text: 'Home'},
        {icon: 'ballot', text: 'Order Upcoming'},
        {icon: 'grid_on', text: 'Confirmed Order'},
        {icon: 'local_shipping', text: 'Deliver Form'},
        {icon: 'history', text: 'Archived'}
      ],
      links2: [
        {icon: 'fas fa-warehouse', text: 'Catalog'},
        {icon: 'fas fa-gifts', text: 'Promotions'},
        {icon: 'import_export', text: 'Import From Square'}
      ],
      links3: [
        {icon: 'assessment', text: 'Delivery Man'}
      ],
      dense: true,
      denseOpts: false,
    }
  }
}
</script>

<style>
.GNL__toolbar {
  height: 64px;
}

.GNL__toolbar-input {
  width: 55%;
}

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

.GNL__drawer-footer-link {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: .75rem;
}

.GNL__drawer-footer-link:hover {
  color: #000;
}
</style>

<template>

  <div class="row q-col-gutter-sm q-pa-sm bg-grey-1">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-breadcrumbs class="text-grey q-pl-sm q-pt-sm">
        <q-breadcrumbs-el icon="home" class="text-primary"/>
        <q-breadcrumbs-el label="Catalog" class="text-dark text-subtitle1"/>
      </q-breadcrumbs>
      <div class="q-px-sm text-h6">Products</div>
      <q-card class="text-grey-8">
        <q-spinner v-if="showSpinner"
                   color="primary"
                   size="3em"
                   :thickness="10"
        />
        <q-card-section class="q-pa-none">
          <q-table class="no-shadow"
                   :data="that_data"
                   :columns="columns"
                   row-key="id"
                   :filter="filter"
                   :hide-bottom="true"
                   virtual-scroll
                   :pagination.sync="pagination"
                   :rows-per-page-options="[0]"
          >
            <template v-slot:top-left="props">
              <q-input outlined v-model="filter" label="Search" counter dense
                       class="q-pb-lg" :input-style="toggleInput">
                <template v-slot:prepend>
                  <q-icon name="search"/>
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click="filter = ''" class="cursor-pointer"/>
                </template>
                <template v-slot:hint>
                  SKU name
                </template>
                <template v-slot:after>
                  <q-checkbox v-model="checkBoxPosition" label="Include inactive"
                              class="q-pt-lg-sm text-subtitle1 text-dark"/>
                </template>
              </q-input>

              <q-file
                class="hidden"
                outlined
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                :value="file"
                @input="importFile"
                label="IMPORT NEW SKU(S)"
                label-color="primary"
                ref="myFile">
                <template v-slot:prepend>
                  <q-icon name="fas fa-file-import" color="primary"/>
                </template>
              </q-file>

              <q-btn
                color="primary"
                outline
                icon="fas fa-file-import"
                label="IMPORT NEW SKU(S)"
                no-caps
                @click="forFile"
              />
              <span class="text-red text-h6">{{message}}</span>
              <q-page-sticky position="bottom-right" :offset="[50, 18]" style="z-index: 1">
                <q-btn round icon="refresh" color="blue" @click="fetchData"/>
              </q-page-sticky>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>

import {exportFile} from "quasar";
import {getAllProducts, upload} from "src/store/module-example/crud-product";

export default {
  name: "Catalog",
  props: {
    model: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      file: null,
      message: '',
      that_data: [],
      those_data: [],
      showSpinner: false,
      filter: '',
      mode: 'list',
      checkBoxPosition: false,
      columns: [
        {
          name: 'id',
          align: 'left',
          label: 'No',
          field: row => row.id,
          sortable: true,
          headerClasses: 'bg-dark text-white',
          classes: 'bg-grey-2 ellipsis',
        },
        {
          name: 'catalog_name',
          align: 'left',
          label: 'Catalog',
          field: 'catalog_name',
          sortable: true,
          classes: 'bg-grey-2',
          headerClasses: 'bg-primary text-white',
          style: 'width: 900px; min-width: 400px'
        },
        {
          name: 'color',
          required: true,
          label: 'Color',
          align: 'left',
          field: 'color',
          sortable: true,
          headerClasses: 'bg-dark text-white',
        },
        {
          name: 'size',
          required: true,
          label: 'Size',
          align: 'left',
          field: 'size',
          sortable: true,
          headerClasses: 'bg-dark text-white',
        },
        {
          name: 'quantity',
          align: 'right',
          label: 'Quantity',
          field: 'quantity',
          sortable: true,
          headerClasses: 'bg-dark text-white',
          style: 'max-width: 50px'
        }
      ],
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  methods: {
    fetchData() {
      this.showSpinner = true
      return getAllProducts().then(t => {
        this.that_data = t
        this.those_data = t
        this.showSpinner = false
      })
    },
    forFile($event) {
      this.$refs.myFile.pickFiles();
    },
    importFile(file) {
      this.file = file;
      let formData = new FormData();
      formData.append('file', this.file)
      upload(formData)
      .then((message) => {
        this.message = message
        setTimeout(() => this.message = '', 5000)
      })
    }
  },
  computed: {
    toggleInput() {
      return this.$q.screen.lt.md ? '' : 'width: 360px'
    }
  },
  watch: {
    model: function (newVal, oldVal) {
      let filteredData = []
      this.that_data = this.those_data
      if (newVal !== null && newVal !== '') {
        this.that_data.forEach(value => {
          if (value.location_name === newVal) {
            filteredData.push(value)
          }
        })
        this.that_data = filteredData
      }
    }
  },
  mounted() {
    this.showSpinner = true
    getAllProducts().then(t => {
      this.that_data = t
      this.those_data = t
      this.showSpinner = false
    })
  }
}
</script>

<style scoped>
@media only screen and (min-width: 768px) {

}
.q-field--outlined:hover .q-field__control:before {
  border-color: red;
}
</style>

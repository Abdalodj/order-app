<template>

  <div class="row q-col-gutter-sm q-pa-sm bg-grey-1">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-breadcrumbs class="text-grey q-pl-sm q-pt-sm">
        <q-breadcrumbs-el icon="home" class="text-primary"/>
        <q-breadcrumbs-el label="Catalog" class="text-dark text-subtitle1"/>
      </q-breadcrumbs>
      <div class="q-px-sm text-h6">Products</div>
      <q-card class="text-grey-8">
        <q-card-section class="q-pa-none">
          <q-table class="no-shadow"
                   :data="data"
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
                  <q-icon name="close" @click="text = ''" class="cursor-pointer"/>
                </template>
                <template v-slot:hint>
                  SKU name
                </template>
                <template v-slot:after>
                  <q-checkbox v-model="checkBoxPosition" label="Include inactive" class="q-pt-lg-sm text-subtitle1 text-dark" />
                </template>
              </q-input>

              <q-btn
                color="primary"
                outline
                icon="fas fa-file-import"
                label="IMPORT NEW SKU(S)"
                no-caps
                @click="exportTable"
              />
              <q-page-sticky  position="bottom-right" :offset="[50, 18]" style="z-index: 1">
                <q-btn round icon="refresh" color="blue" />
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

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
export default {
  name: "Catalog",
  data() {
    return {
      filter: '',
      mode: 'list',
      checkBoxPosition: false,
      columns: [
        {
          name: 'no',
          align: 'left',
          label: 'No',
          field: row => row.no,
          sortable: true,
          headerClasses: 'bg-dark text-white',
          classes: 'bg-grey-2 ellipsis',
        },
        {
          name: 'id',
          align: 'left',
          label: 'Catalog',
          field: 'id',
          sortable: true,
          classes: 'bg-grey-2',
          headerClasses: 'bg-primary text-white',
          style: 'width: 900px; min-width: 400px'
        },
        {
          name: 'desc',
          required: true,
          label: 'Color',
          align: 'left',
          field: 'name',
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
          name: 'date',
          align: 'right',
          label: 'Quantity',
          field: 'date',
          sortable: true,
          headerClasses: 'bg-dark text-white',
          style: 'max-width: 50px'
        }
      ],
      data: [
        {
          no: 1,
          id: "U0001",
          size: '1',
          name: 'VLG',
          date: '45'
        },
        {
          no: 2,
          id: "U0002",
          size: '2',
          name: 'VLG',
          date: '45'
        },
        {
          no: 3,
          id: "U0003",
          size: '2',
          name: 'VLG',
          date: '45'
        },
        {
          no: 4,
          id: "U0004",
          size: '2',
          name: 'LIP',
          date: '45'
        },
        {
          no: 5,
          id: "U0005",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
        {
          no: 6,
          id: "U0006",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
        {
          no: 7,
          id: "U0007",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
        {
          no: 8,
          id: "U0008",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
        {
          no: 9,
          id: "U0009",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
        {
          no: 10,
          id: "U0010",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
        {
          no: 11,
          id: "U0011",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
        {
          no: 12,
          id: "U0012",
          size: 'BALM',
          name: 'LIP',
          date: '45'
        },
      ],
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.data.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  },
  computed: {
    toggleInput() {
      return this.$q.screen.lt.md ? '' : 'width: 360px'
    }
  }
}
</script>

<style scoped>
@media only screen and (min-width: 768px) {

}
</style>

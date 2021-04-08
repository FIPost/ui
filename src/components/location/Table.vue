<!--
    Table adapted from: https://vuejs.org/v2/examples/grid-component.html
    IMPORTANT! for sorting to work table headers need to have the same name as the objects properties
-->

<template>
    <table>
        <thead>
            <tr>
                <th v-for="key in columns" :key="key" 
                    @click="sortBy(key)" 
                    :class="{ active: sortKey == key}">
                    {{key}}
                    <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="entry in filteredItems" :key="entry">
                <td v-for="key in entry" :key="key">
                    {{key}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent ({
    props: {
        items: Object[0],
        columns: String[0],
        filterKey: String,
    },

    data() {
        var sortOrders = {};
        var columns = this.columns;
        columns.forEach(function(key) {sortOrders[key] = 1;});
        return {sortKey: "", sortOrders: sortOrders};
    },

    computed: {
        filteredItems(): Object[] {
            var items = this.items;

            //TODO: add filter rules here

            //Sort the items
            //IMPORTANT! for sorting to work table headers need to have the same name as the objects properties
            var sortKey = this.sortKey;
            var order = this.sortOrders[sortKey] || 1;
            if(sortKey) {
                items.sort(function(a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }

            return items;
        }
    },

    methods: {
        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styling/main.scss";

table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
}

thead tr {
    box-shadow: $shadow;
}

th {
    cursor: pointer;
    color: $black-color;
    text-decoration: none;
}

table td, th {
    padding: 0.75em !important;
}

td:first-child {
    font-weight: bold;
}

.active {
    text-decoration: underline;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid $black-color;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid $black-color;
}

</style>
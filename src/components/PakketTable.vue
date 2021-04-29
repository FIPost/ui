<template>
    <div class="component-container table-container">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="column">
                        <a href="#" @click="sortBy(columnKeys[index])">
                            {{column}}
                            <span v-if="reverse && sortKey==columnKeys[index]">
                            <font-awesome-icon icon="sort-up" :class="sortKey==columnKeys[index] ? 'sort-arrow-focus' : 'sort-arrow-defocus'"/>
                            </span>
                            <span v-else>
                            <font-awesome-icon icon="sort-down" :class="sortKey==columnKeys[index] ? 'sort-arrow-focus' : 'sort-arrow-defocus'"/>
                            </span>
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sortedList" :key="item" @click="onClick(item.id)">
                    <td>{{item.name}}</td>
                    <td v-if="item.receiver">{{ item.receiver ? item.receiver.name : 'Kon niet worden opgehaald'}}</td>
                    <td>{{ item.routeFinished ? 'afgeleverd' : 'In behandeling'}}</td>

                    <td v-if="item.collectionPoint">{{item.collectionPoint.building.address.city.name}} {{item.collectionPoint.building.name}} {{item.collectionPoint.name}}</td>
                    <td v-else>Kon niet worden opgehaald</td>

                    <td v-if="item.tickets[0]">{{ item.tickets[0].createdAt }}</td>
                    <td v-else>Geen Datum</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from 'lodash';

const PakketTable = defineComponent({
    data() {
        return {
            sortKey: "id",
            reverse: false
        }
    },
    props: {
        columns: Array,
        columnKeys: Array,
        packages: Array
    },
    methods: {
        sortBy: function(sortKey: string) {
            this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false;
            this.sortKey = sortKey;
        },
        onClick: function(id: string) {
            this.$router.push({
                name: 'PackagePage',
                params: { id: id }
            });
        }
    },
    computed: {
        sortedList(): [] {
            var dir = this.reverse? 'desc' : 'asc'
            return _.orderBy(this.packages, this.sortKey, dir);
        }
    }
});

export default PakketTable;
</script>

<style scoped lang="scss">
    @import "@/styling/main.scss";
    .table-container{
        padding: 0 !important;
    }

    .sort-arrow-defocus {
        color: $gray-color;
    }

    .sort-arrow-focus {
        color: $fontys-purple;
    }

    .table{
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;
    }

    thead tr{
        box-shadow: $shadow;
    }

    tbody tr {
      cursor: pointer;
    }

    th a{
        color: $black-color;
        text-decoration: none;
    }

    table td,th{
        padding: 0.75em !important;
    }

    td:first-child{
        font-weight: bold;
    }
</style>
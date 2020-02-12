<template>

    <div class="vue-leaflet">
        <div class="spinner-grow text-primary" role="status" v-if="!mapReady">
            <span class="sr-only">Loading...</span>
        </div>
        <l-map style="width: 100%; height: 600px;" :zoom="zoom" :center="center" v-if="mapReady">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker v-for="marker in  markers" :key="marker.latlng" :lat-lng="marker.latlng" :icon="marker.icon">
                <l-popup :content="marker.content"></l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
    import {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    } from 'vue2-leaflet';
    import L from 'leaflet';
    export default {
        name: 'VueLeaflet',
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup
        },
        props: {
            mapReady: {
                type: Boolean
            },
            quarantine: {
                type: Array,
            },
            buildings: {
                type: Array,
            }
        },
        data() {
            const alarmIcon = L.icon({
                iconUrl: require('../../assets/alarm.png'),

                iconSize: [40, 40] 
            });

            const homeIcon = L.icon({
                iconUrl: require('../../assets/home.png'),

                iconSize: [40, 40], 
            });

            return {
                zoom: 11,
                center: [22.3258896, 114.1585225],
                url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                marker: L.latLng(22.42872, 114.24345),
                text: '加惠臺1座',
                markers: [],
                homeIcon: homeIcon,
                alarmIcon: alarmIcon
            }
        },
        mounted() {
            this.createQMarker()

        },
        methods: {
            createQMarker() {
                 for (var j = 0; j < this.buildings.length; j++) {
                    let latlng = this.buildings[j].latlng.split(',')
                    let lat = parseFloat(latlng[0])
                    let lng = parseFloat(latlng[1])

                    this.markers.push({
                        // latlng: L.latLng(22.5085, 114.12545),
                        latlng: L.latLng(lat, lng),
                        content: this.buildings[j].building + ' 確診人士逗留日期: ' + this.buildings[j].date,
                        icon:this.alarmIcon
                    })
                }
                for (var i = 0; i < this.quarantine.length - 1; i++) {
                    let latlng = this.quarantine[i].latlng.split(',')
                    let lat = parseFloat(latlng[0])
                    let lng = parseFloat(latlng[1])
                    this.markers.push({
                        // latlng: L.latLng(22.5085, 114.12545),
                        latlng: L.latLng(lat, lng),
                        content: this.quarantine[i].building + ' 家居檢疫最後日期: '+ this.quarantine[i].date,
                        icon:this.homeIcon 
                    })
                }

            },


        },
        watch: {
            mapReady: function (newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                if (newVal == true) {
                    this.createMarker()
                }
            }
        }
    }
</script>

<style scoped>

</style>
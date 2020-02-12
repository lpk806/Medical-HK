<template>
    <div class="hello">
        <h1>街症平均診症名額</h1>

        <div class="spinner-grow text-primary" role="status" v-if="GOPCList.length<1">
            <span class="sr-only">Loading...</span>
        </div>

        <div class="card mb-3 row h-100" style="max-width: 540px;" v-for="GOPC in  GOPCList" :key="GOPC.Clinic">
            <div class="row no-gutters">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ GOPC.Clinic }}</h5>
                        <p class="card-text">{{ GOPC.District }}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            平均診症名額
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{{ GOPC.Clinic }}平均診症名額</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        星期一:{{ GOPC.Monday }} <br>
                                        星期二:{{ GOPC.Tuesday }} <br>
                                        星期三:{{ GOPC.Wednesday }} <br>
                                        星期四:{{ GOPC.Thursday }} <br>
                                        星期五:{{ GOPC.Friday }} <br>
                                        星期六:{{ GOPC.Saturday }} <br>
                                        星期日:{{ GOPC.Sunday }} <br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div id="map-container" class="map-container">

        </div> -->



        <!-- <img src="..." class="mr-3" alt="..."> -->

    </div>
</template>

<script>
    import axios from 'axios'


    export default {
        name: 'GOPC',
        data: () => ({
            GOPCList: [],
            updateTime: '',
             map: null,
        }),
        mounted() {
            this.getAEWaitngTime()
            // this.createMap()
        },
        methods: {
            getAEWaitngTime() {
                var cors_anywhere = 'https://cors-anywhere.herokuapp.com/'
                axios.get(cors_anywhere + 'http://www.ha.org.hk/pas_gopc/pas_gopc_avg_quota_pdf/g0_9uo7a_p-tc.json')
                    .then(result => {
                        this.GOPCList = result.data
                    }).catch(error => [
                        console.log(error)
                    ])
            },
            createMap() {

                this.map = this.$utils.map.createMap("map-container");
                this.map.setView([22.3524825,113.8475072], 13);

    // this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
    //           L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	// attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	// subdomains: 'abcd',
	// maxZoom: 19
// }).addTo(map);
            }
        }
    }
</script>

<style scoped>
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
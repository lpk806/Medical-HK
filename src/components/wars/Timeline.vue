<template>
    <div class="Timeline">
        <div class="container mt-5 mb-5">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h4>口罩零售商消息</h4>

      <div class="spinner-grow text-primary" role="status" v-if="postList.length<1">
        <span class="sr-only">Loading...</span>
      </div>
                    <div v-if="postList.length>0" class="timeline">
                            <div class="row no-gutters justify-content-end justify-content-md-around align-items-start  timeline-nodes" v-for="post in  postList" :key="post.text" >
          <div class="col-10 col-md-5 order-3 order-md-1 timeline-content">
            <h3 class=" text-light">{{post.company}}</h3>
            <p @click="goToWeb(post.link)">{{ post.text}}</p>
          </div>
          <div class="col-2 col-sm-1 px-md-3 order-2 timeline-image text-md-center">
            <img v-if='post.company == "莎莎"' src="@/assets/icons/sasa.jpg"  class="img-fluid img-thumbnail" alt="img">
            <img v-if='post.company == "屈臣氏"' src="@/assets/icons/Watsons.jpg"  class="img-fluid img-thumbnail" alt="img">
            <img v-if='post.company == "卓悅"' src="@/assets/icons/bonjour.jpg"  class="img-fluid img-thumbnail" alt="img">
            <img v-if='post.company == "日本城"' src="@/assets/icons/JHC.jpg"  class="img-fluid img-thumbnail" alt="img">
            <img v-if='post.company == "阿布泰國生活百貨"' src="@/assets/icons/abouthai.jpg"  class="img-fluid img-thumbnail" alt="img">
            <img v-if='post.company == "HKTV Mall"' src="@/assets/icons/hktvmall.png"  class="img-fluid img-thumbnail" alt="img">
            
          </div>
          <div class="col-10 col-md-5 order-1 order-md-3 py-3 timeline-date">
            <time>{{post.time}}</time>
          </div>
        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
      import axios from 'axios'
    import moment from 'moment'
    export default {
        name: 'Building',
        data: () => ({
            postList: [],
        }),
        mounted() {
            this.getFBPageUpdate()
        },
        methods: {
            getFBPageUpdate() {
                // var cors_anywhere = 'https://cors-anywhere.herokuapp.com/'
                axios.get('https://facebook-scraping-puppeteer.herokuapp.com/fbdata')
                .then(result => {
                    this.postList = []
                   var json = result.data

                      function compare(a, b) {
                    if (a.time < b.time) {
                        return 1;
                    }
                    if (a.time > b.time) {
                        return -1;
                    }
                    return 0;
                }

                json.sort(compare);

                
                json.forEach(element => {
                    var company = '';
                    var icon = '';
                    switch(element.company){
                        case 'sasahongkong':
                            company = '莎莎'
                            icon = '@/assets/icons/sasa.jpg'
                            break
                        case 'watsonshongkong': 
                            company = '屈臣氏'
                            icon = '@/assets/icons/Watsons.jpg'
                            break
                        case 'bonjourhk': 
                            company = '卓悅'
                            icon = '@/assets/icons/bonjour.jpg'
                            break
                        case 'JHC-日本城-289317227159': 
                            company = '日本城'
                            icon = '@/assets/icons/JHC.jpg'
                            break
                        case 'abouthai':
                            company = '阿布泰國生活百貨'
                            icon = '@/assets/icons/abouthai.jpg'
                            break
                        case 'hktvmall':
                            company = 'HKTV Mall'
                            icon = '@/assets/icons/hktvmall.png'
                            break

                            
                    }
                    this.postList.push({
                        time: moment(element.time * 1000).startOf('minutes').fromNow(),
                        text: element.text,
                        link: element.link,
                        company: company,
                        icon:icon
                    })
                });
                }).catch(error => [
                  console.log("error" + error)
                ])
            },
            goToWeb(link) {
                window.open(link);
            }
        }
    }
</script>

<style scoped>
   .timeline {
    padding: 50px 0;
    position: relative;
}
.timeline-nodes {
        padding-bottom: 25px;
        position: relative;
    }
.timeline-nodes:nth-child(even) {
    flex-direction: row-reverse;
}
.timeline h3, .timeline p {
    padding: 5px 15px;
} 
.timeline h3{
    font-weight: lighter;
    background: var(--blue);
}
.timeline p, .timeline time {
    color: var(--blue)
}
.timeline::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    border-left: 2px dashed var(--blue);
    height: 100%;
    z-index: 1;
    transform: translateX(-50%);
}
.timeline-content {
    border: 1px solid var(--blue);
    position: relative;
    border-radius: 0 0 10px 10px;
    box-shadow: 0px 3px 25px 0px rgba(10, 55, 90, 0.2)
}
/* .timeline-nodes:nth-child(odd) h3, */
/* .timeline-nodes:nth-child(odd) p {
    text-align: right;
} */
.timeline-nodes:nth-child(odd) .timeline-date {
    text-align: left;
    left: 5%;
}
 
.timeline-nodes:nth-child(even) .timeline-date {
    text-align: right;
    right:  5%;
}
.timeline-nodes:nth-child(odd) .timeline-content::after {
    content: "";
    position: absolute;
    top: 5%;
    left: 100%;
    width: 0;
    border-left: 10px solid var(--blue);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
.timeline-nodes:nth-child(even) .timeline-content::after {
    content: "";
    position: absolute;
    top: 5%;
    right: 100%;
    width: 0;
    border-right: 10px solid var(--blue);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
.timeline-image {
    position: relative;
    z-index: 100;
}
.timeline-image::before {
    content: "";
    width: 80px;
    height: 80px;
    border: 2px dashed var(--blue);
    border-radius: 50%;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    z-index: 1;
    

}
.timeline-image img {
    position: relative;
    z-index: 100;
    max-width: 60px;
    max-height: 60px;
    right: 170%;
}
/*small device style*/

@media (max-width: 767px) {
.timeline-nodes:nth-child(even) {
    flex-direction: row;
}
    .timeline::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 4%;
    width: 0;
    border-left: 2px dashed var(--blue);
    height: 100%;
    z-index: 1;
    transform: translateX(-50%);
}
.timeline h3 {
    font-size: 1.7rem;
}
.timeline p {
    font-size: 14px;
}
.timeline-image {
    position: absolute;
    left: 0%;
    top: 60px;
    /*transform: translateX(-50%;);*/
}
.timeline-nodes:nth-child(odd) .timeline-content::after {
    content: "";
    position: absolute;
    top: 5%;
    left: auto;
    right: 100%;
    width: 0;
    border-left: 0;
    border-right: 10px solid var(--blue);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
.timeline-nodes:nth-child(even) .timeline-content::after {
    content: "";
    position: absolute;
    top: 5%;
    right: 100%;
    width: 0;
    border-right: 10px solid var(--blue);
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
.timeline-nodes:nth-child(even) .timeline-date {
    text-align: left;
}
.timeline-image::before {
    width: 65px;
    height: 65px;
}

.timeline-nodes:nth-child(odd) .timeline-date {
    text-align: left;
    left: 0;
}
 
.timeline-nodes:nth-child(even) .timeline-date {
   text-align: left;
    right: 0;
}

}

/*extra small device style */
@media (max-width: 575px) {
    .timeline::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 3%;
}
.timeline-image {
    position: absolute;
    left: -5%;
    }
.timeline-image::before {
    width: 60px;
    height: 60px;
}

.timeline-image img{
    right: 0;
}

}

</style>
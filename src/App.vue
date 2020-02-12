<template>
  <div id="app">


    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <a class="navbar-brand" href="#">Medical HK</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
              aria-expanded="false">醫管局資訊</a>    
            <div class="dropdown-menu">
              <router-link class="dropdown-item" to="/">A&E等候時間</router-link>
            </div>
          </li>
          <!-- <li class="nav-item">
       <router-link class="nav-item nav-link" to="/about">街症平均診症名額</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-item nav-link" to="/wars">WARS</router-link>
      </li>      -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
              aria-expanded="false">武漢肺炎</a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" to="/wars/hk">本港疫情</router-link>
              <router-link class="dropdown-item" to="/wars/hk-case-details">本港確診個案詳情</router-link>
              <!-- <router-link class="dropdown-item" to="/wars/hk">外地疫情</router-link> -->
              <router-link class="dropdown-item" to="/wars/news">最新消息</router-link>
              

            </div>
          </li>
        </ul>
      </div>
    </nav>
    <router-view class="body-content"/>
    <footer class="page-footer font-small" style="background:#010101">

      <div class="footer-copyright text-center py-3" style="color:#FFF">© {{ new Date().getFullYear() }} Copyright:
        Lpk806
      </div>
    </footer>
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
  }

  body::after {
    content: '';
    display: block;
    height: 100px;
  }

  .body-content{
    margin-top: 100px;
  }

  footer {

    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
  }
</style>
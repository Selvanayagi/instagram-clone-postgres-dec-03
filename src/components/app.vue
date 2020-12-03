<template>
  <div class="app">
    <div class="nav-edit">
      <div class="row" style="margin-top: 7px;margin-bottom: 5px;">
        <div class="col-sm-4">
          <img :src="require('./images/instagram-name.png')" class="img-insta" />
        </div>
        <div class="col-sm-4">
          <!-- <input type="text" placeholder="&#xF002;Search" class="search-bar" /> -->
          <center>
            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control search-bar" placeholder="Search">
            </div>
          </center>
           
        </div>
        <div class="col-sm-4" style="margin-left: -3%;margin-top: 0.5%;" v-bind:key="pro">
          <router-link to="/upload">
            <img :src="require('./images/home-icon.png')" class="icon-side" />
          </router-link>
          <img :src="require('./images/save.png')" class="icon-side" />
          <img :src="require('./images/discover.png')" class="icon-side" />
          <img :src="require('./images/activity.png')" class="icon-side" />
          <router-link to="/profile">
            <img :src="`${pro}`" class="user-profile-img" />
          </router-link>
          <router-link to="/movieapp">
            <img :src="require('./images/movie.png')" style="width: 7%;border-radius: 16px;" class="icon-side" />
          </router-link>
        </div>
      </div>
    </div>
    <Search :search="state.search" @search="handleSearch" />
    <div class="movies">
      <Movie v-for="movie in state.movies" :movie="movie" :key="movie.imdbID" />
    </div>
    <div class="favourites">
      <img :src="require('./images/fav.jpeg')" style="width: 4%;" />Favourites
      <br>
      <center>
        <table id="post" cellspacing="5">
          <tr v-bind:key="ipx" v-for="(row,ipx) in rows">
            <td class="size">
              <clazy-load :src="`${row.id}`">
                <img :src="`${row.id}`" class="size">
                <div class="preloader" slot="placeholder">
                  <center>
                    <img src="data:image/png;base64,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" alt="" style="width: 41%;" >
                  </center>
                </div>
              </clazy-load>
              <div class="remove-btn">
                  <button class="remove-btn-btn" @click="remove(`${row.id}`)">
                      Remove
                  </button>
              </div>
            </td>
            <td class="size">
              <clazy-load :src="`${row.name}`">
                <img :src="`${row.name}`" class="size">
                <div class="preloader" slot="placeholder">
                  <center>
                      <img src="data:image/png;base64,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" alt="" style="width: 41%;">
                  </center>
                </div>
              </clazy-load>
              <div class="remove-btn" v-show="vshow">
                  <button class="remove-btn-btn" @click="remove(`${row.name}`)">
                      Remove
                  </button>
              </div>
            </td>
            <td class="size">
              <clazy-load :src="`${row.phone}`">
                <img :src="`${row.phone}`" class="size">
                <div class="preloader" slot="placeholder">
                  <center>
                    <img src="data:image/png;base64,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" alt="" style="width: 41%;">
                  </center>
                </div>
              </clazy-load>
              <div class="remove-btn" v-show="vshow1">
                  <button class="remove-btn-btn" @click="remove(`${row.phone}`)">
                      Remove
                  </button>
              </div>
            </td>
          </tr>
        </table>
      </center>
    </div>
    <div class="footer">
      <p>
        <a href="">ABOUT</a>
        <a href="">HELP</a>
        <a href="">PRESS</a>
        <a href="">API</a>
        <a href="">JOBS</a>
        <a href="">PRIVACY</a>
        <a href="">TERMS</a>
        <a href="">LOCATIONS</a>
        <a href="">HASHTAGS</a>
        <a href="">TOP ACCOUNTS</a>
        <a href="">LANGUAGE</a>
        <a href="" class="disabled">&#169;2020 INSTAGRAM FROM FACEBOOK</a>
      </p>
    </div>
  </div>
</template>

<script>
  //   import Header from './Header.vue';
  import Search from './Search.vue';
  import Movie from './Movie.vue';
  import {
    useMovieApi
  } from '../Hooks/movie-api.js';

  export default {
    name: 'app',
    components: {
      Search,
      Movie
    },
    setup() {
      const state = useMovieApi();

      return {
        movies:[],
        profile_path: [],
        pro: "",
        state,
        rows: [],
        title: [],
        vshow:false,
        vshow1:false,
        handleSearch(searchTerm) {
          state.loading = true;
          state.search = searchTerm;
        }
      };
    },
    mounted() {
      let email = sessionStorage.getItem('email');
      fetch("https://instagram-db-struct.herokuapp.com/api/user/getuser/"+email)
      .then(response=>response.json())
      .then(data=>{
          this.pro=data.profile
          this.profile_path = data.profile
      })
      fetch("https://instagram-db-struct.herokuapp.com/api/user/getmovie/"+email)
      .then(response=>response.json())
      .then(data=>{
        this.movies=data;
          // this.pro=data.profile
          // this.profile_path = data.profile
          let i = 1;
          let k = [];
          let kt = [];
          var s;
          var m;
          var st;
          var mt;
          data.forEach(f=>{
           if (i == 1) {
              s = f.poster
              st = f.title
              k = []
              kt = []
              k = {
                id: s
              }
              kt = {
                id: st
              }
            } else if (i == 2) {
              this.vshow=true
              m = f.poster
              mt = f.title
              k = []
              kt = []
              k = {
                id: s,
                name: m
              }
              kt = {
                id: st,
                name: mt
              }

            } else if (i == 3) {
              this.vshow1=true
              k = []
              kt = []
              k = {
                id: s,
                name: m,
                phone: f.poster
              }
              kt = {
                id: st,
                name: mt,
                phone: f.title
              }

            }
            i++;
            // console.log(i)
            // console.log(s)
            if (i == 4) {
              s = ""
              m = ""
              st = ""
              mt = ""
              i = 1;
              this.rows.push(k)
              this.title.push(kt)
              console.log(this.rows)
              k = []
              kt = []
            }
          });
          if (i > 1) {
            // i--;
            if (i == 2) {
              // m="https://i.pinimg.com/originals/aa/bf/c8/aabfc8cd95f0350be64a0f300ecb111e.jpg"
              this.vshow=false
              this.vshow1=false
              k = []
              kt = []
              k = {
                id: s,
                name: "https://convertingcolors.com/plain-FAFAFA.svg",
                phone: "https://convertingcolors.com/plain-FAFAFA.svg"
              }
              kt = {
                id: st,
                name: "",
                phone: ""
              }

            } else if (i == 3) {
              this.vshow1=false
              k = []
              kt = []
              k = {
                id: s,
                name: m,
                phone: "https://convertingcolors.com/plain-FAFAFA.svg"
              }
              kt = {
                id: st,
                name: mt,
                phone: ""
              }

            }
            this.rows.push(k)
            this.title.push(kt)
          }

      })
    },
    methods: {
      remove(title){
        this.isFavorite=false
        let t;
        let email = sessionStorage.getItem('email');
        this.movies.forEach(m=>{
          if(m.poster==title){
            t=m.title
          }
        })
        var movie = {
          moboremail:email,
          title: t
        }
      fetch("https://instagram-db-struct.herokuapp.com/api/user/removemovie/", {   
          method: "POST", 
          body: JSON.stringify(
              movie
          ),  
          headers: { 
              "Content-type": "application/json; charset=UTF-8"
          } 
      })
      .then(response => response.json()) 
      .then(json => console.log(json));
      }
    }
  }
</script>

<style>
  .app {
    text-align: center;
    overflow-x: hidden;
  }

  .header {
    background-color: #282c34;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    padding: 20px;
    cursor: pointer;
  }

  .spinner {
    height: 80px;
    margin: auto;
  }

  .intro {
    font-size: large;
  }

  /* new css for movie component */

  * {
    box-sizing: border-box;
  }

  .movies {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .header h2 {
    margin: 0;
  }

  .add-movies {
    text-align: center;
  }

  .add-movies button {
    font-size: 16px;
    padding: 8px;
    margin: 0 10px 30px 10px;
  }

  .movie {
    padding: 5px 25px 10px 25px;
    max-width: 25%;
  }

  .errorMessage {
    margin: auto;
    font-weight: bold;
    color: rgb(161, 15, 15);
  }


  .search {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }


  input[type="submit"] {
    padding: 5px;
    background-color: transparent;
    color: black;
    border: 1px solid black;
    width: 80px;
    margin-left: 5px;
    cursor: pointer;
  }


  /* input[type="submit"]:hover {
    background-color: #282c34;
    color: antiquewhite;
  } */


  .search>input[type="text"] {
    width: 40%;
    min-width: 170px;
    border-radius: 4px;
    border: 1px solid;
  }

  @media screen and (min-width: 694px) and (max-width: 915px) {
    .movie {
      max-width: 33%;
    }
  }

  @media screen and (min-width: 652px) and (max-width: 693px) {
    .movie {
      max-width: 50%;
    }
  }


  @media screen and (max-width: 651px) {
    .movie {
      max-width: 100%;
      margin: auto;
    }
  }

  .footer {
    margin-top: 6em;
    margin-left: 8em;
    font-size: 12px;
  }

  .footer a {
    color: #385185;
    margin-right: 1em;
    font-weight: 600;
  }

  a.disabled {
    pointer-events: none;
    cursor: default;
    margin-left: 20em;
  }

  .changepoto {
    overflow-x: hidden;
  }

  .nav-edit {
    background-color: white;
    border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
  }

  .search-bar {
    text-align: center;
    background-color: rgba(var(--b3f, 250, 250, 250), 1);
    border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    border-radius: 2px;
    font-family: 'Helvetica', FontAwesome, sans-serif;
    width: 53%;
    font-size: 12px;
    height: 74%;
    margin-top: 1%;
  }

  .icon-side {
    width: 6%;
    margin-right: 3%;
  }

  .img-insta {
    width: 27%;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  .size {
    height: 300px;
    width: 300px;
  }

  .mov-tit {
    text-align: center;
    font-size: 16px;
    margin-top: 6%;
    color: black;
  }

  .main {
      width: 50%;
      margin: 50px auto;
  }

  .has-search .form-control {
      padding-left: 2.375rem;
  }

  .has-search .form-control-feedback {
      position: absolute;
      z-index: 2;
      display: block;
      width: 2.375rem;
      height: 2.375rem;
      line-height: 1.7em;
      text-align: center;
      pointer-events: none;
      color: #aaa;
      margin-left: 38%;
  }
  .form-control:focus {
      background-color: rgba(var(--b3f, 250, 250, 250), 1);
      border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
      outline: none;
      box-shadow: none;
  }
      .remove-btn-btn {
    border: 1px solid transparent;
    background-color: rgba(var(--d69,0,149,246),1);
    color: #fff;
    border-radius: 6px;
    width: 31%;
    margin-bottom: 2%;
    font-size: 20px;
    margin-top: 2%;
}
.remove-btn{
  text-align: center;
}
.user-profile-img{
      width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 3%;
  }
   @media only screen and (max-width: 980px){
    .size {
      height: 100px;
      width: 100px;
    }
    .remove-btn-btn{
      width: 56%;
      font-size: 9px;
    }
   }
   
</style>
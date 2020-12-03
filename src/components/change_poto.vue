<template>
    <div class="changepoto">
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
                        <img :src="`${pro}`" class="user-profile-img"/>
                    </router-link>
                    &nbsp;&nbsp;
                    <router-link to="/movieapp">
                        <img  :src="require('./images/movie.png')" style="width: 7%;border-radius: 16px;" class="icon-side"/>
                    </router-link>
                </div>
            </div>
        </div>
        <center>
            <div class="change" v-bind:key="1">
                <img :src="`${profile_path}`" class="icon-side-profile" />
                <br>
                <input type="text" v-model="url" placeholder="url.." class="changeurl">
                <button type="submit" @click="changepoto" class="changebtn">
                    Change
                </button><br><br>
                <button type="submit" class="changebtn" @click="remove">
                    Remove
                </button>
                <br><br>
            </div>
        </center>

        

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
    export default {
        name: 'edit',
        props: {
            msg: String
        },
        data() {

            return {
                showModal: false,
                profile_path: [],
                pro:"",
                url:""
            }
        },
        mounted() {
            let email = sessionStorage.getItem('email');
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getuser/"+email)
            .then(response => response.json())
            .then(dataans => {
                this.profile_path = dataans.profile
                this.pro=dataans.profile
            });
        },
        methods: {
            changepoto() {
                if(!this.url)
                    alert("provide an url");
                else{
                    let email = sessionStorage.getItem('email');
                    let newpoto={
                        url:this.url
                    }
                    fetch("https://instagram-db-struct.herokuapp.com/api/user/changepoto/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        newpoto
                    ),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }) 
                .then(response => response.json()) 
                .then(json => console.log(json));
                }
            },
            remove() {
                let email = sessionStorage.getItem('email');
                let newpoto={
                    url:"https://www.iconfinder.com/data/icons/images-image-files-7/24/round_image_circle_picture_photo_photography-512.png"
                }
                 fetch("https://instagram-db-struct.herokuapp.com/api/user/changepoto/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        newpoto
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

<style scoped>
    .changebtn {
        width: 17%;
        font-size: 16px;
        background-color: #87CEEB;
        border: 1px solid #87CEEB;
        border-radius: 4px;
    }

    .changeurl {
        background-color: rgba(var(--b3f, 250, 250, 250), 1);
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
        border-radius: 2px;
        margin-right: 5%;
    }

    .change {
        background: white;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
        margin-top: 4%;
        width: 56%;
    }

    .icon-side-profile {
        margin-top: 4%;
        margin-bottom: 4%;
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
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
  .user-profile-img{
      width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 3%;
  }
</style>
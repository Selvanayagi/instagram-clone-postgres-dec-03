<template>
    <div class="edit-post">
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
                        <!-- <img :src="require('./images/profile-icon.png')" class="icon-side" /> -->
                        <img :src="`${pro}`" style="width: 7%;border-radius: 16px;" class="icon-side"/>

                    </router-link>
                     <router-link to="/movieapp">
                    <img  :src="require('./images/movie.png')" style="width: 7%;border-radius: 16px;" class="icon-side"/>
                    </router-link>
                </div>
            </div>
        </div>
        <br/>
        <br/>
          <center>
            <div v-bind:key="cat" v-for="(cat) in catsrows">
                <h5 class="username-post">
                    <img :src="`${cat.profile}`" style="width: 3%;border-radius: 16px;"/>
                    {{cat.name}}
                </h5>
                <p class="post-p">
                    <span>
                        <clazy-load :src="`${cat.path}`">
                            <img :src="`${cat.path}`" class="post-img">
                            <div class="preloader" slot="placeholder">
                            <center>
                                <img src="data:image/png;base64,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" alt="" style="width: 41%;">
                            </center>
                            </div>
                        </clazy-load>
                        <!-- <br /> -->
                        <div class="like-btn">
                            <img :src="require('./images/like-image-color.png')" style="width:6%;">
                            {{cat.likes}}&nbsp;&nbsp;likes
                        </div>
                        <div class="comment">
                            {{cat.comment}}
                        </div>
                        <div class="remove-btn">
                            <button class="remove-btn-btn" @click="removeimage(`${cat.path}`)">
                                Remove
                            </button>
                        </div>
                    </span>
                </p>
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
    name: 'edit-post',
        props: {
            msg: String
        },
        data() {
            return {
               catsrows: [],
               movies :[],
               pro:""
            }
        },
        mounted() {
            this.cats = []
            this.comment = []
            this.posts = []
            let email = sessionStorage.getItem('email');
            let users = JSON.parse(localStorage.getItem("instausers"));
            console.log(email)
            users.forEach(user => {
                if ((user.moboremail == email) || (user.uname == email) || (user.email == email)) {
                    this.pro=user.profile
                    this.cat = user.fname;
                    this.comment = user.uname;
                    this.posts = user.posts;
                    user.posts.forEach(post => {
                        var sam = {
                             profile:user.profile,
                            name: user.uname,
                            path: post.path,
                            comment: post.comment,
                            likes:post.likes
                        }
                        this.catsrows.push(sam);
                    })
                }
            })
        },
        methods:{
            removeimage(img){
                let email = sessionStorage.getItem('email');
                let users = JSON.parse(localStorage.getItem("instausers"));
                this.movies=[]
                users.forEach(user => {
                    if ((user.moboremail == email) || (user.uname == email) || (user.email == email)) {
                    user.posts.forEach(f => {
                        if(img!=f.path){
                        this.movies.push(f)
                        }
                    })
                    alert("successfully deleted posts")
                    this.saveimage()
                    }
                })
            },
            saveimage() {
                let email = sessionStorage.getItem('email');
                let users = JSON.parse(localStorage.getItem("instausers"));
                let newusers = [];
                users.forEach(user => {
                    if ((user.moboremail == email) || (user.uname == email) || (user.email == email)) {
                        let cuser = {
                            moboremail: user.moboremail,
                            fname: user.fname,
                            uname: user.uname,
                            pass: user.pass,
                            phone: user.phone,
                            email: user.email,
                            website: user.website,
                            bio: user.bio,
                            gender: user.gender,
                            profile: user.profile,
                            posts: this.movies,
                            fav:user.fav
                        }
                        newusers.push(cuser);
                    } else {
                        newusers.push(user);
                    }
                    })
                console.log(newusers)
                localStorage.setItem("instausers", JSON.stringify(newusers));
                window.location.reload()
            }
        }
}
</script>

<style scoped>
     .icon-side-profile {
        width: 10%;
        margin-top: 4%;
        margin-bottom: 4%;
        border-radius: 38px;
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
     .post-img {
        width: 600px;
        height: 600px;
        object-fit: cover;
        margin-left: -1px;
    }
    .post-p {
        background-color: white;
        width: 44.5%;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    }
    .comment {
        text-align: initial;
        margin-left: 2%;
        line-height: 2em;
    }
    .edit-post {
        background-color: rgba(var(--b3f, 250, 250, 250), 1) !important;
        overflow-x: hidden;
    }
    .username-post {
        text-align: left;
        margin-left: 19em;
    }
     .like-btn{
        text-align: left;
        margin-left:1%;
    }
    .remove-btn-btn {
    border: 1px solid transparent;
    background-color: rgba(var(--d69,0,149,246),1);
    color: #fff;
    border-radius: 6px;
    width: 24%;
    margin-bottom: 2%;
    font-size: 20px;
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
</style>
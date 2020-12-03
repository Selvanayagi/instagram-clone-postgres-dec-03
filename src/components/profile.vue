/* eslint-disable vue/no-deprecated-slot-attribute */
<template>
    <div class="profile">
        <div class="nav-upload">
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
                <div class="col-sm-4 icon-arrange"  v-bind:key="pro">
                    <!-- <img :src="require('./images/home-icon.png')" class="icon-side" /> -->
                    <router-link to="/upload">
                        <img :src="require('./images/home-icon.png')" class="icon-side" />
                    </router-link>
                    <img :src="require('./images/save.png')" class="icon-side" />
                    <img :src="require('./images/discover.png')" class="icon-side" />
                    <img :src="require('./images/activity.png')" class="icon-side" />
                    <router-link to="/profile">
                        <!-- <img :src="require('./images/profile-icon.png')" class="icon-side" /> -->
                        <img :src="`${pro}`" class="user-profile-img"/>
                    </router-link>
                    &nbsp;&nbsp;
                    <router-link to="/movieapp">
                    <img  :src="require('./images/movie.png')" style="width: 7%;border-radius: 16px;" class="icon-side"/>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="profile-display">
            <div class="row">
                <div class="col-sm-4 profile-icon">
                    <!-- <img :src="require('./images/profile-icon.png')" style="width: 42%"/> -->
                    <img :src="`${pro}`" class="pro-img-icon" />
                </div>
                <div class="col-sm-4">
                    <div>
                        <div class="uname">
                            {{uname}}
                            <button type="button" class="edit-btn">
                                <router-link to="/edit">
                                    Edit Profile
                                </router-link>
                            </button>&nbsp;&nbsp;
                            <router-link to="/home">
                                <img :src="require('./images/settings.jpeg')" style="width:9%" />
                            </router-link>
                        </div>
                        <br />
                        <br />

                        <div class="fname">
                            {{fname}}
                        </div>
                    </div>
                </div>
                <div class="col-sm-4"></div>
            </div>

        </div>
        <center> <hr class="line"> </center>
    <div v-if="showModal">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Upload New Images</h4>
                                <button type="button" class="close" @click="showModal=false">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="upload-form modal-body">
                                <!-- <center> -->
                                    <!-- <input type="text" v-model="url_image" placeholder="image url..." class="upload-input"><br /><br /> -->
                                   <table>
                                       <center>
                                    <tr v-bind:key="index" v-for="(url, index) in urls">
                                        <td><input type="text" v-model="url.title" placeholder="image url..." class="upload-input url-input"></td>
                                        <!-- <button class="removeimage" @click="removerow(index)">remove images</button> -->
                                        <img :src="require('./images/remove-btn.png')" class="removeimage" @click="removerow(index)"/>
                                        <br><br>
                                    </tr>
                                    </center>
                                    </table>
                                    <br>
                                    <button class="add-image" @click="addRow">Add images</button>
                                    <br>
                                    <br>
                                    <textarea rows="5" placeholder="comments...." class="upload-input"
                                        v-model="comment_image"></textarea>
                                    <br><br>
                                    <button @click="addimage" class="upload-btn">Upload</button>
                                <!-- </center> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

        <button id="show-modal" @click="showModal = true;" class="new-post">Upload</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="tabs">
            <a v-on:click="activetab='1'" v-bind:class="[ activetab === '1' ? 'active' : '' ]">
                <img :src="require('./images/grid.png')" style="width: 50px; height:50px;" />
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a v-on:click="activetab='2'" v-bind:class="[ activetab === '2' ? 'active' : '' ]">
                <img :src="require('./images/list.jpeg')" style="width: 39px;height:39px;" />
            </a>
        </div>

        <div class="content">
            <div v-if="activetab ==='1'" class="tabcontent">
                <center>
                    <table id="post" cellspacing="0">
                        <tr v-bind:key="idx" v-for="(rowt,idx) in rows">
                            <td class="size">
                                <!-- <img :src="`${row.id}`" class="size" /> -->
                                 <clazy-load :src="`${rowt.id}`">
                                    <img :src="`${rowt.id}`" class="size" v-on:click="activetab='2'">
                                    <div class="preloader" slot="placeholder">
                                    <center>
                                        <img src="data:image/png;base64,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" alt="" style="width: 41%;">
                                    </center>
                                    </div>
                                </clazy-load>
                                 <div class="remove-btn">
                                    <button class="remove-btn-btn" @click="removeimgrow(`${rowt.id}`)">
                                        Remove
                                    </button>
                                </div>
                            </td>
                            <td class="size">
                                <!-- <img :src="`${rowt.name}`" class="size" /> -->
                                 <clazy-load :src="`${rowt.name}`">
                                    <img :src="`${rowt.name}`" class="size" v-on:click="activetab='2'">
                                    <div class="preloader" slot="placeholder">
                                    <center>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQcAAADACAMAAAA+71YtAAAAkFBMVEX///8AAAD6+vrz8/P8/Pz39/fu7u7k5OTo6Ojt7e3Y2Ni5ubnx8fEQEBDi4uLc3NzU1NTJyclGRkaYmJhSUlITExMpKSmKioqioqKCgoIICAjExMSrq6siIiJ4eHgcHBxlZWW8vLw7OzsxMTFtbW0nJydISEhaWlqVlZVycnJmZmawsLA9PT1OTk5XV1d9fX1ufdFrAAAFcklEQVR4nO3c2XaiSgCFYUBUFBSIEwooKI44vP/bnRqNSSfdETiyiuzvqm9kVf5UFTKkNQ0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAWWn8+OyXjerXsgNermyUqX/LpHUxN3tKY//oLSF+RfRt0jqoFpj2UDQdfDugf1cu0gJhEGgw8Z9LzuYb1atKURBp87/LL54O30xWTwRQez7pG9UntOKkxEh8G9AVkm/bqH9kruWZ8wsgNrEJ+TQ6/uob1SPlhMJvcQNMJqmXtO+1ctCU2b6ZPV6t5B19+CYd1DqoG51FcUz6DrS6/uEdUj4xlYB12fW3WPpyYnkYGEGOjJr72smt8zrPSVXfdoajPS4zgWGa5kSTx5hjDNZpxSUpqBh9Bnz3/cNJsRohsLJEP09KdN4X8Y2IvtV7KDXmBrEBkM5UMECzkfimcwiOpH9lLWZEuwDEGBj98zqD4hstWWh1jcCn1eZjDUvg7xJ1OChFiNCx6BZ2gTlQ7sxfbxlIWIV0WvqkxRoa3yhODTgRgU2Rw4UUHpCZFseYb4WvyXacoMLWUnxHCyIUiHSZkHNXJCtJSdELN4w0LESanDsAiUohOivd5wk3J3XXgEQtEJ4fPpsJleyx3HFBmcVjXjerXZlHcofcuBTwjHcZRcGMZOLIu1U/ZILILjdJRcGMOtWBbL0odyuI6SC8Pertd0p4zL34kj06HDVDCsl5tt1sy0/N3pNovQ6/RUvPze8w6bt/KHMkgCRsUNQkyHTfntQdN6goIbRC8WHZ6/KfnFwYSyZ54auNsztZ5W8Y5Hx+IUfDLuT1mH87SKlxsc0UHBB4LhhnfYVjF2hTvYosO0ir2t1YAOVZzzZQcFHxHbmzemmg5doYJjvVi65h02VZzrHHU7hLJDFWPvDAk1O3i8w25dxStA1pBTsMNws2PWVXyPkh0UPF+0RYdz8UcX74bqdtAuJMLlctlVcJ1luK5LM7gq3oA40gpE0SebD1quoOD1pha88Q5v5V8YtWQHFe/DhGfRofwfVwxFBiVfwe2RdTEmLqU3CKPf5x0UPG0SGctAlN3lrT7lun0Vt0myQex4hl3ZhdGXVNweNM2lHa7X6zgp9xyq5Xk8g1vRwF4toxWIS7mvlK7nsRKegnflmPxCK+z316zMUVqepOTjTaJ1IRGocZkJ0ZcZlDxrMqMx77A/Ff8i2PNlBxUf4nBd2eFa+GLL9GQHVXdJ6sAXRpJci96F6PsE66DitYVkiQxJcip2e87yJZWng6ZFV1aBmBXZ7Z17Bl/d3YEyMtHhtB89/+m2H8oMal5avPN4h9PptH/6ga/hh6EIoex3h7tgzyqcTlnyZIg2zSBCqLxJCkuWISOS4JnfaitMQxEiVH1VUNYp4Rmy7HT4+e/VSkWG0A+b8f8BeHuR4XjMbj/9kfp2msoSvvKbA2VqfiIyEFn+kxNgJ2QZ0gZloNJEZFgul8f5P1++b3u5bd9DKP7N4QMS4ig6EIe/Lg7Ds3PagYdIwwZl0DT/lMkMt9ttOfv2RNjx84hn4CF8Ne/Ffat/zO4ZbvP5bR54f9x1NSwvj0iFXIRIU7s5e4NkzVkInoGZHXJ/yF8NNVs917ejIIhEBzEjmnHC/CTKHjvMHhwOh9EoYBWihwmRqvhY9we8+XH5KcOBJWARAhlCTIi8SSeKjwybhnjocPiqg5gQDZ0MXCe6LT9Nh8cOckJEttq3XX7AiuiM+GsHUqFhZ8svtcLZ7fO6eF8YQZR2G3ey/I5lj2Zz2eHwOB/SfmN3x685XhocPpwyItvr/ob18CezZbmeR2+7ud3O70wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATfUf1+at7T6X+SEAAAAASUVORK5CYII=" alt="" style="width: 41%;">
                                    </center>
                                    </div>
                                </clazy-load>
                                <div class="remove-btn" v-show="vshow">
                                    <button class="remove-btn-btn" @click="removeimgrow(`${rowt.name}`)">
                                        Remove
                                    </button>
                                </div>
                            </td>
                            <td class="size">
                                <!-- <img :src="`${rowt.phone}`" class="size" /> -->
                                 <clazy-load :src="`${rowt.phone}`">
                                    <img :src="`${rowt.phone}`" class="size" v-on:click="activetab='2'">
                                    <div class="preloader" slot="placeholder">
                                    <center>
                                        <img src="data:image/png;base64,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" alt="" style="width: 41%;">
                                    </center>
                                    </div>
                                </clazy-load>
                                <div class="remove-btn" v-show="vshow1">
                                    <button class="remove-btn-btn" @click="removeimgrow(`${rowt.phone}`)">
                                        Remove
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </center>
            </div>
            <div v-if="activetab ==='2'" class="tabcontent">
                <center>
                    <div v-bind:key="ikd" v-for="(catl,ikd) in catsrows">
                        <div class="post-p" :id="`${catl.id}`">
                            <div class="username-post">
                            <img :src="`${catl.profile}`" style="margin-left: 2%;margin-right: 0%;" class="user-profile-img"/>
                            {{catl.name}}
                            <div v-if="showDots">
                                <transition name="modal">
                                    <div class="modal-mask">
                                        <div class="modal-wrapper">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <button type="button" class="close" @click="closedot(`${iddot}`)">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <button @click="removeimage(`${iddot}`)" class="edit-btn-modal">Delete</button>
                                                    <button @click="edit(`${iddot}`)" class="edit-btn-modal">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                            <img :src="require('./images/threedots.svg')" alt="" id="show-modal" @click="showdot(`${catl.id}`)" class="three-dots">
                            </div>
                            <span>
                                <div v-if="catl.path.length==1">
                                    <clazy-load :src="`${catl.path[0]}`">
                                        <img :src="`${catl.path[0]}`" class="post-img list-load">
                                        <div class="preloader" slot="placeholder">
                                        <center>
                                            <img src="data:image/png;base64,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" alt="" style="width: 41%;">
                                        </center>
                                        </div>
                                    </clazy-load>
                                </div>
                                <div v-if="catl.path.length>1">
                                     <div class="slides">
                                        <transition-group name="slide" mode="out-in" enter-class="slide-in" leave-class="slide-out" enter-active-class="animated slide-in-active" leave-active-class="animated slide-out-active">
                                        <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                                        <div :key="index"
                                            v-for="index in catl.slides">
                                        <div v-if="index == active">
                                            <img :src="`${catl.path[index-1]}`" alt="" class="post-img">
                                        </div>
                                           
                                        </div>
                                        </transition-group>
                                    </div>
                                    <ul class="dots">
                                        <li v-bind:key="index" v-for="(dot, index) in catl.slides" :class="{ active: ++index === active }" @click="jump(index)"></li>
                                    </ul>
                                </div>
                                <!-- <br> -->
                                <div class="like-btn">
                                    <img :src="require('./images/like-image-color.png')" style="width:6%;">
                                    {{catl.likes}}&nbsp;&nbsp;likes
                                </div>
                                <div class="comment">
                                    {{catl.comment}}
                                    <br>
                                    {{catl.date}}
                                </div>
                                <div class="comment" v-if="iddot==catl.id" >
                                    <input type="text" v-model="editcom" class="comment-edit" id='comedit'>
                                    <button @click="savedit(`${catl.id}`)" class="save-edit">Save</button>
                                </div>
                            </span>
                        </div>
                        <br>
                        <br>
                    </div>
                </center>
            </div>
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
    // import { Carousel, Slide} from 'vue-carousel';
    import Vue from 'vue';
    export default {
        name: 'Home',
        props: {
            msg: String
        },
        data() {
            return {
                idm:"",
                active: 1,  
                editcom:"",
                iddot:"",
                timestamp:"",
                showModal: false,
                showDots: false,
                activetab: '1',
                activeimage:'1',
                show: true,
                cats: [],
                comment: [],
                posts: [],
                profile_path: [],
                rows: [],
                catsrows: [],
                pro:"",
                len:0,
                uname:"",
                fname:"",
                com:true,
                urls:[],
                i:1,
                vshow:false,
                vshow1:false,
                po:"",
                profile:"",
                postdetails:"",
                postpaths:"",
                postucoms:""
            }
        },
        created() {
            setInterval(this.getNow, 1000);
        },
        mounted() {
            Vue.prototype.$active=1
            document.createElement('tr');
            this.urls.push({
                id:this.i,
                title: "",
            });
            this.i=this.i+1;
            this.cats = []
            this.comment = []
            this.posts = []
            // let pa=[]
            let email = sessionStorage.getItem('email');
            console.log(email)
            this.slides=0
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getuser/"+email)
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                this.profile=data.profile
                this.uname=data.uname
                this.fname=data.fname
                this.pro=data.profile
                this.profile_path=data.profile
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getposts/"+email)
            .then(response=>response.json())
            .then(posts=>{
                this.postdetails=posts;
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/get/"+email)
            .then(response=>response.json())
            .then(paths=>{
                this.postpaths=paths;
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getucom/"+email)
            .then(response=>response.json())
            .then(ucoms=>{
                this.postucoms=ucoms;
                this.init();
            })
        },
      
        methods: {
            init(){
                // console.log(this.postdetails);
                // console.log(this.postpaths);
                console.log(this.postucoms);
                let pa=[]
                this.postdetails.forEach(p=>{
                    this.slides=0;
                    this.postpaths.forEach(po=>{
                        if(po.postid==p.postid){
                            pa.push(po.url)
                            this.slides=this.slides+1;
                        }
                    })
                    //list view
                    let l;
                    if(p.likes==null){
                        l=0
                    }
                    else{
                        l=p.likes;
                    }
                    var sam = {
                        profile:this.profile,
                        name: this.uname,
                        path: pa,
                        comment: p.comments,
                        likes:l,
                        id:p.postid,
                        slides:this.slides,
                        ucom:p.ucom,
                        date:p.date
                        }
                    this.catsrows.push(sam);
                    pa=[]
                    this.len=parseInt(p.postid);
                    console.log(this.catsrows)
                })
                //grid view
                let i = 1;
                let k = [];
                var s;
                var m;
                this.postdetails.forEach(p=>{
                    pa=[]
                    this.postpaths.forEach(po=>{
                        if(po.postid==p.postid){
                            pa=po.url
                        }
                    })
                        if (i == 1) {
                            s = pa
                            k = []
                            k = {
                                id: s
                            }
                        } else if (i == 2) {
                            this.vshow=true
                            m = pa
                            k = []
                            k = {
                                id: s,
                                name: m
                            }

                        } else if (i == 3) {
                            this.vshow1=true
                            k = []
                            k = {
                                id: s,
                                name: m,
                                phone: pa
                            }
                        }
                        i++;
                        if (i == 4) {
                            s = ""
                            m = ""
                            i = 1;
                            this.rows.push(k)
                            console.log(this.rows)
                            k = []
                        }
                })
                if (i > 1) {
                        // i--;
                    if (i == 2) {
                        this.vshow=false
                        this.vshow1=false
                        // m="https://i.pinimg.com/originals/aa/bf/c8/aabfc8cd95f0350be64a0f300ecb111e.jpg"
                        k = []
                        k = {
                            id: s,
                            name: "https://convertingcolors.com/plain-FAFAFA.svg",
                            phone: "https://convertingcolors.com/plain-FAFAFA.svg"
                        }

                    } else if (i == 3) {
                        this.vshow1=false
                        k = []
                        k = {
                            id: s,
                            name: m,
                            phone: "https://convertingcolors.com/plain-FAFAFA.svg"
                        }

                    }
                    this.rows.push(k)
                }
                console.log(this.rows)
            },
            msgm(id){
                this.idm=id
            },
            jump(index) {
                this.active = index
            },
            addRow: function() {
                document.createElement('tr');
                this.urls.push({
                    id:this.i.toString(),
                    title: "",
                });
                this.i=this.i+1;
            },
            removerow(index){
                this.urls.splice(index, 1)
            },
            getNow: function() {
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const dateTime = date +' '+ time;
                this.timestamp = dateTime;
            },
            savedit(id){
                console.log(id)
                let email = sessionStorage.getItem('email');
                let post={
                    moboremail:email,
                    id:id,
                    comment:this.editcom
                }
                fetch("https://instagram-db-struct.herokuapp.com/api/user/savecomments/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        post
                    ),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }) 
                .then(response => response.json()) 
                .then(json => console.log(json));
            },
            edit(id){
                this.postdetails.forEach(p=>{
                    if(id==p.postid){
                        this.editcom=p.comments
                    }
                })
                console.log(id)
                this.com=false
                this.showDots = false
                const element = document.getElementById('comedit');
                element.scrollIntoView({ behavior: 'smooth' });
            },
            showdot(id){
                this.iddot=id
                this.showDots = true
            },
            closedot(id){
                //  alert("id:",id)
                console.log(id)
                this.iddot=""
                this.showDots = false
            },
            addimage() {
                let email=sessionStorage.getItem('email')
                this.k=0
                this.urls.forEach(u=>{
                    if(u.title==""){
                        this.k=1;
                    }
                })
                if(this.k==1)
                    alert("provide image path");
                else{
                    this.len=this.len+1;
                    var post = {
                        moboremail:email,
                        id:this.len.toString(),
                        path: this.urls,
                        comment: this.comment_image,
                        likes:"0",
                        date:this.timestamp,
                        ucom:[]
                    }
                    console.log(post)
                    fetch("https://instagram-db-struct.herokuapp.com/api/user/savenewposts/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        post
                    ),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                    }) 
                    .then(response => response.json()) 
                    .then(json => console.log(json));
                    this.showModal=false
                    // window.location.reload()
                    // this.po.push(post)
                    // this.saveimage()
                }
            },
            removeimgrow(image){
                // let img=""
                let email = sessionStorage.getItem('email');
                // this.postdetails.forEach
                let postid;
                console.log(image);
                this.postpaths.forEach(p=>{
                    if(p.url==image){
                        postid=p.postid;
                    }
                })
                let post={
                    moboremail:email,
                    id:postid
                }
                fetch("https://instagram-db-struct.herokuapp.com/api/user/deleteimage/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        post
                    ),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }) 
                .then(response => response.json()) 
                .then(json => console.log(json));
            },
            removeimage(img){
                console.log(img)
                let email=sessionStorage.getItem('email')
                let post={
                    moboremail:email,
                    id:img
                }
                fetch("https://instagram-db-struct.herokuapp.com/api/user/deleteimage/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        post
                    ),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }) 
                .then(response => response.json()) 
                .then(json => console.log(json));
            },
            saveimage() {
                let email=sessionStorage.getItem('email');
                fetch("https://instagram-db-struct.herokuapp.com/like/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        this.po
                    ),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }) 
                .then(response => response.json()) 
                .then(json => console.log(json));
                this.showModal=false
                window.location.reload()
            }
        }
    }
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
    @import url("https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css");

    .size {
        height: 300px;
        width: 300px;
    }

    .line {
        width: 90%;
    }

    .img-insta {
        width: 27%;
    }

    .nav-upload {
        background-color: white;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    }

    .profile {
        background-color: rgba(var(--b3f, 250, 250, 250), 1) !important;
        overflow-x: hidden;
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

    .post-img {
        width: 600px;
        /* height: 600px; */
        object-fit: cover;
        margin-left: -1px;
        border-bottom: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    }

    .post-p {
        background-color: white;
        width: 600px;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    }

    .profile-display {
        margin-top: 4em;
    }

    .profile-icon {
        text-align: end;
    }

    .uname {
        text-align: left;
        margin-left: 3em;
        font-size: 25px;
        font-weight: 600;
        color: black;
    }

    .fname {
        text-align: left;
        margin-left: 3em;
        font-size: 25px;
        font-weight: 600;
        color: black;
    }

    .edit-btn a {
        color: black;
        text-decoration: none;
    }

    .edit-btn {
        margin-left: 1em;
        font-size: 18px;
        width: 35%;
        background-color: rgba(var(--b3f, 250, 250, 250), 1);
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
        border-radius: 2px;
        line-height: 23px;
    }

    .upload-input {
        width: 84%;
        border-radius: 2px;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    }

    .upload-btn {
        width: 28%;
        font-size: 15px;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
        background-color: rgba(var(--b3f,250,250,250),1);
        border-radius: 7px;
        line-height: 32px;
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

    input:focus,
    textarea:focus,
    select:focus,
    button:focus {
        outline: none;
    }

    .post-img {
        width: 600px;
        /* height: 600px; */
        object-fit: cover;
        margin-left: -1px;
    }
    .comment {
        text-align: initial;
        margin-left: 2%;
        line-height: 2em;
    }

    .list {
        background: none;
        border: none;
        width: 21%;
        margin-bottom: 2%;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
    .new-post {
        width: 16%;
        margin-bottom: 2%;
        border: 1px solid transparent;
        background-color: rgba(var(--d69,0,149,246),1);
        color: white;
        border-radius: 6px;
        font-size: 20px;
    }
    .remove-btn-btn{
        width: 24%;
        margin-bottom: 3%;
        border: 1px solid transparent;
        background-color: rgba(var(--d69,0,149,246),1);
        color: white;
        border-radius: 6px;
        font-size: 17px;
    }
    .remove-btn{
        text-align: left;
        margin-left: 2%;
    }
     .username-post {
        text-align: left;    
        line-height: 3em;
        border-bottom: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
        /* margin-left: 2%; */
    }
     .like-btn{
        text-align: left;
        margin-left:1%;
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
  .edit-btn-modal {
    border: none;
    background: white;
    margin-bottom: 5%;
}
.modal-header{
    border-bottom: none !important;
}
.three-dots {
    margin-left: 77%;
    cursor: pointer;
}
.comment-edit {
    border: none;
    border-bottom: 1px solid black;
    line-height: 2em;
    width: 95%;
}
.save-edit {
    line-height: 1.5em;
    width: 16%;
    margin-bottom: 2%;
    border: 1px solid transparent;
    background-color: rgba(var(--d69,0,149,246),1);
    color: white;
    border-radius: 6px;
    font-size: 20px;
}
.add-image {
    border: none;
    background: none;
    text-decoration: underline;
}

.next {
  right: 0;
  margin-left: auto;
  margin-right: 25px;
  text-indent: 2px;
}

.dots {
  /* position: fixed; */
  display: block;
  width: 100%;
  text-align: center;
  bottom: 20px;
}
.dots li {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: #221e21;
  opacity: 0.2;
  display: inline-block;
  margin: 0 3px;
  cursor: pointer;
  transition: opacity 0.4s ease-in-out, width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.dots li.active {
  width: 22px;
  opacity: 1;
}

.slides {
  font-size: 40px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
@media (min-width: 600px) {
  .slides {
    font-size: 80px;
  }
}
@media (min-width: 900px) {
  .slides {
    font-size: 140px;
  }
}
.slides .animated {
  transition: all 400ms;
  position: absolute;
  transform: translate(-50%, -50%);
}
.slides .slide-in {
  opacity: 0;
  transform: translate(-40%, -50%);
}
.slides .slide-in-active {
  transition-delay: 150ms;
}
.slides .slide-out {
  opacity: 1;
}
.slides .slide-out-active {
  opacity: 0;
  transform: translate(-60%, -50%);
}
  .user-profile-img{
      width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 3%;
  }
  .pro-img-icon{
      width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }
  .icon-arrange{
      margin-left: -3%;
      margin-top: 0.5%;
  }
  .url-input{
      width: 192%;margin-left: 19%;
  }
  .removeimage {
      width: 19%;
      margin-left: 88%;
      cursor: pointer;
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
    /* responsive pages */
    @media only screen and (max-width: 980px){
        .remove-btn-btn{
      width: 56%;
      font-size: 9px;
    }
        .url-input{
            width: 129%;
        }
         .icon-arrange{
            margin-left: unset;
        }
        .profile-icon{
            text-align: unset;
        }
        .new-post{
            width: 34%;
        }
        .size {
            height: 100px;
            width: 100px;
        }
        .three-dots {
            margin-left: 44%;
        }
        .dots{
            text-align: left;
            margin-left: 27%;
        }
        .list-load {
            margin-left: -37%;
        }
        .post-img{
            width: 375px;
            /* height: 375px; */
        }
        .slides{
            justify-content: unset;
        }
        .footer{
            display: none;
        }
        
    }
   
</style>
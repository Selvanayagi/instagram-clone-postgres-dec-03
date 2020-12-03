<template>
    <div class="upload">
        <div class="nav-upload">
            <div class="row" style="margin-top: 7px;margin-bottom: 5px;">
                <div class="col-sm-4">
                     <img :src="require('./images/instagram-name.png')" class="img-insta" />
                </div>
                <div class="col-sm-4">
                     <!-- <input type="text" placeholder="&#xF002;Search" class="search-bar"/> -->
                     <center>
                        <div class="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control search-bar" placeholder="Search">
                        </div>
                    </center>
                </div>
                <div class="col-sm-4 icon-arrange"  v-bind:key="pro">
                     <img :src="require('./images/home-icon.png')" class="icon-side" />
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
        <br/>
        <center>
            <div v-bind:key="cdx" v-for="(cat,cdx) in cats">
                
                <div class="post-p">
                    <div class="username-post">
                        <img :src="`${cat.profile}`" style="margin-left: 2%;margin-right: 0%;" class="user-profile-img"/>
                        {{cat.name}}
                        <img :src="require('./images/threedots.svg')" alt="" id="show-modal" @click="showDots = true" class="three-dots">
                    </div>
                    <span>
                        <!-- <img :src="`${cat.path}`" class="post-img"/> -->
                        <div v-if="cat.path.length==1" class="imgpo">
                            <!-- <div v-bind:key="inx" v-for="(t,inx) in catl.path"> -->
                                <clazy-load :src="`${cat.path[0]}`">
                                    <img :src="`${cat.path[0]}`" class="post-img list-load">
                                    <div class="preloader" slot="placeholder">
                                    <center>
                                        <img src="data:image/png;base64,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" alt="" style="width: 41%;">
                                    </center>
                                    </div>
                                </clazy-load>
                            <!-- </div> -->
                        </div>
                        <div v-if="cat.path.length>1" class="imgpo">
                                <div class="slides">
                                <transition-group name="slide" mode="out-in" enter-class="slide-in" leave-class="slide-out" enter-active-class="animated slide-in-active" leave-active-class="animated slide-out-active">
                                <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                                <div :key="index"
                                    v-for="index in cat.slides"
>
                                <div v-if="index == active">
                                    <img :src="`${cat.path[index-1]}`" alt="" class="post-img">
                                </div>
                                    
                                </div>
                                </transition-group>
                            </div>
                            <ul class="dots">
                                <li v-bind:key="index" v-for="(dot, index) in cat.slides" :class="{ active: ++index === active }" @click="jump(index)"></li>
                            </ul>
                        </div>
                        <div class="like-btn">
                            <img v-if="liked!=cat.id && iddot1!=cat.id" :src="image1" @click="myFunction(`${cat.id}`,`${cat.likes}`,`${cat.moboremail}`)" style="width:6%;">&nbsp;&nbsp;
                            <img v-if="liked==cat.id" :src="image2" @click="mydislike(`${cat.id}`,`${cat.likes}`,`${cat.moboremail}`)" style="width:6%;">&nbsp;&nbsp;
                            <img :src="require('./images/c.png')" style="width:4%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img :src="require('./images/save.png')" style="width:4%;">
                            <br>
                            <p style="margin-left: 1.5%;margin-bottom: unset;">{{cat.likes}}&nbsp;&nbsp;likes</p>
                            
                        </div>
                        <div class="comment" v-if="cat.comment.length<10">
                            <b>{{cat.name}}:</b>&nbsp;&nbsp; {{cat.comment}}
                            <br>
                            {{cat.date}}
                            <br/>
                            <div v-if="cat.commentl>0">
                                <div v-if="cat.commentl==1">
                                    <img :src="`${cat.ucomprofile}`" class="user-profile-img" />
                                    <b>{{cat.ucomname}}:</b>&nbsp;&nbsp; {{ cat.ucom}}
                                    <br>
                                    <div v-if="cat.ucomreplylen>0" style="margin-left: 8%;font-size: 15px;">
                                        <a @click="postcomreply(`${cat.ucomuserid}`,`${cat.id}`,`${cat.moboremail}`)" style="cursor: pointer;"> view all {{cat.ucomreplylen}} replies</a>
                                        <div v-if="reply==cat.ucomuserid" style="margin-left: 8%;font-size: 15px;">
                                            <div v-bind:key="cord" v-for="(rep,cord) in commentsuserreply">
                                                <img :src="`${rep.profile}`" class="user-profile-img" />
                                                <b>{{rep.uname}}:</b>&nbsp;&nbsp; {{ rep.comment}}
                                                <br>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text" v-if="replyid!=cat.commentid" @click="changecomreply(`${cat.commentid}`)" class="comment-edit-reply" id='comedit'>
                                    <input type="text" v-if="replyid==cat.commentid" v-model="usercomreply" class="comment-edit-reply" id='comedit'>
                                    <button @click="saveucomreply(`${cat.commentuserid}`,`${cat.id}`,`${cat.moboremail}`)" class="save-edit-reply">REPLY</button>
                                </div>
                                <div v-if="cat.commentl>1 && ucomid!=cat.id">
                                    <img :src="`${cat.ucomprofile}`" class="user-profile-img" />
                                    <b>{{cat.ucomname}}:</b>&nbsp;&nbsp; {{ cat.ucom}}
                                    <br>
                                    <div v-if="cat.ucomreplylen>0" style="margin-left: 8%;font-size: 15px;">
                                        <a @click="postcomreply(`${cat.ucomuserid}`,`${cat.id}`,`${cat.moboremail}`)" style="cursor: pointer;"> view all {{cat.ucomreplylen}} replies</a>
                                        <div v-if="reply==cat.ucomuserid" style="margin-left: 8%;font-size: 15px;">
                                            <div v-bind:key="cord" v-for="(rep,cord) in commentsuserreply">
                                                <img :src="`${rep.profile}`" class="user-profile-img" />
                                                <b>{{rep.uname}}:</b>&nbsp;&nbsp; {{ rep.comment}}
                                                <br>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text" v-if="replyid!=cat.commentid" @click="changecomreply(`${cat.commentid}`)" class="comment-edit-reply" id='comedit'>
                                    <input type="text" v-if="replyid==cat.commentid" v-model="usercomreply" class="comment-edit-reply" id='comedit'>
                                    <button @click="saveucomreply(`${cat.ucomuserid}`,`${cat.id}`,`${cat.moboremail}`)" class="save-edit-reply">REPLY</button>
                                    <br>
                                    <a @click="postcom(`${cat.id}`,`${cat.moboremail}`)" style="cursor: pointer;"> view all {{cat.commentl}} comments</a>
                                </div>    
                                 <div v-if="ucomid==cat.id" style="height: 12em;overflow-y: scroll;width: 87%;border: groove;">
                                    <div class="comment" v-bind:key="codx" v-for="(com,codx) in commentsuser">
                                        <img :src="`${com.profile}`" class="user-profile-img" />
                                        <b>{{com.uname}}:</b>&nbsp;&nbsp; {{ com.comment}}
                                        <br>
                                        <div v-if="com.ucomlength>0" style="margin-left: 8%;font-size: 15px;">
                                            <a @click="postcomreply(`${com.commentid}`,`${com.postid}`,`${com.moboremail}`)" style="cursor: pointer;"> view all {{com.ucomlength}} replies</a>
                                            <div v-if="reply==com.commentid" >
                                                <div v-bind:key="cord" v-for="(rep,cord) in commentsuserreply">
                                                    <img :src="`${rep.profile}`" class="user-profile-img" />
                                                    <b>{{rep.uname}}:</b>&nbsp;&nbsp; {{ rep.comment}}
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" v-if="replyid!=com.commentid" @click="changecomreply(`${com.commentid}`)" class="comment-edit-reply" id='comedit'>
                                        <input type="text" v-if="replyid==com.commentid" v-model="usercomreply" class="comment-edit-reply" id='comedit'>
                                        <button @click="saveucomreply(`${com.commentid}`,`${com.postid}`,`${com.moboremail}`)" class="save-edit-reply">REPLY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comment" v-if="cat.comment.length>10">
                            <span>
                            <p v-if="comid!=cat.id" style="margin-bottom: 0rem !important;"> <b>{{cat.name}}:</b>&nbsp;&nbsp; {{ cat.comment.substring(0,10) }}
                            <a @click="fullcom(`${cat.id}`)" v-if="iddot!=cat.id" class="showmore">Show more</a></p>
                            <p v-if="comid==cat.id"> <b>{{cat.name}}:</b>&nbsp;&nbsp;{{cat.comment}}</p>
                            </span>
                            <!-- <br> -->
                            {{cat.date}}
                            <br>
                             <div v-if="cat.commentl>0">
                                <div v-if="cat.commentl==1">
                                    <img :src="`${cat.ucomprofile}`" class="user-profile-img" />
                                    <b>{{cat.ucomname}}:</b>&nbsp;&nbsp; {{ cat.ucom}}
                                    <br>
                                    <div v-if="cat.ucomreplylen>0" style="margin-left: 8%;font-size: 15px;">
                                        <a @click="postcomreply(`${cat.ucomuserid}`,`${cat.id}`,`${cat.moboremail}`)" style="cursor: pointer;"> view all {{cat.ucomreplylen}} replies</a>
                                        <div v-if="reply==cat.ucomuserid" style="margin-left: 8%;font-size: 15px;">
                                            <div v-bind:key="cord" v-for="(rep,cord) in commentsuserreply">
                                                <img :src="`${rep.profile}`" class="user-profile-img" />
                                                <b>{{rep.uname}}:</b>&nbsp;&nbsp; {{ rep.comment}}
                                                <br>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text" v-if="replyid!=cat.commentid" @click="changecomreply(`${cat.commentid}`)" class="comment-edit-reply" id='comedit'>
                                    <input type="text" v-if="replyid==cat.commentid" v-model="usercomreply" class="comment-edit-reply" id='comedit'>
                                    <button @click="saveucomreply(`${cat.ucomuserid}`,`${cat.id}`,`${cat.moboremail}`)" class="save-edit">REPLY</button>
                                </div>
                                <div v-if="cat.commentl>1 && ucomid!=cat.id">
                                    <img :src="`${cat.ucomprofile}`" class="user-profile-img" />
                                    <b>{{cat.ucomname}}:</b>&nbsp;&nbsp; {{ cat.ucom}}
                                    <br>
                                    <!-- id:{{cat.ucomuserid}} -->
                                        <div v-if="cat.ucomreplylen>0" style="margin-left: 8%;font-size: 15px;">
                                        <a @click="postcomreply(`${cat.ucomuserid}`,`${cat.id}`,`${cat.moboremail}`)" style="cursor: pointer;"> view all {{cat.ucomreplylen}} replies</a>
                                        <div v-if="reply==cat.ucomuserid" style="margin-left: 8%;font-size: 15px;">
                                            <div v-bind:key="cord" v-for="(rep,cord) in commentsuserreply">
                                                <img :src="`${rep.profile}`" class="user-profile-img" />
                                                <b>{{rep.uname}}:</b>&nbsp;&nbsp; {{ rep.comment}}
                                                <br>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text" v-if="replyid!=cat.commentid" @click="changecomreply(`${cat.commentid}`)" class="comment-edit-reply" id='comedit'>
                                    <input type="text" v-if="replyid==cat.commentid" v-model="usercomreply" class="comment-edit-reply" id='comedit'>
                                    <button @click="saveucomreply(`${cat.ucomuserid}`,`${cat.id}`,`${cat.moboremail}`)" class="save-edit">REPLY</button>
                                    <br>
                                    <a @click="postcom(`${cat.id}`,`${cat.moboremail}`)" style="cursor: pointer;"> view all {{cat.commentl}} comments</a>
                                </div>    
                                 <div v-if="ucomid==cat.id" style="height: 86px;overflow-y: scroll;width: 87%;border: groove;">
                                    <div class="comment" v-bind:key="codx" v-for="(com,codx) in commentsuser">
                                        <img :src="`${com.profile}`" class="user-profile-img" />
                                        <b>{{com.uname}}:</b>&nbsp;&nbsp; {{ com.comment}}
                                        <br>
                                        <div v-if="com.ucomlength>0" style="margin-left: 8%;font-size: 15px;">
                                            <a @click="postcomreply(`${com.commentid}`,`${com.postid}`,`${com.moboremail}`)" style="cursor: pointer;"> view all {{com.ucomlength}} replies</a>
                                            <div v-if="reply==com.commentid" >
                                                <div v-bind:key="cord" v-for="(rep,cord) in commentsuserreply">
                                                    <img :src="`${rep.profile}`" class="user-profile-img" />
                                                    <b>{{rep.uname}}:</b>&nbsp;&nbsp; {{ rep.comment}}
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" v-if="replyid!=com.commentid" @click="changecomreply(`${com.commentid}`)" class="comment-edit-reply" id='comedit'>
                                        <input type="text" v-if="replyid==com.commentid" v-model="usercomreply" class="comment-edit-reply" id='comedit'>
                                        <button @click="saveucomreply(`${com.commentid}`,`${com.postid}`,`${com.moboremail}`)" class="save-edit">REPLY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comment">
                            <input type="text" v-if="iddot!=cat.id" @click="changecom(`${cat.id}`)" class="comment-edit" id='comedit'>
                            <input type="text" v-if="iddot==cat.id" v-model="usercom" class="comment-edit" id='comedit'>
                            <button @click="saveucom(`${cat.id}`,`${cat.moboremail}`,`${cat.commentid}`)" class="save-edit">POST</button>
                        </div>
                    </span>
                </div>
                <br>
                <br>
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
        name: 'Home',
        props: {
            msg: String
        },
        data() {
            return {
                reply:"",
                commentsuserreply:"",
                ucomreplyid:"",
                usercomreply:"",
                replyid:"",
                usercom:"",
                iddot1:"",
                liked:"",
                active: 1,
                comid:"",
                iddot:"",
                cats: [],
                pro:"",
                image1 :require('../components/images/activity.png'),
                image2 :require('../components/images/like-image-color.png'),
                temp:"",
                like:0,
                t:require('../components/images/activity.png'),
                isFavorite:false,
                po:"",
                postdetails:"",
                postpaths:"",
                postucoms:"",
                postucomsreplies:"",
                users:"",
                commentid:"",
                commentsuser:[],
                ucomid:""
            }
        },
        mounted() {
            this.cats = []
            this.slides=0
            let email = sessionStorage.getItem('email');
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getuser/"+email)
            .then(response=>response.json())
            .then(data=>{
                this.pro=data.profile
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getallusers/")
            .then(response=>response.json())
            .then(data=>{
                this.users=data
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getallposts/")
            .then(response=>response.json())
            .then(posts=>{
                this.postdetails=posts;
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getallpath/")
            .then(response=>response.json())
            .then(paths=>{
                this.postpaths=paths;
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getallucomreply/")
            .then(response=>response.json())
            .then(ucomsreplies=>{
                this.postucomsreplies=ucomsreplies;
            })
            fetch("https://instagram-db-struct.herokuapp.com/api/user/getallucom/")
            .then(response=>response.json())
            .then(ucoms=>{
                this.postucoms=ucoms;
                this.init();
            })
        },
        methods:{
            postcomreply(cid,poid,moboremail){
                this.reply=cid
                let ma=[];
                var pr,i;
                this.postucomsreplies.forEach(po=>{
                    if(po.postid==poid && po.commentid==cid && po.moboremail==moboremail){
                        this.users.forEach(u=>{
                            if(u.moboremail==po.moboremail){
                                pr=u.profile;
                                i=u.uname;
                            }
                        })
                        var k={
                            comment:po.comment,
                            profile:pr,
                            uname:i,
                            moboremail:po.moboremail,
                            postid:po.postid,
                            commentid:po.commentid
                        }
                        ma.push(k);
                    }
                })
                console.log(ma)
                this.commentsuserreply=ma;
            },
            saveucomreply(commentid,postid,moboremail){
                let email=sessionStorage.getItem('email');
                console.log(this.usercomreply)
                var post={
                    moboremail:moboremail,
                    postid:postid,
                    replycommentuserid:email,
                    commentid:commentid,
                    comment:this.usercomreply
                }
                console.log(post)
                fetch("https://instagram-db-struct.herokuapp.com/api/user/saveucomreply/"+email, {   
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
            changecomreply(id){
                this.replyid=id;
                console.log(id)
            },
            postcom(postid,moboremail){
                console.log(moboremail)
                this.ucomid=postid
                let ma=[]
                var pr,i;
                this.postucoms.forEach(po=>{
                    if(po.postid==postid && po.moboremail==moboremail){
                        this.users.forEach(u=>{
                            if(u.moboremail==po.commentuserid){
                                pr=u.profile;
                                i=u.uname;
                            }
                        })
                        var len=0;
                        this.postucomsreplies.forEach(p=>{
                            if(p.postid==postid && p.moboremail==moboremail && p.commentid==po.commentid){
                                len=len+1;
                            }
                        })
                        var k={
                            comment:po.comment,
                            profile:pr,
                            uname:i,
                            moboremail:po.moboremail,
                            postid:po.postid,
                            commentid:po.commentid,
                            ucomlength:len
                        }
                        ma.push(k);
                    }
                })
                this.commentsuser=ma
                console.log(this.commentsuser)
            },
            changecom(id){
                this.iddot=id
            },
            saveucom(img, email,comid) {
                 let us=sessionStorage.getItem('email');
                 console.log(img)
                console.log(email)
                console.log(comid)
                var uc={
                    moboremail:email,
                    postid:img,
                    commentuserid:us,
                    commentid:comid,
                    comment:this.usercom
                }
                fetch("https://instagram-db-struct.herokuapp.com/api/user/saveucom/"+email, {   
                    method: "POST", 
                    body: JSON.stringify(
                        uc
                    ),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }) 
                .then(response => response.json()) 
                .then(json => console.log(json));
            },
            init(){
                console.log(this.postucomsreplies)
                
                let pa=[]
                let ma=[]
                this.postdetails.forEach(p=>{
                    this.slides=0;
                    this.postpaths.forEach(po=>{
                        if(po.postid==p.postid){
                            pa.push(po.url)
                            this.slides=this.slides+1;
                        }
                    })
                    var c,pr,i,j=0;
                    this.postucoms.forEach(po=>{
                        if(po.postid==p.postid ){
                            this.users.forEach(u=>{
                                if(u.moboremail==po.commentuserid){
                                    pr=u.profile;
                                    i=u.uname;
                                }
                            })
                            var k={
                                comment:po.comment,
                                profile:pr,
                                uname:i,
                                moboremail:po.moboremail,
                                postid:po.postid,
                                id:po.commentid
                            }
                            ma=k;
                            j=j+1;
                            c=po.commentid;
                        }
                    })
                    let profile="",uname="";
                    this.users.forEach(u=>{
                        if(u.moboremail==p.moboremail){
                            profile=u.profile;
                            uname=u.uname
                        }
                    })
                    let l;
                    if(p.likes==null)
                        l="0";
                    else    
                        l=p.likes
                    if(c==null)
                        c="0"
                    else{
                        c=parseInt(c)
                        c=c+1;
                    }
                    var replylength=0;
                    this.postucomsreplies.forEach(ur=>{
                        if(ur.postid==p.postid && ur.commentid==ma.id && ur.moboremail==p.moboremail)
                        replylength=replylength+1;
                        
                    })
                    var sam = {
                    profile:profile,
                    name: uname,
                    path: pa,
                    comment: p.comments,
                    likes:l,
                    id:p.postid,
                    slides:this.slides,
                    moboremail:p.moboremail,
                    date:p.date,
                    commentid:c,
                    commentl:j,
                    ucomuserid:ma.id,
                    ucom:ma.comment,
                    ucomname:ma.uname,
                    ucomprofile:ma.profile,
                    ucomreplylen:replylength,
                    }
                    console.log(sam);
                    this.like=parseInt(l)
                    this.cats.push(sam);
                    pa=[]
                    ma=[]
                })
            },
             jump(index) {
                this.active = index
            },
            fullcom(id){
                this.iddot=id
                this.comid=id
            },
            mydislike(img,likes,email){
                this.iddot1=""
                this.liked=""
                console.log(img)
                console.log(likes)
                likes=parseInt(likes);
                likes=likes-1;
                if(likes<0){
                    likes=0
                }
                likes=likes.toString();
                var post={
                    moboremail:email,
                    id:img,
                    like:likes
                }
                fetch("https://instagram-db-struct.herokuapp.com/api/user/changelikes/"+email, {   
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
            myFunction(img,likes,email) {	
                console.log(email);
                this.iddot1 = img
                this.liked = img
                console.log(img)
                console.log(likes)
                likes=parseInt(likes);
                likes=likes+1;
                if(likes<0){
                    likes=0
                }
                likes=likes.toString();
                var post={
                    moboremail:email,
                    id:img,
                    like:likes
                }
                fetch("https://instagram-db-struct.herokuapp.com/api/user/changelikes/"+email, {   
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
            }
        }
    }
</script>

<style scoped>
    .save-edit-reply {
        line-height: 1.5em;
        width: 16%;
        margin-bottom: 2%;
        border: none;
        background: none;
        color: rgba(var(--d69, 0, 149, 246), 1);
        font-size: 15px;
    }
    .comment-edit {
        border: none;
        border-bottom: 1px solid black;
        line-height: 0em;
        width: 74%;
    }

    .save-edit {
        line-height: 1.5em;
        width: 16%;
        margin-bottom: 2%;
        border: none;
        background:none;
        color: rgba(var(--d69, 0, 149, 246), 1);
        font-size: 18px;
    }
    .comment {
        text-align: initial;
        margin-left: 2%;
        line-height: 2em;
    }
    .img-insta {
        width: 27%;
    }

    .nav-upload {
        background-color: white;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    }

    .upload {
        background-color: rgba(var(--b3f, 250, 250, 250), 1) !important;
        overflow-x: hidden;
    }

    .login {
        background-color: white;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
        margin-top: 2em;
        /* max-width: 350px; */
    }
    .search-bar{
        text-align: center;
        background-color: rgba(var(--b3f,250,250,250),1);
        border: 1px solid rgba(var(--ca6,219,219,219),1);
        border-radius: 2px;
        font-family: 'Helvetica', FontAwesome, sans-serif;
        width: 53%;
        font-size: 12px;
        height: 74%;
        margin-top: 1%;
    }
    .icon-side{
        width: 6%;
        margin-right: 3%;
    }
    .post-img{
        width: 600px;
        /* height: 600px; */
        object-fit: cover;
        margin-left: -1px;
        border-bottom: 1px solid rgba(var(--ca6, 219, 219, 219), 1);
    }
    .post-p{
        background-color: white;
        width: 600px;
        border: 1px solid rgba(var(--ca6, 219, 219, 219), 1);   
    }
    .footer{
        margin-top: 6em;
        margin-left: 8em;
        font-size: 12px;
    }

    .footer a{
        color: #385185;
        margin-right: 1em;
        font-weight: 600;
    }

    a.disabled{
        pointer-events: none;
        cursor: default;
        margin-left: 20em;
    }
    input:focus, textarea:focus, select:focus{
        outline: none;
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
  .three-dots {
    margin-left: 77%;
}
.showmore {
    color: inherit;
    font-weight: 600;
    font-size: 15px;
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
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
   .icon-arrange{
      margin-left: -3%;
      margin-top: 0.5%;
  }
  .comment-edit-reply {
    border: none;
    border-bottom: 1px solid black;
    line-height: 0em;
    width: 44%;
    margin-left: 5%;
}
  /* responsive */
  @media only screen and (max-width: 600px){
       .three-dots {
            margin-left: 44%;
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
        .three-dots[data-v-3d0b1749] {
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
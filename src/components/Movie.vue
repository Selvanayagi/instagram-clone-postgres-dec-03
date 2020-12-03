<template>
  <div class="movie">
    <h2>{{ movie.Title }}</h2>
    <div>
      <img width="200" :alt="altText" :src="movie.Poster" />
    </div>
    <p>{{ movie.Year }}</p>
    <!-- <button @click="add(`${movie.Title}`,`${movie.Poster}`,`${movie.Year}`)">Add to favourites</button> -->
    <button @click="add(`${movie.Title}`,`${movie.Poster}`,`${movie.Year}`)" v-show="!isFavorite">Add to favorites</button>
    <button @click="remove(`${movie.Title}`)" v-show="isFavorite">Delete from favorites</button>
  </div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: "Movie",
    props: ['movie'],
    
    setup({ movie }) {
      
      const altText = computed(() => `The movie titled: ${movie.Title}`);
      console.log(movie);
      var t=false
      let email = sessionStorage.getItem('email');
       fetch("https://instagram-db-struct.herokuapp.com/api/user/getmovie/"+email)
      .then(response=>response.json())
      .then(data=>{
        data.forEach(f=>{
          if(movie.Title==f.title){
            t=true
          }
        })
        
      });
      return { altText,movies:[],isFavorite:t };
    },
    methods:{
      remove(title){
        this.isFavorite=false
        let email = sessionStorage.getItem('email');
        var movie = {
          moboremail:email,
          title: title
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
      },
    add(title,poster,year) {
      this.isFavorite=true
      let email = sessionStorage.getItem('email');
      var movie = {
          moboremail:email,
          title: title,
          poster: poster,
          year: year
      }
      fetch("https://instagram-db-struct.herokuapp.com/api/user/savenewmovie/", {   
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
};
</script>

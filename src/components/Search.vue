<template>
<div class="search">
  <center>
    <input
       type="text"
       :value="movieTitle"
       @keyup="handleChange"
    />
        <!-- <br /><br /> -->
    <br /><br/>
    <button @click="handleSubmit" class="edit-btn">Search</button>
  </center>
</div>
  <!-- <form class="search">
    <input
       type="text"
       :value="movieTitle"
       @keyup="handleChange"
    />
    <br/>
    <input @click="handleSubmit" type="submit" value="SEARCH" class="edit-btn"/> -->
  <!-- </form> -->
</template>

<script>
  import { ref } from '@vue/composition-api';

  export default {
    name: 'Search',
    props: ['search'],
    setup({ search }, { emit }) {
      const movieTitle = ref(search);

      return {
        movieTitle,
        handleSubmit(event) {
          event.preventDefault();
          emit('search', movieTitle.value);
        },
        handleChange(event) {
          movieTitle.value = event.target.value
        }
      }
    }
  };
</script>

<style scoped>
 .edit-btn {
        margin-left: 1em;
        font-size: 18px;
        width: 61%;
         border: 1px solid transparent;
        background-color: rgba(var(--d69,0,149,246),1);
        color: white;
        border-radius: 6px;
        line-height: 23px;
    }
</style>

<template>
  <div class="box">
    <img
      v-for="item in imgUrl"
      src="../assets/default.gif"
      v-lazy="item"
      alt=""
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
const imgUrl = ref([
  'https://img1.sycdn.imooc.com/szimg/65f92b3c08e3a46905400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/65e8271808e378f805400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/65ded7b808f5cd6605400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/657fa729080bbfeb05400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/654b42dd09fc221105400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/6588fb3b090f487d05400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/65274fb808c287fb05400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/657a91540945493805400304.jpg',
  'https://img1.sycdn.imooc.com/szimg/655dc775094c6f5605400304.jpg',
  'https://img1.sycdn.imooc.com//65fd41ea0992b7b600000000.jpg',
  'https://img1.sycdn.imooc.com/szimg/5fc097db0953736b07360180.png',
  'https://img1.sycdn.imooc.com/szimg/5fc097db0953736b07360180.png',
  '	https://img1.sycdn.imooc.com/szimg/650413db095d8b8d05400304.png',
  'https://img1.sycdn.imooc.com/6212fe63099c7a3305400304.png',
  'https://img1.sycdn.imooc.com/63fc167c09c34ded05400304.png',
])
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.box img {
  margin: auto;
  margin-bottom: 5px;
  width: 300px;
  height: 150px;
  background-color: pink;
}
</style>

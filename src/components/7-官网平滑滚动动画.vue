<template>
  <div class="scroll-box">
    <div v-slide-in class="item" v-for="n in 10">{{ n }}</div>
  </div>
</template>
<script setup></script>
<style scoped>
.scroll-box {
  margin: 1em auto;
  width: 80%;
  /* background-color: red; */
}

.item {
  width: 100%;
  aspect-ratio: 2/1;
  margin: 5vw 0;
  border-radius: 5px;
  background-color: pink;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vw;
  color: #fff;
}
</style>

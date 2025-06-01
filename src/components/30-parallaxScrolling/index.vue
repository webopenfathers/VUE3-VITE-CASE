<template>
  <div class="parallax-container" id="content">
    <section class="layer-1">
      <h1>Simple parallax sections</h1>
    </section>
    <section class="layer-2">
      <h1>Hey look, a title</h1>
    </section>
    <section class="layer-3">
      <h1>They just keep comming</h1>
    </section>
    <section class="layer-4">
      <h1>So smooth though</h1>
    </section>
    <section class="layer-5">
      <h1>Nice, night?</h1>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const sections = document.querySelectorAll('section')
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      {
        backgroundPositionY: `-${window.innerHeight / 2}px`,
      },
      {
        backgroundPositionY: `${window.innerHeight / 2}px`,
        ease: 'none',
        duration: 3,
        scrollTrigger: {
          trigger: section,
          scroller: '#content', // 指定滚动容器(重要)
          scrub: true,
        },
      }
    )
  })
})
</script>

<style scoped>
.parallax-container {
  height: 100vh;
  overflow-y: scroll;
}

section {
  height: 100vh;
  display: flex;
  align-items: center;
  font-size: 50px;
  justify-content: center;
  color: white;
}

.layer-1 {
  background: url('../../assets/30-img/layer-1.jpg') no-repeat center center;
  background-size: cover;
}

.layer-2 {
  background: url('../../assets/30-img/layer-2.jpg') no-repeat center center;
  background-size: cover;
}

.layer-3 {
  background: url('../../assets/30-img/layer-3.jpg') no-repeat center center;
  background-size: cover;
}

.layer-4 {
  background: url('../../assets/30-img/layer-4.jpg') no-repeat center center;
  background-size: cover;
}

.layer-5 {
  background: url('../../assets/30-img/layer-5.jpg') no-repeat center center;
  background-size: cover;
}
</style>

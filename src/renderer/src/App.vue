<template>
  <div class="main-container">
    <div class="background"></div>
    <Nav />

    <div class="interface">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';

onMounted(() => {
  // Listens for docker info
  electron.ipcRenderer.on('docker-run-info', (_event, info) => {
    console.log(info)
  })
})

// Clear the listener
onUnmounted(() => {
  electron.ipcRenderer.removeAllListeners('docker-run-info')
})
</script>

<style>
@import "./assets/app.css";
</style>
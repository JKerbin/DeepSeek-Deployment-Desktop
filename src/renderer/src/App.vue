<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

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
:root {
  font-family: Arial, sans-serif;
  font-size: 16px;
}
</style>
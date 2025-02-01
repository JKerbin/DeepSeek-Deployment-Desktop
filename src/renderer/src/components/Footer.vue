<template>
    <footer class="footer">
        <div class="dropdown">
            <button class="btn btn-secondary GPU-info info" data-bs-toggle="dropdown">
                <svg v-if="graphicsInfo === undefined" t="1738327861876" class="icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8049" width="200" height="200">
                    <path
                        d="M509.4 455L378 323.6c-14.5-14.5-38.1-14.5-52.6 0s-14.5 38.1 0 52.6l131.5 131.4L325.4 639c-14.5 14.5-14.5 38.1 0 52.6s38.1 14.5 52.6 0l131.5-131.5L641 691.6c14.5 14.5 38.1 14.5 52.6 0s14.5-38.1 0-52.6L562 507.6l131.5-131.4c14.5-14.5 14.5-38.1 0-52.6s-38.1-14.5-52.6 0L509.4 455z m3.7 502.5c-246.4 0-446.2-199.8-446.2-446.2S266.7 65.1 513.1 65.1s446.2 199.8 446.2 446.2-199.7 446.2-446.2 446.2z"
                        fill="#EA3C3C" p-id="8050"></path>
                </svg>
                <svg v-else t="1738327600361" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5893" width="200" height="200">
                    <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" p-id="5894">
                    </path>
                    <path
                        d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
                        fill="#CCFF90" p-id="5895"></path>
                </svg>
                <span>GPU</span>
            </button>
            <ul class="dropdown-menu GPU-info-list info-list">
                <li v-if="graphicsInfo === undefined" class="dropdown-item GPU-info-item info-item">
                    {{ language === 'en' ? 'No GPU information has been detected.' : '没有读取到显卡信息。' }}
                </li>
                <li v-for="(info, index) in graphicsInfo" :key="index" class="dropdown-item GPU-info-item info-item">
                    {{ info.model }} <br />
                    <strong>VRAM:</strong> {{ info.vram }} MB
                </li>
            </ul>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary cuda-info info" data-bs-toggle="dropdown">
                <svg v-if="cudaInfo === undefined" t="1738327861876" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="8049" width="200" height="200">
                    <path
                        d="M509.4 455L378 323.6c-14.5-14.5-38.1-14.5-52.6 0s-14.5 38.1 0 52.6l131.5 131.4L325.4 639c-14.5 14.5-14.5 38.1 0 52.6s38.1 14.5 52.6 0l131.5-131.5L641 691.6c14.5 14.5 38.1 14.5 52.6 0s14.5-38.1 0-52.6L562 507.6l131.5-131.4c14.5-14.5 14.5-38.1 0-52.6s-38.1-14.5-52.6 0L509.4 455z m3.7 502.5c-246.4 0-446.2-199.8-446.2-446.2S266.7 65.1 513.1 65.1s446.2 199.8 446.2 446.2-199.7 446.2-446.2 446.2z"
                        fill="#EA3C3C" p-id="8050"></path>
                </svg>
                <svg v-else t="1738327600361" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5893" width="200" height="200">
                    <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" p-id="5894">
                    </path>
                    <path
                        d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
                        fill="#CCFF90" p-id="5895"></path>
                </svg>
                <span>CUDA</span>
            </button>
            <ul class="dropdown-menu cuda-info-list info-list">
                <li v-if="cudaInfo === undefined" class="dropdown-item cuda-info-item info-item">
                    {{ language === 'en' ? 'No available CUDA version has been detected.' : '没有检测到可用的cuda版本。' }}
                </li>
                <li v-else class="dropdown-item cuda-info-item info-item">
                    <strong>CUDA Version: </strong>{{ cudaInfo }}
                </li>
            </ul>
        </div>
        <div class="dropdown">
            <button class="btn btn-secondary docker-info info" data-bs-toggle="dropdown">
                <svg v-if="dockerInfo === undefined" t="1738327861876" class="icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8049" width="200" height="200">
                    <path
                        d="M509.4 455L378 323.6c-14.5-14.5-38.1-14.5-52.6 0s-14.5 38.1 0 52.6l131.5 131.4L325.4 639c-14.5 14.5-14.5 38.1 0 52.6s38.1 14.5 52.6 0l131.5-131.5L641 691.6c14.5 14.5 38.1 14.5 52.6 0s14.5-38.1 0-52.6L562 507.6l131.5-131.4c14.5-14.5 14.5-38.1 0-52.6s-38.1-14.5-52.6 0L509.4 455z m3.7 502.5c-246.4 0-446.2-199.8-446.2-446.2S266.7 65.1 513.1 65.1s446.2 199.8 446.2 446.2-199.7 446.2-446.2 446.2z"
                        fill="#EA3C3C" p-id="8050"></path>
                </svg>
                <svg v-else t="1738327600361" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5893" width="200" height="200">
                    <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" p-id="5894">
                    </path>
                    <path
                        d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
                        fill="#CCFF90" p-id="5895"></path>
                </svg>
                <span>Docker</span>
            </button>
            <ul class="dropdown-menu docker-info-list info-list">
                <li v-if="dockerInfo === undefined" class="dropdown-item docker-info-item info-item">
                    {{ language === 'en' ? 'No available docker version has been detected.' : '没有检测到可用的docker版本。' }}
                </li>
                <li v-else class="dropdown-item docker-info-item info-item">
                    <strong>Docker Version: </strong>{{ dockerInfo }}
                </li>
            </ul>
        </div>

        <div class="instance-status info">
            <svg v-if="instanceStatus" t="1738376720183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1497" width="200" height="200">
                <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#CCFF90" p-id="1498"
                    data-spm-anchor-id="a313x.search_index.0.i3.27373a81e1NJBQ" class=""></path>
                <path d="M512 512m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#4CAF50" p-id="1499"
                    data-spm-anchor-id="a313x.search_index.0.i0.27373a81e1NJBQ" class="selected"></path>
            </svg>
            <svg v-else t="1738376663947" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="6498" width="200" height="200">
                <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#db6050" p-id="6499"></path>
                <path d="M512 512m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#d81e06" p-id="6500"></path>
            </svg>
            <span>{{ instanceStatus ? "Active" : "Idle" }}</span>
        </div>
    </footer>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useMainStore } from '../stores/mainStore';
const store = useMainStore();
const language = computed(() => store.language);
const instanceStatus = computed(() => store.instanceStatus);

const graphicsInfo = ref(undefined);
const cudaInfo = ref(undefined);
const dockerInfo = ref(undefined);

onMounted(async () => {
    // GPU information
    graphicsInfo.value = await electron.ipcRenderer.invoke('get-graphics-info');
    cudaInfo.value = await electron.ipcRenderer.invoke('get-cuda-info');
    dockerInfo.value = await electron.ipcRenderer.invoke('get-docker-info');
    store.setGraphicsInfo(graphicsInfo.value);
    store.setCudaInfo(cudaInfo.value);
});
</script>

<style scoped>
@import "../assets/footer.css";
</style>
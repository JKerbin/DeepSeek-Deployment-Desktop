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
    </footer>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useMainStore } from '../stores/mainStore';
const store = useMainStore();
const language = computed(() => store.language);

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
.footer {
    position: fixed;
    bottom: 0;
    height: 1.5rem;
    width: 100vw;
    background-color: var(--subdesk-color);
    display: flex;
    align-items: center;
}

.info {
    height: 1.5rem;
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-radius: 0;
    border-right: 1px solid var(--desk-color);
}

.info:hover {
    background-color: var(--desk-color);
    border: none;
}

.info span {
    font-size: 0.7rem;
    position: absolute;
    text-align: center;
    width: 2.5rem;
    right: 0.5rem;
    color: var(--font-color);
}

.info svg {
    height: 1rem;
    width: 1rem;
    position: absolute;
    left: 0.7rem;
}

.info-item:hover {
    background-color: transparent;
}

.info-item:active {
    background-color: transparent;
    color: black;
}
</style>
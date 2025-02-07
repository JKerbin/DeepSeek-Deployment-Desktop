<template>
    <div class="overflow-auto">
        <div class="header">
            <span class="items">{{ language === 'en' ? 'FILES' : '文件' }}</span>
            <span class="status">{{ language === 'en' ? `STATUS` : `状态` }}</span>
        </div>
        <div class="item" v-for="file in filesR" :key="file.name">
            <span class="file-name">{{ file.name }}</span>
            <div class="status">
                <div class="indicator">
                    <svg v-if="file.status === 'completed'" t="1738327600361" class="icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5893" width="200" height="200">
                        <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" p-id="5894">
                        </path>
                        <path
                            d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
                            fill="#CCFF90" p-id="5895"></path>
                    </svg>
                    <svg v-else-if="file.status === 'downloading'" t="1738932870390" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5910" width="200"
                        height="200">
                        <path
                            d="M512 64C265.6 64 64 265.6 64 512s201.6 448 448 448 448-201.6 448-448S758.4 64 512 64z m182.4 521.6l-160 144c-12.8 12.8-32 12.8-44.8 0l-160-140.8c-32-28.8 16-73.6 44.8-44.8l105.6 92.8V313.6c0-41.6 64-41.6 64 0v323.2l105.6-96c28.8-28.8 73.6 16 44.8 44.8z"
                            p-id="5911" fill="#4d6bfe"></path>
                    </svg>
                    <svg v-else t="1738327861876" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="8049" width="200" height="200">
                        <path
                            d="M509.4 455L378 323.6c-14.5-14.5-38.1-14.5-52.6 0s-14.5 38.1 0 52.6l131.5 131.4L325.4 639c-14.5 14.5-14.5 38.1 0 52.6s38.1 14.5 52.6 0l131.5-131.5L641 691.6c14.5 14.5 38.1 14.5 52.6 0s14.5-38.1 0-52.6L562 507.6l131.5-131.4c14.5-14.5 14.5-38.1 0-52.6s-38.1-14.5-52.6 0L509.4 455z m3.7 502.5c-246.4 0-446.2-199.8-446.2-446.2S266.7 65.1 513.1 65.1s446.2 199.8 446.2 446.2-199.7 446.2-446.2 446.2z"
                            fill="#EA3C3C" p-id="8050"></path>
                    </svg>
                </div>
                <span>{{ language === 'en' ? file.status : (file.status === 'completed' ? '完成' : (file.status ===
                    'downloading' ? '下载中' : '失败')) }}</span>
                <span v-if="file.status === 'downloading'">{{ file.progress }}%</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useMainStore } from '../stores/mainStore';

const props = defineProps({
    model: {
        type: Number,
        required: true
    }
});
const { model } = props;
const emit = defineEmits();
const store = useMainStore();
const language = computed(() => store.language);

const filesDir = ref('');
const filesR = ref([]);

// Vram capacity required for different models
if (model === 0) {
    filesDir.value = 'Qwen-1.5B';
    filesR.value = [
        { name: 'config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/resolve/main/config.json?download=true', status: 'pending', progress: '0' },
        { name: 'generation_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/resolve/main/generation_config.json?download=true', status: 'pending', progress: '0' },
        { name: 'model.safetensors', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/resolve/main/model.safetensors?download=true', status: 'pending', progress: '0' },
        { name: 'tokenizer.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/resolve/main/tokenizer.json?download=true', status: 'pending', progress: '0' },
        { name: 'tokenizer_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/resolve/main/tokenizer_config.json?download=true', status: 'pending', progress: '0' }
    ];
} else if (model === 1) {
    filesDir.value = 'Qwen-7B';
    filesR.value = [
        { name: 'config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/resolve/main/config.json?download=true', status: 'pending', progress: '0' },
        { name: 'generation_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/resolve/main/generation_config.json?download=true', status: 'pending', progress: '0' },
        { name: 'model.safetensors.index.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/resolve/main/model.safetensors.index.json?download=true', status: 'pending', progress: '0' },
        { name: 'model-00001-of-000002.safetensors', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/resolve/main/model-00001-of-000002.safetensors?download=true', status: 'pending', progress: '0' },
        { name: 'model-00002-of-000002.safetensors', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/resolve/main/model-00002-of-000002.safetensors?download=true', status: 'pending', progress: '0' },
        { name: 'tokenizer.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/resolve/main/tokenizer.json?download=true', status: 'pending', progress: '0' },
        { name: 'tokenizer_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/resolve/main/tokenizer_config.json?download=true', status: 'pending', progress: '0' }
    ];
}

// Send an ipc message to the main process to check the model
const validatingRes = electron.ipcRenderer.invoke('validate-model', { dir: filesDir.value, files: filesR.value.map(file => file.name) });

validatingRes.then(result => {
    for (let i = 0; i < result.length; i++) {
        filesR.value[i]['status'] = result[i];
    }

    // Check out the file whose status is downloading
    const filesToDownload = filesR.value.filter(file => file.status === 'downloading');

    // Send download requests one by one
    filesToDownload.forEach(file => {
        electron.ipcRenderer.send('download-file', {
            dir: filesDir.value,
            name: file.name,
            url: file.url
        });
    });
}).catch(error => {
    filesR.value.forEach(file => file.status = 'failed')
});

// Listen for download progress events
electron.ipcRenderer.on('download-progress', (_, { name, progress }) => {
    const file = filesR.value.find(f => f.name === name);
    if (file) {
        file.progress = progress.toFixed(0)
    }
});

// Listen for download completion events
electron.ipcRenderer.on('download-complete', (_, { name }) => {
    const file = filesR.value.find(f => f.name === name);
    if (file) {
        file.status = 'completed';
    }
});

// Listen for download failure events
electron.ipcRenderer.on('download-fail', (_, { name }) => {
    const file = filesR.value.find(f => f.name === name);
    if (file) {
        file.status = 'failed';
    }
});

watch(filesR, () => {
    if (filesR.value.every(f => f.status === 'completed')) {
        emit('files-validated');
    }
}, { deep: true });
</script>

<style scoped>
.overflow-auto {
    position: absolute;
    top: 10%;
    width: 75%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
}

.header {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 4rem;
    border-bottom: 1.5px solid var(--desk-color);
}

.header .items {
    position: absolute;
    width: 50%;
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    left: 0;
    border-right: 1.5px solid var(--desk-color);
}

.header .status {
    position: absolute;
    right: 0;
    width: 50%;
    height: 3rem;
    display: flex;
    justify-content: start;
    padding: 1rem;
    align-items: center;
}

.item {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 4rem;
    border-bottom: 1.5px solid var(--desk-color);
}


.item .file-name {
    position: absolute;
    width: 50%;
    height: 3rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    left: 0;
    border-right: 1.5px solid var(--desk-color);
}

.item .status {
    position: absolute;
    right: 0;
    width: 50%;
    height: 3rem;
    display: flex;
    justify-content: start;
    padding: 1rem;
    align-items: center;
}

.item .status span {
    position: relative;
    margin-left: 0.2rem;
}

.item .status .indicator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    height: 1rem;
    width: 1rem;
    display: flex;
    position: relative;
    right: 0;
}

.item .status .indicator svg {
    height: 1rem;
    width: 1rem;
}
</style>
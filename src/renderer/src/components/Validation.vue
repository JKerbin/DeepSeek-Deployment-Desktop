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

                </div>
                <span>{{ language === 'en' ? file.status : (file.status === 'exists' ? '已存在' : (file.status ===
                    'downloading' ? '下载中' : '失败')) }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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
        { name: 'config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/blob/main/config.json', status: 'pending' },
        { name: 'generation_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/blob/main/generation_config.json', status: 'pending' },
        { name: 'tokenizer.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/blob/main/tokenizer.json', status: 'pending' },
        { name: 'tokenizer_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/blob/main/tokenizer_config.json', status: 'pending' },
        { name: 'model.safetensors', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B/blob/main/model.safetensors', status: 'pending' }
    ];
} else if (model === 1) {
    filesDir.value = 'Qwen-7B';
    filesR.value = [
        { name: 'config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/main/config.json', status: 'pending' },
        { name: 'generation_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/main/generation_config.json', status: 'pending' },
        { name: 'tokenizer.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/main/tokenizer.json', status: 'pending' },
        { name: 'tokenizer_config.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/main/tokenizer_config.json', status: 'pending' },
        { name: 'model.safetensors.index.json', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/main/model.safetensors.index.json', status: 'pending' },
        { name: 'model-00001-of-000002.safetensors', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/main/model-00001-of-000002.safetensors', status: 'pending' },
        { name: 'model-00002-of-000002.safetensors', url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B/blob/main/model-00002-of-000002.safetensors', status: 'pending' }
    ];
}

// Send an ipc message to the main process to check the model
const validatingRes = electron.ipcRenderer.invoke('validate-model', { dir: filesDir.value, files: filesR.value.map(file => file.name) });

validatingRes.then(result => {
    for (let i = 0; i < result.length; i++) {
        filesR.value[i]['status'] = result[i];
    }
}).catch(error => {
    filesR.value.forEach(file => file.status = 'failed')
});
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
}

.item .status .indicator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    height: 0.7rem;
    width: 0.7rem;
    display: flex;
    position: relative;
    right: 0;
}

.item .status .indicator svg {
    height: 0.7rem;
    width: 0.7rem;
}
</style>
<template>
    <div class="overflow-auto">
        <div class="header">
            <span class="items">{{ language === 'en' ? 'ITEMS' : '项目' }}</span>
            <span class="status">{{ language === 'en' ? `STATUS` : `状态` }}</span>
        </div>
        <StatusItem title="GPU" :status="gpuStatus" :language="language"
            :checkText="language === 'en' ? 'Checking the GPU' : '检测GPU'" :successText="language === 'en' ? 'OK' : '通过'"
            :errorText="language === 'en' ? 'No available GPU detected' : '没有检测到可用的GPU'" />
        <StatusItem title="VRAM" :status="vramStatus" :language="language"
            :checkText="language === 'en' ? 'Checking VRAM capacity' : '检测显存容量'"
            :successText="language === 'en' ? 'OK' : '通过'"
            :errorText="language === 'en' ? `Requires at least ${vramR}MB of vram` : `需要至少${vramR}MB显存`" />
        <StatusItem title="CUDA" :status="cudaStatus" :language="language"
            :checkText="language === 'en' ? 'Checking CUDA dependency' : '检测CUDA环境依赖'"
            :successText="language === 'en' ? 'OK' : '通过'"
            :errorText="language === 'en' ? 'No available cuda detected' : '没有检测到可用的cuda'" />
        <StatusItem title="Docker" :status="dockerStatus" :language="language"
            :checkText="language === 'en' ? 'Checking Docker dependency' : '检测Docker环境依赖'"
            :successText="language === 'en' ? 'OK' : '通过'"
            :errorText="language === 'en' ? 'No available docker detected' : '没有检测到可用的docker'" />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '../stores/mainStore';
import StatusItem from './StatusItem.vue';

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

const vramR = ref(0);

const gpuStatus = ref(false);
const vramStatus = ref(false);
const cudaStatus = ref(false);
const dockerStatus = ref(false);

// Maximum available vram capacity
const maxVram = Math.max(...store.graphicsInfoList.map(gpu => gpu.vram));

// Vram capacity required for different models
if (model === 0) {
    vramR.value = 4096;
} else if (model === 1) {
    vramR.value = 15360;
}

if (store.graphicsInfoList) {
    gpuStatus.value = true;
}

if (maxVram >= vramR.value) {
    vramStatus.value = true;
}

if (store.cudaInfo) {
    cudaStatus.value = true;
}

if (store.dockerInfo) {
    dockerStatus.value = true;
}

if (gpuStatus.value && vramStatus.value && cudaStatus.value && dockerStatus.value) {
    emit('envs-ok');
}

</script>

<style scoped>
@import '../assets/environment.css';
</style>
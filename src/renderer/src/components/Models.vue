<template>
    <div class="overflow-auto">
        <div v-for="(model, index) in models" :key="index" class="item" @click="chooseModel(index)"
            :class="{ 'selected': chosenModel === index }">
            <div class="model">
                <span :style="{ color: model.status === 'available' ? 'black' : 'grey' }">{{ model.name }}</span>
            </div>
            <div class="status">
                <span :style="{ color: model.status === 'available' ? 'black' : 'grey' }">{{ language === 'en' ?
                    `status: ${model.status}` : `状态：${model.status_zh}` }}</span>
                <div class="indicator">
                    <svg t="1738376720183" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1497" width="200" height="200">
                        <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                            :fill="model.status === 'available' ? '#CCFF90' : '#ffcccc'" p-id="1498"></path>
                        <path d="M512 512m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
                            :fill="model.status === 'available' ? '#4CAF50' : '#d81e06'" p-id="1499"></path>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '../stores/mainStore';

const emit = defineEmits();

const store = useMainStore();
const language = computed(() => store.language);

const models = [
    { name: 'DeepSeek-R1-Distill-Qwen-1.5B', status: 'available',status_zh: '可用' },
    { name: 'DeepSeek-R1-Distill-Qwen-7B', status: 'available',status_zh: '可用' },
    { name: 'DeepSeek-R1-Distill-Llama-8B', status: 'testing',status_zh: '测试中' },
    { name: 'DeepSeek-R1-Distill-Qwen-14B', status: 'testing',status_zh: '测试中' },
    { name: 'DeepSeek-R1-Distill-Qwen-32B', status: 'testing',status_zh: '测试中' },
    { name: 'DeepSeek-R1-Distill-Llama-70B', status: 'testing',status_zh: '测试中' },
];

const chosenModel = ref(null);

const chooseModel = (index) => {
    if (models[index].status === 'available') {
        chosenModel.value = index;
        // Triggers an event to pass the selected model index to the parent component
        emit('model-chosen', chosenModel.value);
    }
};
</script>

<style scoped>
@import '../assets/models.css'
</style>
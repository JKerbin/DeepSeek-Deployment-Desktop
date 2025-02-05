src/renderer/src/components/StatusItem.vue
<template>
    <div class="item">
        <span class="title">{{ checkText }}</span>
        <div class="status">
            <div class="indicator">
                <svg t="1738376720183" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1497" width="200" height="200">
                    <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                        :fill="status ? '#CCFF90' : '#ffcccc'" p-id="1498">
                    </path>
                    <path d="M512 512m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z"
                        :fill="status ? '#4CAF50' : '#d81e06'" p-id="1499">
                    </path>
                </svg>
            </div>
            <span>{{ status ? successText : errorText }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    status: Boolean,
    language: String,
    checkText: String,
    successText: String,
    errorText: String
});
</script>

<style scoped>
@import '../assets/status-item.css';
</style>
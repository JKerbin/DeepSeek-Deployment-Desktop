<template>
    <div class="info">
        <div class="main-info">
            <span>{{ language === 'en' ? 'Instances' : '实例列表' }}</span>
            <button class="add-instance" @click="handleAddInstance">
                <svg t="1738312395673" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4740" width="200" height="200">
                    <path
                        d="M512.17594 1023.648121c-29.52585 0-58.347943-6.397801-58.347943-37.395145V564.030115H37.459123c-23.76783 0-37.459123-22.392303-37.459123-51.182406 0-26.614851 10.076536-51.790197 35.187904-51.790198h425.005904V43.888913c0-28.054356 20.888819-43.888913 51.854176-43.888913 28.790103 0 51.182406 12.795602 51.182406 37.395145v416.49683h430.156133c28.790103 0 30.261598 34.516135 30.261598 58.283965s-7.933273 51.182406-36.723376 51.182406H563.326357v422.926619c0.735747 24.40761-21.592578 37.363156-51.150417 37.363156z"
                        p-id="4741"></path>
                </svg>
            </button>
        </div>
        <div class="hint">
            <span>
                {{ language === 'en' ? 'List of deployed instances, click the plus sign to deploy a new\
                instance.' : '已经部署的实例列表，点击加号部署新的实例。' }}
            </span>
        </div>
    </div>
    <div class="instances">
        <div class="list-bottom"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '../stores/mainStore';
import { useRouter } from 'vue-router';

const store = useMainStore();
const language = computed(() => store.language);
const router = useRouter();

const handleAddInstance = () => {
    router.replace('/create');
};
</script>

<style scoped>
@import "../assets/manager.css";
</style>

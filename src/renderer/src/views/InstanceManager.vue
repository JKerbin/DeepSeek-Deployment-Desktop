<template>
    <div class="text">
        <span>{{ language === 'en' ? 'Instances' : '实例列表' }}</span>
        <button class="add-instance" @click="handleAddInstance">
            <svg t="1738312395673" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4740" width="200" height="200">
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
    <div class="instances-list">
        <div class="list-bottom"></div>
        <div class="test"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '../stores/mainStore';
const store = useMainStore();
const language = computed(() => store.language);

const handleAddInstance = () => {
    console.log('添加实例');
};
</script>

<style scoped>
.text {
    font-size: 1.8rem;
    position: absolute;
    top: 4%;
    width: 90%;
    height: 2rem;
    display: flex;
    align-items: center;
    color: var(--font-color);
    /* background-color: aquamarine; */
}

.add-instance {
    position: relative;
    margin-left: 1rem;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid var(--theme-color);
    background-color: white;
    z-index: 1000;
}

.add-instance:hover {
    background-color: var(--subdesk-color);
}

.add-instance svg {
    height: 1.2rem;
    width: 1.2rem;
    fill: var(--theme-color)
}

.hint {
    position: absolute;
    top: 11%;
    width: 90%;
    height: 2rem;
    display: flex;
    align-items: center;
    color: var(--font-color);

    @media (max-height: 549px) {
        display: none;
    }
}

.instances-list {
    position: absolute;
    bottom: 0;
    height: 80%;
    width: 100%;
    background-color: var(--subdesk-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.instances-list .list-bottom {
    position: absolute;
    bottom: 0;
    height: 20%;
    width: 100%;
    background: linear-gradient(to bottom, transparent, var(--desk-color));
}
</style>

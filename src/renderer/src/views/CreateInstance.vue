<template>
    <div class="info">
        <div class="main-info">
            <span v-if="steps === 1">{{ language === 'en' ? '1. Select model' : '1. 选择模型' }}</span>
            <span v-if="steps === 2">{{ language === 'en' ? '2. Check Environment' : '2. 检查环境' }}</span>
            <span v-if="steps === 3">{{ language === 'en' ? '3. Validate Model Files' : '3. 校验模型文件' }}</span>
            <span v-if="steps === 4">{{ language === 'en' ? '4. Configure Model' : '4. 配置模型' }}</span>
            <span v-if="steps === 5">{{ language === 'en' ? '5. Deploy Instance' : '5. 部署实例' }}</span>
            <button v-if="steps !== 5" class="next-step" @click="nextStep">
                <svg t="1738387586247" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4348" width="200" height="200">
                    <path
                        d="M511.362992 959.373097l-84.023672-84.009346 302.222229-299.651684L63.978638 575.712067 63.978638 447.771163l665.581887 0L427.338297 147.18827l84.023672-84.024695 448.058712 448.618461L511.362992 959.373097z"
                        p-id="4349"></path>
                </svg>
            </button>
            <button class="cancel" @click="cancel">
                <span>
                    {{ language === 'en' ? 'cancel' : '取消' }}</span>
            </button>
        </div>
        <div class="hint">
            <span v-if="steps === 1">
                {{ language === 'en' ? 'Choose the name of the model you wish to deploy from the list provided.' :
                    '从列表中选择需要部署的模型名称。' }}
            </span>
            <span v-if="steps === 2">
                {{ language === 'en' ? 'Verify whether the device possesses the nenvironment to execute the model.' :
                    '检查设备是否具备运行模型的必要环境。' }}
            </span>
            <span v-if="steps === 3">
                {{ language === 'en' ? 'Automatically download required files from the remote server to complete the\
                set.' : '检查模型文件完整性，自动从远端下载需要补全的文件。' }}
            </span>
            <span v-if="steps === 4">
                {{ language === 'en' ? 'Customize model-related parameters.' :
                    '自定义模型相关参数。' }}
            </span>
            <span v-if="steps === 5">
                {{ language === 'en' ? 'Deploy and initiate the service according to the selected configuration.' :
                    '按照所选的配置部署模型实例并启动服务。' }}
            </span>
        </div>
    </div>

    <div class="instances">
        <div class="progress-bar">
            <div class="overlay" :style="{ width: overlayWidth }"></div>
        </div>
        <Models v-if="steps === 1" />
        <div class="list-bottom"></div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '../stores/mainStore';
import { useRouter } from 'vue-router';
import Models from '../components/Models.vue';

const router = useRouter();
const store = useMainStore();
const language = computed(() => store.language);

const steps = ref(0);

setTimeout(() => {
    steps.value += 1;
}, 1);

const nextStep = () => {
    steps.value += 1;
};

const cancel = () => {
    router.replace('/');
};

const overlayWidth = computed(() => {
    switch (steps.value) {
        case 0:
            return '100%';
        case 1:
            return '80%';
        case 2:
            return '60%';
        case 3:
            return '40%';
        case 4:
            return '20%';
        case 5:
            return '0%';
        default:
            return '0%';
    }
});
</script>

<style scoped>
@import "../assets/creator.css";
</style>
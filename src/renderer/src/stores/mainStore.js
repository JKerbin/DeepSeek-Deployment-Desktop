import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => {
        const savedLanguage = localStorage.getItem('language'); // Get the language from local storage
        return {
            language: savedLanguage || 'en', // If there is no saved language, the default is English
            graphicsInfoList: undefined, // The GPU information list
            cudaInfo: undefined, // The cuda info
            instanceStatus: false, //Instance running status
        };
    },
    actions: {
        setLanguage(lang) { // Set language
            this.language = lang;
            localStorage.setItem('language', lang); // Save the language to local storage
        },
        setGraphicsInfo(graphicsInfo) {
            this.graphicsInfoList = graphicsInfo;
        },
        setCudaInfo(cudaInfo) {
            this.cudaInfo = cudaInfo;
        },
        setInstanceStatus(status) {
            this.instanceStatus = status;
        }
    },
});

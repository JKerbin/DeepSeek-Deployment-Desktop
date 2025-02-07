export const getGraphicsInfo = async () => {
    const si = require('systeminformation');
    try {
        const graphics = await si.graphics();
        const graphicsInfo = graphics.controllers.map((controller) => ({
            model: controller.model,
            vram: controller.vram,
        }));
        // Returns a JSON list of graphics card information
        return graphicsInfo;
    } catch (error) {
        console.error('Error fetching graphics information:', error);
        return undefined;
    }
}

export const getCudaInfo = async () => {
    const { exec } = require('child_process');
    return new Promise((resolve, _reject) => {
        exec('nvidia-smi', (error, stdout, stderr) => {
            if (error || stderr) {
                console.error('Error executing nvidia-smi:', error);
                return resolve(undefined); // undefined
            }
            const lines = stdout.trim().split('\n');
            const cudaLine = lines.find(line => line.includes('CUDA Version:')); // Find the row that contains the CUDA version
            const cudaVersion = cudaLine ? cudaLine.split('CUDA Version:')[1].trim().match(/^\d+(\.\d+)?/)?.[0] : undefined; // Extract the CUDA version
            resolve(cudaVersion);
        });
    });
}

export const getDockerInfo = async () => {
    const { exec } = require('child_process');
    return new Promise((resolve, _reject) => {
        exec('docker --version', (error, stdout, stderr) => {
            if (error || stderr) {
                console.error('Error executing docker --version:', error);
                return resolve(undefined); // undefined
            }
            const lines = stdout.trim().split('\n');
            const dockerLine = lines.find(line => line.includes('Docker version'));
            const dockerVersion = dockerLine ? dockerLine.split('Docker version')[1].trim().split(',')[0] : undefined;
            resolve(dockerVersion);
        });
    });
}
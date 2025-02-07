import fs from 'fs';
import { join } from 'path';
import https from 'https';
import { ClientRequest } from 'http';

// Stores all request objects
const activeRequests = new Map<string, ClientRequest>();
// Store all file streams
const activeFileStreams = new Map<string, fs.WriteStream>();

export const validateModel = (dir: string, files: string[]) => {
    let filesStatus: string[] = [];
    const filesPath = join('./models', dir);
    if (!fs.existsSync(filesPath)) {
        try {
            fs.mkdirSync(filesPath, { recursive: true });
        } catch (error) {
            for (const _ of files) {
                filesStatus.push('failed');
            }
            return filesStatus;
        }
    }
    for (const file of files) {
        const filePath = join(filesPath, file);
        if (fs.existsSync(filePath)) {
            filesStatus.push('completed');
        } else {
            filesStatus.push('downloading');
        }
    }
    return filesStatus;
}

export const downloadFile = (dir: string, name: string, url: string, windowInstance: any) => {
    const downloadPath = join('./models', dir, name);
    const fileStream = fs.createWriteStream(downloadPath);
    activeFileStreams.set(name, fileStream);

    const download = (downloadUrl: string) => {
        const req = https.get(downloadUrl, (response) => {
            if (response.statusCode === 302) {
                const redirectUrl = response.headers['location'];
                if (!redirectUrl) {
                    handleDownloadFailure(name, downloadPath, windowInstance);
                    return;
                }
                download(redirectUrl); // Recursive calls handle redirects
                return;
            }

            if (response.statusCode !== 200) {
                handleDownloadFailure(name, downloadPath, windowInstance);
                return;
            }

            const totalLength = parseInt(response.headers['content-length'] || '0', 10);
            let downloadedLength = 0;

            response.on('data', (chunk) => {
                downloadedLength += chunk.length;
                const progress = totalLength > 0 ? (downloadedLength / totalLength) * 100 : 0;
                windowInstance.webContents.send('download-progress', { name, progress });
            });

            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                activeFileStreams.delete(name);
                activeRequests.delete(name);
                windowInstance.webContents.send('download-complete', { name });
            });
        }).on('error', (_error) => {
            handleDownloadFailure(name, downloadPath, windowInstance);
        });

        // Save request object
        activeRequests.set(name, req);
    };

    download(url);
}

// Handle functions that fail to download
const handleDownloadFailure = (name: string, downloadPath: string, windowInstance: any) => {
    const request = activeRequests.get(name);
    if (request) {
        request.destroy();
        activeRequests.delete(name);
    }
    const fileStream = activeFileStreams.get(name);
    if (fileStream) {
        fileStream.end(); // End write
        fileStream.destroy(); // Destroy file stream
        activeFileStreams.delete(name);
    }
    if (fs.existsSync(downloadPath)) {
        fs.unlinkSync(downloadPath);
    }
    windowInstance.webContents.send('download-fail', { name });
}

// Undownload and delete the file function
export const cancelDownload = (dir: string, name: string) => {
    const request = activeRequests.get(name);
    if (request) {
        request.destroy();
        activeRequests.delete(name);
    }
    const fileStream = activeFileStreams.get(name);
    if (fileStream) {
        fileStream.end(); // End write
        fileStream.destroy(); // Destroy file stream
        activeFileStreams.delete(name);
    }
    const downloadPath = join('./models', dir, name);
    if (fs.existsSync(downloadPath)) {
        fs.unlinkSync(downloadPath);
    }
}
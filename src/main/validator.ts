import fs from 'fs';
import { join } from 'path';
import https from 'https';

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

    const download = (downloadUrl: string) => {
        https.get(downloadUrl, (response) => {
            if (response.statusCode === 302) {
                const redirectUrl = response.headers['location'];
                if (!redirectUrl) {
                    windowInstance.webContents.send('download-fail', { name });
                    return;
                }
                download(redirectUrl); // Recursive calls handle redirects
                return;
            }

            if (response.statusCode !== 200) {
                windowInstance.webContents.send('download-fail', { name });
                fileStream.close();
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
                windowInstance.webContents.send('download-complete', { name });
            });
        }).on('error', (_error) => {
            fs.unlink(downloadPath, () => { });
            windowInstance.webContents.send('download-fail', { name });
        });
    };

    download(url);
}
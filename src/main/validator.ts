import fs from 'fs';

export const validateModel = (dir: string, files: string[]) => {
    let filesStatus: string[] = [];
    const filesPath = `./models/${dir}`;
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
        const filePath = `${filesPath}/${file}`;
        if (fs.existsSync(filePath)) {
            filesStatus.push('exists');
        } else {
            filesStatus.push('downloading');
        }
    }
    return filesStatus;
}
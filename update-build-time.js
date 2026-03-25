import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');

// 현재 시간을 한국 표준시(KST) 문자열로 포맷팅
const now = new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
});

try {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    // 1. 버전 올리기 (1.0.0 -> 1.0.1)
    const versionParts = pkg.version.split('.');
    versionParts[2] = parseInt(versionParts[2]) + 1;
    pkg.version = versionParts.join('.');
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));


    let content = fs.readFileSync(envPath, 'utf8');

    // VITE_LAST_BUILD_TIME 항목을 찾아 현재 시간으로 교체 (없으면 새로 생성)
    if (content.includes('VITE_LAST_BUILD_TIME=')) {
        content = content.replace(/VITE_LAST_BUILD_TIME=.*/, `VITE_LAST_BUILD_TIME=${now}`);
    } else {
        content += `\nVITE_LAST_BUILD_TIME=${now}`;
    }

    fs.writeFileSync(envPath, content, 'utf8');
    console.log(`✅ Build time updated: ${now}`);
} catch (err) {
    console.error('❌ Failed to update .env file:', err);
}
### setting
- 깃허브계정명.github.io 형태의 저장소를 만든다

```
ssh-keygen -t ed25519 -C "koreactwo.google.com" -f ~/.ssh/koreactwo_key
cat ~/.ssh/koreactwo_key.pub
```
- settigs에 SSH 퍼블릭키를 등록한다
- 저장소를 vscode와 연동시킨다 (git clone)

```
cat <<EOF >> ~/.ssh/config

# 특정 프로젝트 전용 설정
Host koreactwo # 별칭
  HostName github.com # 실제 주소
  User git
  IdentityFile ~/.ssh/koreactwo_key # 별칭에 적용할 키
  IdentitiesOnly yes  # 이 줄이 핵심입니다. 에이전트의 다른 키를 무시합니다.
EOF
```
- ssh config 설정 : 별칭을 넣어서 저장소 별로 키를 지정한다

```
git remote set-url origin git@koreactwo:koreactwo/koreactwo.github.io.git

git config --list --local

# 주소를 별칭으로해야 지정된 키를 사용한다
ssh -T git@koreactwo
```

### react 설정
- 
```
docker run -it --rm -v $(pwd):/app -w /app -p 5173:5173 node:lts bash
```
- 컨테이너 attach 
- 이후
```
npm create vite@latest .
npm create vite@latest . -- --template react-ts
npm install
npm run dev

```
- 만약 페이지가 안열리면 package.json 파일에서 스크립트 부분을 아래처럼 수정한다 . 
```
"scripts": {
    "dev": "vite --host 0.0.0.0", 
}
```


### 배포 및 Pages 연동
- vite.config.ts 에서 build 객체 추가 , 아웃풋을 docs로 지정
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    // 빌드 결과물이 생성될 디렉터리 지정
    outDir: 'docs',
    // 기존 docs 디렉터리가 있다면 삭제 후 재생성 (기본값 true)
    emptyOutDir: true,
  },
})
```
- npm run build
- ![alt text](image-1.png)
- 깃허브 Pages Root 변경 / -> /docs 그리고 save 버튼 클릭 
- 강력 새로고침: 나중에 또 안 바뀐다 싶으면 Ctrl + Shift + R


### css 모듈 추가
- Tailwind CSS and daisyUI (Vite + React + ts)
```
# 모듈 설치 -D 옵션으로 package.json의 devDependencies에 추가
npm install -D tailwindcss@latest @tailwindcss/vite@latest daisyui@latest

```
- vite.config.ts 수정
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 추가

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() //추가
  ],
})

```

- src/index.css 수정
```
# 최상단에
@import "tailwindcss"; //추가
@plugin "daisyui"; //추가
```

- vscode 확장앱 설치 Tailwind CSS IntelliSense
```
# 테스트 코드 (클래스에 btn)
<button className='btn'>button</button>
```

### daisyUI 테마 지정하기
- index.css
```
@plugin "daisyui" {
   themes: light --default, dark --prefersdark, cupcake;
}
```

- index.html 수정
```
<html data-theme="cupcake">
</html>

```


### pages actions 로 자동 배포하기
- .github/workflows/delpoy.yml 파일 생성
```
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"] # 메인 브랜치에 푸시될 때 실행

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # 빌드 결과물이 생성되는 폴더명 (Vite는 dist, CRA는 build)
          path: './docs'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```
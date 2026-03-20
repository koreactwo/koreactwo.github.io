# Bun 
- 자바스크립트 엔진 및 개발 도구, TS 지원
- 공식 설치 스크립트
```
curl -fsSL https://bun.sh/install | bash
```
- docker 이미지 다운로드
```
docker pull oven/bun:latest
```

- bun 컨테이너 실행
```
docker run -it --rm -v $(pwd):/app -w /app -p 5173:5173 oven/bun:latest bash
```
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
docker run -it --rm --name bun_hono --user "1000:1000" -v $(pwd):/app -w /app -p 5173:5173 -p 3000:3000 oven/bun:latest bash
```

- compose 실행
```
docker compose up -d
docker compose exec app bash
# 기타 명령줄
docker compose up
docker compose restart
docker compose ps
docker compose logs -f
docker compose down
```


# Hono
- https://hono.dev/docs/getting-started/basic
- bun 컨테이너 안에서 실행
```
bun create hono@latest api_server
```
# React + TypeScript + Vite

## [github pages static web site (ctrl + click)](https://koreactwo.github.io)
<!-- <a href="https://koreactwo.github.io" target="_blank">github pages static web site</a> -->
<!-- 빌드과정에서 태그 속성이 없어지나보네.  -->

## bun dev 컨테이너에서 
```
bun install
bun dir_tree.ts
bun run dev
```

- 컨테이너 연결
```
docker compose up -d
docker compose exec frontend bash

docker run -it --rm -v $(pwd):/app -w /app -p 5173:5173 node:lts bash
```

## TODO LIST
- ~~react-markdown 모듈 적용하여 md 파일 컨버터~~
- ~~레이아웃 구성 및 메뉴 기능~~
  - 바텀 광고
  - ~~컨텐츠만 스크롤~~
  - ~~상단 네비 고정~~
- ~~md 문서 폴더 메뉴 구성파일 스크립트 제작~~
- 프로필 페이지 만들기
  - ~~그냥 좋아요 카운트 누적~~
  - ~~supabase 연결~~
- vite-plugin-pwa 모듈적용하기 (앱이 무거워지면)


```

# 윈도우 폴더 연결, 마운트 방식
sudo apt update && sudo apt install cifs-utils -y
sudo mkdir -p /mnt/win
sudo mount -t cifs //192.168.0.15/samba /mnt/win -o user=Everyone,password=,uid=$(id -u),gid=$(id -g),iocharset=utf8
df -h
cp -r ~/source/koreactwo.github.io/docs /mnt/win/
sudo umount /mnt/win
```


## git remote 추가
```
git remote set-url --add --push origin ssh://root@192.168.0.15:6022/var/git/koreactwo.git
git remote set-url --add --push origin git@github.com:koreactwo/koreactwo.github.io.git
git remote -v

# config 파일에 아래처럼 pushurl 이 생긴다
[remote "origin"]
	url = git@github.com:koreactwo/koreactwo.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
	pushurl = ssh://root@localhost:6022/var/git/koreactwo.git
	pushurl = git@github.com:koreactwo/koreactwo.github.io.git
```
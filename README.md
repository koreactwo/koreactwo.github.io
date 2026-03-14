# React + TypeScript + Vite

## [github pages static web site (ctrl + click)](https://koreactwo.github.io)
<!-- <a href="https://koreactwo.github.io" target="_blank">github pages static web site</a> -->
<!-- 빌드과정에서 태그 속성이 없어지나보네.  -->

```
# 컨테이너 연결
docker run -it --rm -v $(pwd):/app -w /app -p 5173:5173 node:lts bash

```

## TODO LIST
- react-markdown 모듈 적용하여 md 파일 컨버터
- 레이아웃 구성 및 메뉴 기능
- md 문서 폴더 메뉴 구성파일 스크립트 제작
- 프로필 페이지 만들기
  - 좋아요 기능, 누르면 ip 저장, ip 카운트
  - supabase 연결
  - 길게 누르면 ip 삭제, ip 카운트


```

# 윈도우 폴더 연결, 마운트 방식
sudo apt update && sudo apt install cifs-utils -y
sudo mkdir -p /mnt/win
sudo mount -t cifs //192.168.0.15/samba /mnt/win -o user=Everyone,password=,uid=$(id -u),gid=$(id -g),iocharset=utf8
df -h
cp -r ~/source/koreactwo.github.io/docs /mnt/win/
sudo umount /mnt/win
```
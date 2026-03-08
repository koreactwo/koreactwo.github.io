### setting
- 깃허브계정명.github.io 형태의 저장소를 만든다

```
ssh-keygen -t ed25519 -C "koreactwo.google.com" -f ~/.ssh/koreactwo_key
cat ~/.ssh/koreactwo_key.pub
```
- settigs에 SSH 퍼블릭키를 등록한다
- 저장소를 vscode와 연동시킨다

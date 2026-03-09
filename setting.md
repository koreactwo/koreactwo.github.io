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

ssh -T git@koreactwo
```

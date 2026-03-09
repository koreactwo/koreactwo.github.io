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
Host github-koreactwo
  HostName github.com
  User git
  IdentityFile ~/.ssh/koreactwo_key
EOF
```
- ssh config 설정 : 별칭을 넣어서 저장소 별로 키를 지정한다

```
git remote set-url origin git@github-koreactwo:koreactwo/koreactwo.git

git config --list

ssh -T git@github.com

# 현재 설정된 주소 확인
git remote -v

# SSH 주소로 강제 변경 (별칭을 사용하지 않는 경우)
git remote set-url origin git@github.com:koreactwo/koreactwo.github.io.git
```

```
git config --local user.name "koreactwo"
git config --local user.email "koreactwo@gmail.com"
```

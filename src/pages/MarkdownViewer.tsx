

// bun install react-markdown remark-gfm
// bun add -d @tailwindcss/typography

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';

// 1. 모든 .md 파일을 eager(즉시) 로드하거나 파일 경로만 가져옵니다.
// 'as: "raw"'를 쓰면 파일 내용을 문자열로 바로 가져올 수 있어 편리합니다.
// const markdownFiles = import.meta.glob('/src/assets/docs/*.md', {
//   query: '?raw',
//   import: 'default',
//   eager: true
// });


const MarkdownViewer = () => {
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<{ name: string; path: string }[]>([
    { name: 'bun_hono', path: '/docs/bun_hono.md'}
  ]);

  useEffect(() => {
    setFileList([
      { name: 'bun_hono', path: '/docs/bun_hono.md' },
      { name: 'react_hooks', path: '/docs/react_hooks.md' },
    ]);
  },[]);
  // useEffect(() => {
  //   // 2. 파일 경로 객체를 배열로 변환
  //   const list = Object.keys(markdownFiles).map((path) => {
  //     // 경로에서 파일명만 추출 (예: /src/assets/docs/guide.md -> guide)
  //     const fileName = path.split('/').pop()?.replace('.md', '') || 'Untitled';
  //     console.log(fileName, path);
  //     return {
  //       name: fileName,
  //       path: path
  //     };
  //   });
  //   setFileList(list);

  //   if (fileList.length === 0) return;



  // }, []);

  const handleFileClick = (path: string) => {
    fetch(path)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }


  return (
    <>
      <SidebarLayout fileList={fileList} onSelect={handleFileClick}>
        <div className="prose max-w-none overflow-y-auto">

          {/* <div>
        <ul>
          {fileList.map((file) => (
            <li key={file.path}>
              <button className='btn btn-ghost rounded-full' onClick={() => handleFileClick(file.path)}>{file.name}</button>
            </li>
          ))}
        </ul>
      </div> */}

          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </SidebarLayout>
    </>
  );
};

export default MarkdownViewer;


const SidebarLayout = ({ children, fileList, onSelect }: any) => {

  return (
    <div className="drawer  relative "> {/* lg:drawer-open 추가 시 데스크탑에선 상시 노출 */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* 1. 메인 콘텐츠 영역 */}
      <div className="drawer-content flex flex-col p-8">
        {/* 모바일용 열기 버튼 (데스크탑에선 lg:hidden으로 숨김) */}
        <label htmlFor="my-drawer" className="btn btn-primary   drawer-button  mb-4">
          문서 목록 보기
        </label>

        {children} {/* 여기에 ReactMarkdown 컴포넌트가 들어감 */}
      </div>

      {/* 2. 사이드바 영역 */}
      <div className={`drawer-side absolute `}>
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className={`menu p-4 w-60 bg-primary-content text-base-content 
                 h-screen overflow-y-auto flex-nowrap `}>

          <li className="menu-title text-lg">Documents</li>
          {fileList.map((file: any) => (
            <li key={file.path}>
              <button onClick={() => {
                onSelect(file.path);
                // 사이드바를 닫기 위해 체크박스 ID를 찾아 체크 해제
                const drawer = document.getElementById('my-drawer') as HTMLInputElement;
                if (drawer) drawer.checked = false;
              }}>
                {file.name}
              </button>
            </li>
          ))}
          {/* <ul>
            {Array.from({ length: 500 }, (_, i) => (
              <li key={i}>{i}</li>
            ))}
          </ul> */}

        </ul>
      </div>
    </div>
  );
};
import fs from "fs"; // bun install -D @types/node
import path from "path"; 

interface FileNode {
  name: string;
  extension?: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileNode[];
}

const getDirectoryTree = (dirPath: string, basePath: string = ''): FileNode[] => {
  const files = fs.readdirSync(dirPath);

  return files.map((file) => {
    const fullPath = path.join(dirPath, file);
    const relativePath = path.join(basePath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      return {
        name: file,
        type: 'directory',
        path: relativePath,
        children: getDirectoryTree(fullPath, relativePath),
      };
    }

    return {
      name: path.basename(file, path.extname(file)),
      extension: path.extname(file),
      type: 'file',
      path: relativePath,
    };
  });
};

// 설정: public 폴더 경로 및 결과물 저장 경로
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const OUTPUT_FILE = path.resolve(process.cwd(), 'public/dir_tree.json');

try {
  const tree = getDirectoryTree(PUBLIC_DIR);
//   const fileContent = `export const dirTree = ${JSON.stringify(tree, null, 2)};`;

//   fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tree, null, 2), 'utf8');
  console.log('✅ Asset map generated successfully at:', OUTPUT_FILE);
} catch (error) {
  console.error('❌ Error generating asset map:', error);
}
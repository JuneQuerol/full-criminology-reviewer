
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

function getModuleFiles(dir: string, fileList: string[] = [], rootDir?: string) {
  const root = rootDir || dir;
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getModuleFiles(filePath, fileList, root);
    } else if (file.endsWith('.md')) {
      fileList.push(path.relative(root, filePath));
    }
  });
  return fileList;
}

export function getModuleList() {
    const filePaths = getModuleFiles(contentDirectory);
    const allModulesData = filePaths
    .filter((filePath) => path.basename(filePath).startsWith('Module-'))
    .map((filePath) => {
      const id = path.basename(filePath).replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, filePath);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const pathParts = filePath.split(path.sep);
      
      let part;
      if (pathParts.length > 1) {
          part = pathParts[0].toLowerCase();
           if(!isNaN(parseInt(part.split('-')[1]))) {
            part = `part-${part.split('-')[1]}`
          }
      } else {
        const match = id.match(/^Module-(\d+)\./);
        part = match ? `part-${match[1]}` : '1';
      }

      let title = matterResult.data.title;
      if (!title) {
        const headingMatch = matterResult.content.match(/^#\s+(.+)$/m);
        title = headingMatch ? headingMatch[1] : id;
      }

      return {
        id,
        part,
        slug: id,
        title,
        description: matterResult.data.description || '',
      };
    });
  return allModulesData;
}

export async function getModuleContent(part: string, slug: string) {
    const partDirs: Record<string, string[]> = {
        'part-1': [''],
        'part-2': [''],
        'part-3': [''],
        'part-4': [''],
        'part-5': [''],
        'lea': ['LEA'],
        'criminalistics': ['Criminalistics'],
        'cdi': ['CDI'],
        'sce': ['SCE'],
        'ca': ['CA']
    }

    const possibleDirs = partDirs[part.toLowerCase()] || [part];

    for (const dir of possibleDirs) {
        const fullPath = path.join(contentDirectory, dir, `${slug}.md`);
        if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);
            let title = matterResult.data.title;
            let content = matterResult.content;

            if (!title) {
                const headingMatch = content.match(/^#\s+(.+)$/m);
                title = headingMatch ? headingMatch[1] : slug;
                if (headingMatch) {
                    content = content.replace(/^#\s+.+$/m, '').trim();
                }
            }

            const processedContent = await remark().use(gfm).use(html).process(content);
            const contentHtml = processedContent.toString();

            return {
                id: slug,
                contentHtml,
                title,
                description: matterResult.data.description || '',
            };
        }
    }

    return null;
}

export function getAllModuleIds(part: string) {
    const list = getModuleList();
    return list
        .filter(m => m.part.toLowerCase() === part.toLowerCase())
        .map(m => ({ params: { slug: m.slug } }));
}


export function getSortedModulesData(part: string) {
    const modules = getModuleList().filter(m => m.part.toLowerCase() === part.toLowerCase());
    return modules.sort((a, b) => {
        const aMatch = a.id.match(/Module-(\d+)\.(\d+)/);
        const bMatch = b.id.match(/Module-(\d+)\.(\d+)/);
        if (aMatch && bMatch) {
            const aPart = parseInt(aMatch[1]);
            const bPart = parseInt(bMatch[1]);
            if (aPart !== bPart) return aPart - bPart;
            return parseInt(aMatch[2]) - parseInt(bMatch[2]);
        }
        return a.id.localeCompare(b.id);
    });
}

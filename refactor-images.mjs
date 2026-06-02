import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";

const files = walk('./src');
let changedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    const regex = /import\s+([A-Za-z0-9_]+)\s+from\s+['"].*?IMAGENES_LISTAS.*?['"];?/g;
    
    if (regex.test(content)) {
        const newContent = content.replace(regex, `const $1 = "${placeholderSvg}";`);
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Updated ${file}`);
        changedCount++;
    }
}

console.log(`Refactored ${changedCount} files.`);

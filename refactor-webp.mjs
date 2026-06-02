import fs from 'fs';
import path from 'path';

const imgDir = 'src/assets/images/IMAGENES_LISTAS';
const srcDir = 'src';

const files = fs.readdirSync(imgDir);
const webpFiles = files.filter(f => f.endsWith('.webp'));

const conversions = [];

for (const webpFile of webpFiles) {
    const base = path.basename(webpFile, '.webp');
    
    const pngPath = path.join(imgDir, base + '.png');
    if (fs.existsSync(pngPath)) {
        fs.unlinkSync(pngPath);
        console.log(`Deleted duplicate: ${pngPath}`);
    }
    const jpgPath = path.join(imgDir, base + '.jpg');
    if (fs.existsSync(jpgPath)) {
        fs.unlinkSync(jpgPath);
        console.log(`Deleted duplicate: ${jpgPath}`);
    }
    
    conversions.push(base);
}

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

const sourceFiles = walk(srcDir);
let changedCount = 0;

for (const file of sourceFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let changed = false;
    
    for (const base of conversions) {
        // Escape special chars in base if any
        const safeBase = base.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(IMAGENES_LISTAS\/${safeBase})\.(png|jpg|jpeg)`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `$1.webp`);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Updated imports in ${file}`);
        changedCount++;
    }
}

console.log(`Refactored ${changedCount} source files to use .webp.`);

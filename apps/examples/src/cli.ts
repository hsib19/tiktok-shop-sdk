import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.join(__dirname);

function getAllModules(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files: string[] = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(getAllModules(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
            files.push(path.relative(srcPath, fullPath));
        }
    }

    return files;
}
export async function main() {
    const files = getAllModules(srcPath);
    if (files.length === 0) {
        console.log('No module files found in src!');
        return;
    }

    const { module: selectedModule } = await inquirer.prompt([
        {
            type: 'list',
            name: 'module',
            message: 'Select a module to run:',
            choices: files,
        },
    ]);

    console.log(`\nRunning module: ${selectedModule}\n`);

    const modulePath = pathToFileURL(path.join(srcPath, selectedModule)).href;

    const mod = await import(modulePath);

    if (typeof mod.main === 'function') {
        await mod.main();
    } else {
        console.log('No main() function exported in this module.');
    }
}

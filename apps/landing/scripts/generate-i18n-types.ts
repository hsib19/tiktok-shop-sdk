import fs from 'fs';
import path from 'path';

const LOCALES_ROOT = path.join(process.cwd(), 'public/locales');
const OUTPUT_DIR = path.join(process.cwd(), 'types');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'i18n-generated.ts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Flatten nested JSON keys into dot notation (e.g. "cta.getStarted")
function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.keys(obj).flatMap((key) => {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return flattenKeys(value as Record<string, unknown>, fullKey);
    }
    return fullKey;
  });
}

function generateTypes() {
  // Read all locale folders (e.g. en, id, fr)
  const locales = fs
    .readdirSync(LOCALES_ROOT)
    .filter((f) => fs.statSync(path.join(LOCALES_ROOT, f)).isDirectory());

  let namespaceUnion = '';
  let typeDefs = '';

  // Collect keys per namespace across all locales
  const namespaceKeys: Record<string, Set<string>> = {};

  locales.forEach((locale) => {
    const localeDir = path.join(LOCALES_ROOT, locale);
    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));

    files.forEach((file) => {
      const namespace = path.basename(file, '.json');
      const json = JSON.parse(
        fs.readFileSync(path.join(localeDir, file), 'utf-8'),
      ) as Record<string, unknown>;
      const keys = flattenKeys(json);

      if (!namespaceKeys[namespace]) {
        namespaceKeys[namespace] = new Set();
      }
      keys.forEach((k) => namespaceKeys[namespace].add(k));
    });
  });

  // Generate union types for each namespace
  Object.entries(namespaceKeys).forEach(([namespace, keys]) => {
    namespaceUnion += `  | '${namespace}'\n`;
    typeDefs += `export type ${capitalize(namespace)}Keys = ${Array.from(keys)
      .map((k) => `'${k}'`)
      .join(' | ')};\n`;
  });

  // Final output file content
  const output = `// AUTO-GENERATED FILE — DO NOT EDIT
// This file is generated from JSON translation files in public/locales
// It contains union types for namespaces and keys across all locales

export type I18nNamespaces =
${namespaceUnion.trim()};

${typeDefs}
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Generated types at ${OUTPUT_FILE}`);
}

// Capitalize namespace name for type alias (e.g. hero -> HeroKeys)
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

generateTypes();

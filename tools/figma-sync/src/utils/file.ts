import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { dirname } from "path";

/**
 * Generate auto-generated file header
 */
export function generateHeader(): string {
  return `/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Source: Figma Design System
 * Generated: ${new Date().toISOString()}
 */`;
}

const AUTO_GENERATED_HEADER = generateHeader() + "\n\n";
const AUTO_GENERATED_CSS_HEADER = generateHeader() + "\n\n";

/**
 * Write a TypeScript file with auto-generated header
 */
export function writeGeneratedTS(filePath: string, content: string): void {
  ensureDir(filePath);
  writeFileSync(filePath, AUTO_GENERATED_HEADER + content, "utf-8");
  console.log(`  ✓ Generated: ${filePath}`);
}

/**
 * Write a CSS file with auto-generated header
 */
export function writeGeneratedCSS(filePath: string, content: string): void {
  ensureDir(filePath);
  writeFileSync(filePath, AUTO_GENERATED_CSS_HEADER + content, "utf-8");
  console.log(`  ✓ Generated: ${filePath}`);
}

/**
 * Write a SCSS file (content includes header from generator)
 */
export function writeGeneratedSCSS(filePath: string, content: string): void {
  ensureDir(filePath);
  writeFileSync(filePath, content, "utf-8");
  console.log(`  ✓ Generated: ${filePath}`);
}

/**
 * Write a JSON file
 */
export function writeJSON(filePath: string, data: unknown): void {
  ensureDir(filePath);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`  ✓ Generated: ${filePath}`);
}

/**
 * Read a JSON file
 */
export function readJSON<T>(filePath: string): T | null {
  if (!existsSync(filePath)) {
    return null;
  }
  try {
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

/**
 * Ensure directory exists
 */
function ensureDir(filePath: string): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

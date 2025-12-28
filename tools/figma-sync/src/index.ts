#!/usr/bin/env node

import 'dotenv/config';
import { resolve } from 'path';
import { createFigmaClient } from './api/client.js';
import { loadConfig } from './config.js';
import { parseVariables } from './parsers/variables.parser.js';
import { parseTypography } from './parsers/typography.parser.js';
import { parseIcons, getIconNodeIds } from './parsers/icons.parser.js';
import { generateTokensSCSS, generateTokensIndexSCSS, generateTypographySCSS } from './generators/scss.generator.js';
import { generateTokensTS, generateTypographyTS } from './generators/typescript.generator.js';
import { generateReactIcon, generateIconsIndex } from './generators/react-icon.generator.js';
import { writeGeneratedSCSS, writeGeneratedTS, writeJSON, readJSON } from './utils/file.js';
import { generateHash, hasChanged } from './utils/hash.js';

interface SyncMetadata {
  lastSync: string;
  figmaFileKey: string;
  hash: string;
  version: string;
}

async function main() {
  console.log('🎨 Figma Design System Sync\n');

  const rootDir = process.cwd();
  const config = loadConfig(rootDir);

  if (!config.figmaFileKey || config.figmaFileKey === 'YOUR_FIGMA_FILE_KEY') {
    console.error('❌ Error: Please set figmaFileKey in figma.config.json');
    console.log('   Get your file key from the Figma URL: figma.com/file/[FILE_KEY]/...');
    process.exit(1);
  }

  const client = createFigmaClient();

  // Sync Variables (Design Tokens)
  if (config.sync.variables) {
    console.log('📦 Syncing design tokens...');

    try {
      const variablesResponse = await client.getVariables(config.figmaFileKey);
      const collections = parseVariables(variablesResponse);

      if (collections.length === 0) {
        console.log('   ⚠️ No variables found in Figma file');
      } else {
        const tokensDir = resolve(rootDir, config.packages.tokens);
        const metadataPath = resolve(tokensDir, '.sync-metadata.json');
        const existingMetadata = readJSON<SyncMetadata>(metadataPath);
        const newHash = generateHash(collections);

        if (existingMetadata && !hasChanged(existingMetadata.hash, newHash)) {
          console.log('   ✓ No changes detected, skipping');
        } else {
          // Generate SCSS partials for each collection
          for (const collection of collections) {
            const fileName = `_${collection.name.toLowerCase().replace(/\s+/g, '-')}.scss`;
            const scss = generateTokensSCSS(collection);
            writeGeneratedSCSS(resolve(tokensDir, fileName), scss);
          }

          // Generate SCSS index file
          const indexSCSS = generateTokensIndexSCSS(collections);
          writeGeneratedSCSS(resolve(tokensDir, 'index.scss'), indexSCSS);

          // Generate TypeScript
          const ts = generateTokensTS(collections);
          writeGeneratedTS(resolve(tokensDir, 'tokens.ts'), ts);

          // Update metadata
          const metadata: SyncMetadata = {
            lastSync: new Date().toISOString(),
            figmaFileKey: config.figmaFileKey,
            hash: newHash,
            version: '1.0.0',
          };
          writeJSON(metadataPath, metadata);

          console.log(`   ✓ Generated ${collections.length} token collections`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Error syncing tokens: ${error}`);
    }
  }

  // Sync Typography
  if (config.sync.typography) {
    console.log('\n📝 Syncing typography...');

    try {
      const file = await client.getFile(config.figmaFileKey);
      const typography = parseTypography(file);

      if (typography.length === 0) {
        console.log('   ⚠️ No text styles found in Figma file');
      } else {
        const typographyDir = resolve(rootDir, config.packages.typography);
        const metadataPath = resolve(typographyDir, '.sync-metadata.json');
        const existingMetadata = readJSON<SyncMetadata>(metadataPath);
        const newHash = generateHash(typography);

        if (existingMetadata && !hasChanged(existingMetadata.hash, newHash)) {
          console.log('   ✓ No changes detected, skipping');
        } else {
          // Generate SCSS
          const scss = generateTypographySCSS(typography);
          writeGeneratedSCSS(resolve(typographyDir, 'fonts.scss'), scss);

          // Generate TypeScript
          const ts = generateTypographyTS(typography);
          writeGeneratedTS(resolve(typographyDir, 'fonts.ts'), ts);

          // Update metadata
          const metadata: SyncMetadata = {
            lastSync: new Date().toISOString(),
            figmaFileKey: config.figmaFileKey,
            hash: newHash,
            version: '1.0.0',
          };
          writeJSON(metadataPath, metadata);

          console.log(`   ✓ Generated ${typography.length} typography presets`);
        }
      }
    } catch (error) {
      console.error(`   ❌ Error syncing typography: ${error}`);
    }
  }

  // Sync Icons
  if (config.sync.icons) {
    console.log('\n🎯 Syncing icons...');

    try {
      const file = await client.getFile(config.figmaFileKey);
      const icons = parseIcons(file, config.icons.componentPrefix);

      if (icons.length === 0) {
        console.log(`   ⚠️ No icons found with prefix "${config.icons.componentPrefix}"`);
      } else {
        const iconsDir = resolve(rootDir, config.packages.icons);

        // Fetch SVG images
        const nodeIds = getIconNodeIds(icons);
        const imagesResponse = await client.getImages(config.figmaFileKey, nodeIds, { format: 'svg' });

        // Generate React components
        for (const icon of icons) {
          const svgUrl = imagesResponse.images[icon.id];
          if (svgUrl) {
            const svgResponse = await fetch(svgUrl);
            const svgContent = await svgResponse.text();
            const component = generateReactIcon(icon, svgContent);
            writeGeneratedTS(resolve(iconsDir, `${icon.componentName}.tsx`), component);
          }
        }

        // Generate index file
        const indexContent = generateIconsIndex(icons);
        writeGeneratedTS(resolve(iconsDir, 'index.ts'), indexContent);

        console.log(`   ✓ Generated ${icons.length} icon components`);
      }
    } catch (error) {
      console.error(`   ❌ Error syncing icons: ${error}`);
    }
  }

  console.log('\n✨ Sync complete!');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

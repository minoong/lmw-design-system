import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

export interface FigmaConfig {
  figmaFileKey: string;
  packages: {
    tokens: string;
    typography: string;
    icons: string;
    themes: string;
  };
  sync: {
    variables: boolean;
    typography: boolean;
    icons: boolean;
  };
  naming: {
    prefix: string;
    caseStyle: "kebab" | "camel" | "pascal";
  };
  icons: {
    componentPrefix: string;
    format: "svg" | "png";
    optimizeSvg: boolean;
  };
}

const DEFAULT_CONFIG: FigmaConfig = {
  figmaFileKey: "",
  packages: {
    tokens: "./packages/tokens/generated",
    typography: "./packages/typography/generated",
    icons: "./packages/icons/generated",
    themes: "./packages/themes/generated",
  },
  sync: {
    variables: true,
    typography: true,
    icons: true,
  },
  naming: {
    prefix: "ds",
    caseStyle: "kebab",
  },
  icons: {
    componentPrefix: "icon/",
    format: "svg",
    optimizeSvg: true,
  },
};

/**
 * Load figma.config.json from project root
 */
export function loadConfig(rootDir: string = process.cwd()): FigmaConfig {
  const configPath = resolve(rootDir, "figma.config.json");

  if (!existsSync(configPath)) {
    console.warn(
      `Warning: figma.config.json not found at ${configPath}. Using defaults.`
    );
    return DEFAULT_CONFIG;
  }

  try {
    const content = readFileSync(configPath, "utf-8");
    const userConfig = JSON.parse(content) as Partial<FigmaConfig>;

    return {
      ...DEFAULT_CONFIG,
      ...userConfig,
      packages: {
        ...DEFAULT_CONFIG.packages,
        ...userConfig.packages,
      },
      sync: {
        ...DEFAULT_CONFIG.sync,
        ...userConfig.sync,
      },
      naming: {
        ...DEFAULT_CONFIG.naming,
        ...userConfig.naming,
      },
      icons: {
        ...DEFAULT_CONFIG.icons,
        ...userConfig.icons,
      },
    };
  } catch (error) {
    console.error(`Error parsing figma.config.json: ${error}`);
    return DEFAULT_CONFIG;
  }
}

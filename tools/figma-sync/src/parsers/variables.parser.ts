import type {
  FigmaVariablesResponse,
  FigmaVariable,
  FigmaVariableValue,
} from "../api/types.js";

export interface ParsedToken {
  name: string;
  value: string | number;
  type: "color" | "number" | "string";
  cssVar: string;
  description?: string;
}

export interface ParsedTokenCollection {
  name: string;
  tokens: ParsedToken[];
}

/**
 * Convert Figma color (0-1) to hex
 */
function figmaColorToHex(color: FigmaVariableValue): string {
  const r = Math.round((color.r ?? 0) * 255);
  const g = Math.round((color.g ?? 0) * 255);
  const b = Math.round((color.b ?? 0) * 255);
  const a = color.a ?? 1;

  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }

  const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  return `#${hex}`;
}

/**
 * Convert token name to kebab-case CSS variable name
 */
function toKebabCase(str: string): string {
  return str
    .replace(/\//g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

/**
 * Parse Figma variable to token
 */
function parseVariable(
  variable: FigmaVariable,
  defaultModeId: string
): ParsedToken | null {
  const value = variable.valuesByMode[defaultModeId];
  if (!value) return null;

  // Skip alias references for now (they reference other variables)
  if (value.type === "VARIABLE_ALIAS") {
    return null;
  }

  const name = toKebabCase(variable.name);
  const cssVar = `--ds-${name}`;

  switch (variable.resolvedType) {
    case "COLOR":
      return {
        name,
        value: figmaColorToHex(value),
        type: "color",
        cssVar,
        description: variable.description,
      };
    case "FLOAT":
      return {
        name,
        value: value.value ?? 0,
        type: "number",
        cssVar,
        description: variable.description,
      };
    case "STRING":
      return {
        name,
        value: value.string ?? "",
        type: "string",
        cssVar,
        description: variable.description,
      };
    default:
      return null;
  }
}

/**
 * Parse Figma variables response into token collections
 */
export function parseVariables(
  response: FigmaVariablesResponse
): ParsedTokenCollection[] {
  const { variables, variableCollections } = response.meta;
  const collections: ParsedTokenCollection[] = [];

  for (const collection of Object.values(variableCollections)) {
    const tokens: ParsedToken[] = [];

    for (const variable of Object.values(variables)) {
      if (variable.variableCollectionId !== collection.id) continue;
      if (variable.hiddenFromPublishing) continue;

      const token = parseVariable(variable, collection.defaultModeId);
      if (token) {
        tokens.push(token);
      }
    }

    if (tokens.length > 0) {
      collections.push({
        name: toKebabCase(collection.name),
        tokens,
      });
    }
  }

  return collections;
}

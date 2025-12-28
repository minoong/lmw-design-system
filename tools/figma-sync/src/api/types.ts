/**
 * Figma API Type Definitions
 */

export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaDocument;
  components: Record<string, FigmaComponent>;
  styles: Record<string, FigmaStyle>;
}

export interface FigmaDocument {
  id: string;
  name: string;
  type: string;
  children: FigmaNode[];
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  effects?: FigmaEffect[];
  absoluteBoundingBox?: FigmaBoundingBox;
  style?: FigmaTextStyle;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
}

export interface FigmaStyle {
  key: string;
  name: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
  description: string;
}

export interface FigmaPaint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'IMAGE';
  visible?: boolean;
  opacity?: number;
  color?: FigmaColor;
  gradientStops?: FigmaGradientStop[];
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaGradientStop {
  position: number;
  color: FigmaColor;
}

export interface FigmaEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible: boolean;
  radius: number;
  color?: FigmaColor;
  offset?: { x: number; y: number };
}

export interface FigmaBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FigmaTextStyle {
  fontFamily: string;
  fontPostScriptName: string;
  fontWeight: number;
  fontSize: number;
  lineHeightPx: number;
  letterSpacing: number;
}

// Variables API Types
export interface FigmaVariablesResponse {
  status: number;
  error: boolean;
  meta: {
    variables: Record<string, FigmaVariable>;
    variableCollections: Record<string, FigmaVariableCollection>;
  };
}

export interface FigmaVariable {
  id: string;
  name: string;
  key: string;
  variableCollectionId: string;
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
  valuesByMode: Record<string, FigmaVariableValue>;
  description: string;
  hiddenFromPublishing: boolean;
  scopes: string[];
  codeSyntax: Record<string, string>;
}

export interface FigmaVariableValue {
  type?: 'VARIABLE_ALIAS';
  id?: string;
  // For COLOR type
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  // For FLOAT type
  value?: number;
  // For STRING type
  string?: string;
}

export interface FigmaVariableCollection {
  id: string;
  name: string;
  key: string;
  modes: FigmaMode[];
  defaultModeId: string;
  remote: boolean;
  hiddenFromPublishing: boolean;
}

export interface FigmaMode {
  modeId: string;
  name: string;
}

// Images API
export interface FigmaImagesResponse {
  err: string | null;
  images: Record<string, string>;
}

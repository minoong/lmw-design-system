import type {
  FigmaFile,
  FigmaVariablesResponse,
  FigmaImagesResponse,
} from "./types.js";

const FIGMA_API_BASE = "https://api.figma.com/v1";

export class FigmaClient {
  private accessToken: string;

  constructor(accessToken: string) {
    if (!accessToken) {
      throw new Error(
        "FIGMA_ACCESS_TOKEN is required. Set it in your environment variables."
      );
    }
    this.accessToken = accessToken;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const url = `${FIGMA_API_BASE}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "X-Figma-Token": this.accessToken,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Figma API error (${response.status}): ${error}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get file contents
   */
  async getFile(fileKey: string): Promise<FigmaFile> {
    return this.request<FigmaFile>(`/files/${fileKey}`);
  }

  /**
   * Get file styles
   */
  async getStyles(fileKey: string): Promise<FigmaFile> {
    return this.request<FigmaFile>(`/files/${fileKey}/styles`);
  }

  /**
   * Get local variables (Design Tokens)
   */
  async getVariables(fileKey: string): Promise<FigmaVariablesResponse> {
    return this.request<FigmaVariablesResponse>(
      `/files/${fileKey}/variables/local`
    );
  }

  /**
   * Get images for specific node IDs
   */
  async getImages(
    fileKey: string,
    nodeIds: string[],
    options: {
      format?: "svg" | "png" | "jpg" | "pdf";
      scale?: number;
    } = {}
  ): Promise<FigmaImagesResponse> {
    const { format = "svg", scale = 1 } = options;
    const ids = nodeIds.join(",");

    return this.request<FigmaImagesResponse>(
      `/images/${fileKey}?ids=${encodeURIComponent(ids)}&format=${format}&scale=${scale}`
    );
  }

  /**
   * Get specific nodes from file
   */
  async getNodes(fileKey: string, nodeIds: string[]): Promise<FigmaFile> {
    const ids = nodeIds.join(",");
    return this.request<FigmaFile>(
      `/files/${fileKey}/nodes?ids=${encodeURIComponent(ids)}`
    );
  }

  /**
   * Get file components
   */
  async getComponents(fileKey: string): Promise<FigmaFile> {
    return this.request<FigmaFile>(`/files/${fileKey}/components`);
  }
}

/**
 * Create a Figma client from environment variables
 */
export function createFigmaClient(): FigmaClient {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "FIGMA_ACCESS_TOKEN environment variable is not set. " +
        "Create a personal access token at https://www.figma.com/developers/api#access-tokens"
    );
  }
  return new FigmaClient(token);
}

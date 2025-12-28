import { createHash } from 'crypto';

/**
 * Generate a hash from data for change detection
 */
export function generateHash(data: unknown): string {
  const str = JSON.stringify(data);
  return createHash('sha256').update(str).digest('hex').slice(0, 16);
}

/**
 * Compare hashes to detect changes
 */
export function hasChanged(oldHash: string, newHash: string): boolean {
  return oldHash !== newHash;
}

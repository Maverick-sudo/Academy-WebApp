import crypto from 'crypto'

export function getMermaidHash(code: string): string {
  return crypto
    .createHash('sha256')
    .update(code.trim())
    .digest('hex')
    .substring(0, 16)
}

export function normalizeMermaidCode(code: string): string {
  return code
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[─│┌┐└┘├┤┬┴┼]/g, '-')
    .trim()
}

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitisedFilename?: string;
  buffer?: Buffer;
  mimeType?: string;
  size?: number;
}

/**
 * Sanitises a user-provided filename:
 * - Strips directory traversal / path separators
 * - Removes control characters
 * - Keeps safe alphanumeric characters, dashes, underscores, and dots
 * - Limits length to 100 characters while preserving the extension
 */
export function sanitiseFilename(rawName: string): string {
  if (!rawName || typeof rawName !== "string") return "resume.pdf";

  // Strip path traversal
  const baseName = rawName.replace(/^.*[\\/]/, "");
  // Remove control characters and non-printable chars
  const cleaned = baseName.replace(/[\x00-\x1F\x7F]/g, "").trim();

  const lastDotIndex = cleaned.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return cleaned.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 90) + ".pdf";
  }

  const namePart = cleaned.substring(0, lastDotIndex).replace(/[^a-zA-Z0-9_-]/g, "_");
  const extPart = cleaned.substring(lastDotIndex).toLowerCase();

  const safeName = (namePart.slice(0, 80) || "resume") + extPart;
  return safeName;
}

/**
 * Validates in-memory resume file according to extension, MIME type, size, and magic bytes.
 */
export function validateResumeFile(
  buffer: Buffer,
  rawFilename: string,
  declaredMimeType: string
): FileValidationResult {
  // 1. Check size
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "File is empty" };
  }

  if (buffer.length > MAX_FILE_SIZE) {
    return { valid: false, error: "File size exceeds 2 MB limit" };
  }

  // 2. Check extension
  const extMatch = rawFilename.match(/\.[a-zA-Z0-9]+$/);
  if (!extMatch) {
    return {
      valid: false,
      error: "File must have a .pdf, .doc, or .docx extension",
    };
  }
  const ext = extMatch[0].toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: "Only PDF, DOC, and DOCX documents are accepted",
    };
  }

  // 3. Check declared MIME type
  const normalizedMime = (declaredMimeType || "").toLowerCase().trim();
  if (normalizedMime && !ALLOWED_MIME_TYPES.includes(normalizedMime)) {
    return {
      valid: false,
      error: "Invalid file MIME type",
    };
  }

  // 4. Check Magic Bytes
  // PDF: starts with '%PDF-' (0x25, 0x50, 0x44, 0x46, 0x2D)
  if (ext === ".pdf") {
    if (buffer.length < 5) {
      return { valid: false, error: "File content does not match a valid PDF" };
    }
    const isPdf =
      buffer[0] === 0x25 && // %
      buffer[1] === 0x50 && // P
      buffer[2] === 0x44 && // D
      buffer[3] === 0x46 && // F
      buffer[4] === 0x2d; // -
    if (!isPdf) {
      return { valid: false, error: "File content does not match a valid PDF" };
    }
  }

  // DOCX: starts with 'PK\x03\x04' (0x50, 0x4B, 0x03, 0x04) and contains '[Content_Types].xml'
  if (ext === ".docx") {
    if (buffer.length < 4) {
      return { valid: false, error: "File content does not match a valid DOCX" };
    }
    const isZip =
      buffer[0] === 0x50 &&
      buffer[1] === 0x4b &&
      buffer[2] === 0x03 &&
      buffer[3] === 0x04;
    if (!isZip) {
      return { valid: false, error: "File content does not match a valid DOCX" };
    }

    const utf8Content = buffer.toString("binary");
    if (!utf8Content.includes("[Content_Types].xml")) {
      return {
        valid: false,
        error: "DOCX file structure is invalid or corrupt",
      };
    }
  }

  // DOC: starts with D0 CF 11 E0 A1 B1 1A E1 (OLECF header)
  if (ext === ".doc") {
    if (buffer.length < 8) {
      return { valid: false, error: "File content does not match a valid DOC" };
    }
    const isDoc =
      buffer[0] === 0xd0 &&
      buffer[1] === 0xcf &&
      buffer[2] === 0x11 &&
      buffer[3] === 0xe0 &&
      buffer[4] === 0xa1 &&
      buffer[5] === 0xb1 &&
      buffer[6] === 0x1a &&
      buffer[7] === 0xe1;
    if (!isDoc) {
      return { valid: false, error: "File content does not match a valid DOC" };
    }
  }

  const sanitisedFilename = sanitiseFilename(rawFilename);

  let finalMime = "application/pdf";
  if (ext === ".docx") {
    finalMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  } else if (ext === ".doc") {
    finalMime = "application/msword";
  }

  return {
    valid: true,
    sanitisedFilename,
    buffer,
    mimeType: finalMime,
    size: buffer.length,
  };
}

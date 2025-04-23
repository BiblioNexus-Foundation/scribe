const { v4: uuidv4 } = require('uuid');

export function generateProjectUUID(projectName: string): string {
  const timestamp = Date.now();
  const fullUUID = uuidv4();
  const baseString = `${projectName}-${timestamp}-${fullUUID}`;

  // Hash the combined string to create a deterministic result
  let hash = 0;
  for (let i = 0; i < baseString.length; i++) {
    const char = baseString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  // Convert to positive value and use base36 encoding (alphanumeric)
  // to get a compact representation, then take first 8 characters
  const compactUUID = Math.abs(hash).toString(36).padStart(8, '0').substring(0, 8);

  return compactUUID;
}
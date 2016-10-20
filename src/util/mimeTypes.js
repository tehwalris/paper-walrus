export function isGeneralType(mimeType, expectedGeneralType) {
  return mimeType.split('/')[0].toLowerCase() === expectedGeneralType.toLowerCase();
}

import imageCompression from "browser-image-compression";

export async function compressToDataUrl(file) {
  const options = {
    maxSizeMB: 0.7,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
  };

  const compressed = await imageCompression(file, options);
  const dataUrl = await imageCompression.getDataUrlFromFile(compressed);
  return { dataUrl, compressedFile: compressed };
}

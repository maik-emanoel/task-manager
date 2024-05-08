export async function handleCopyToClipboard(value: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(value);
  } else {
    return document.execCommand("copy", true, value);
  }
}
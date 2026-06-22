
import pako from 'pako'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const zip = data => {
  data = pako.deflateRaw(encoder.encode(data)) // String => Uint8Array (deflated)

  // Swapped window.btoa for the native Uint8Array.toBase64 with the base64url alphabet.
  // btoa only emits standard base64 (+ and /), which a URL query string mangles; base64url (RFC 4648 section 5) is URL-safe.
  return data.toBase64({ alphabet: 'base64url', omitPadding: true })
}

export const unzip = data => {
  // Swapped window.atob for the native Uint8Array.fromBase64 with the base64url alphabet, matching zip.
  data = Uint8Array.fromBase64(data, { alphabet: 'base64url' })

  return decoder.decode(pako.inflateRaw(data)) // Uint8Array (inflated) => String
}

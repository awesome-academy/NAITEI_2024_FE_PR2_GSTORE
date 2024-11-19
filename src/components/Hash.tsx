export async function hashPassword(password: string | undefined) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('')

  return hashHex
}

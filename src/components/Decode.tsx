import { decodeJwt } from 'jose'

interface DecodedToken {
  avatar: string
  name: string
  id: number
}

const Decode = (token: string): DecodedToken | null => {
  try {
    const decodedToken = decodeJwt(token) as Partial<DecodedToken>

    return {
      avatar: decodedToken.avatar || '',
      name: decodedToken.name || '',
      id: decodedToken.id || 0
    }
  } catch (error) {
    console.error('Invalid token:', error)
    return null
  }
}

export default Decode

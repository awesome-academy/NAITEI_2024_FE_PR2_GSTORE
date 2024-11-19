import { hashPassword } from '../../components/Hash'

export const validateLogin = async (username: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword)
    const response = await fetch(`http://localhost:5000/users?username=${username}&password=${hashedPassword}`)
    const users = await response.json()
    return users
  } catch (error) {
    console.error('Login error:', error)
    return false
  }
}

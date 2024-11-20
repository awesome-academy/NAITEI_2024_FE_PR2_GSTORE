import { hashPassword } from '../../components/Hash'

export const validateRegistration = async (
  name: string,
  username: string,
  email: string,
  password: string,
  avatar: File | null
) => {
  try {
    const existingUserResponse = await fetch(`http://localhost:5000/users?username=${username}`)
    const existingUsers = await existingUserResponse.json()

    if (existingUsers.length > 0) {
      throw new Error('Username already exists')
    }

    const hashedPassword = await hashPassword(password)
    let avatarBase64 = null
    if (avatar) {
      avatarBase64 = `/src/assets/images/${avatar.name}`
    }

    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, username, email, password: hashedPassword, avatar: avatarBase64 })
    })

    if (!response.ok) {
      throw new Error('Failed to register user')
    }

    const newUser = await response.json()
    return newUser
  } catch (error) {
    console.error('Registration error:', error)
    return false
  }
}

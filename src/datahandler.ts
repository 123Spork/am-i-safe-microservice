import bcrypt from 'bcrypt'
import { NotFoundException, UnauthorizedException } from './exceptions'

export interface UserInterface {
  username: string
  password: string
  updatedAt: number
}
const users: { [key: string]: UserInterface } = {}

export const getUserLastUpdated = async (username: string): Promise<number> => {
  let user = users[username] ? users[username] : null
  if (!user) {
    throw new NotFoundException()
  }
  return user.updatedAt
}

export const createUpdateUser = async (
  username: string,
  password: string
): Promise<number> => {
  let user = users[username] ? users[username] : null
  if (!user) {
    const cryptPassword = await bcrypt.hash(password, 3)
    users[username] = {
      username: username,
      password: cryptPassword,
      updatedAt: new Date().getTime()
    }
    return 201
  } else {
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw new UnauthorizedException()
    }
  }
  user.updatedAt = new Date().getTime()
  return 200
}

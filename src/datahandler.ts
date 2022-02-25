import bcrypt from 'bcrypt'

export interface UserInterface {
  username: string
  password: string
  updatedAt: number
}
const users: { [key: string]: UserInterface } = {}

export const getUserLastUpdated = async (username: string): Promise<number> => {
  let user = users[username] ? users[username] : null
  if (!user) {
    throw 'User Not Found'
  }
  return user.updatedAt
}

export const createUser = async (
  username: string,
  password: string
): Promise<void> => {
  if (users[username]) {
    throw 'Creation Failed'
  }
  const cryptPassword = await bcrypt.hash(password, 3)
  users[username] = {
    username: username,
    password: cryptPassword,
    updatedAt: new Date().getTime()
  }
}

export const updateUser = async (
  username: string,
  password: string
): Promise<void> => {
  let user = users[username] ? users[username] : null
  if (!user) {
    throw 'Update Failed'
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw 'Update Failed'
  }
  user.updatedAt = new Date().getTime()
}

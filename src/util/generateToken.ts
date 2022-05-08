import jwt from 'jsonwebtoken'

export interface DataStoreInToken {
  id: string
}

const generateToken = (id: string) => {
  const DataStoreInToken: DataStoreInToken = {
    id,
  }

  return jwt.sign(DataStoreInToken, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  })
}
export default generateToken

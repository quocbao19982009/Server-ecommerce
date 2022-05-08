import User, { UserInput, UserInterface } from '../models/User'
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from '../helpers/apiError'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

const createUser = async (
  email: string,
  password: string,
  name: string,
  isAdmin?: boolean
) => {
  const exitsUser = await User.findOne({ email })

  if (exitsUser) {
    throw new BadRequestError('Email has already taken')
  }

  const user = await User.create({ name, email, password, isAdmin })

  if (user) {
    return user
  } else {
    throw new BadRequestError('Invalid user data')
  }
}

const findUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  const passwordCorrect = await user?.matchPassword(password)

  if (user && passwordCorrect) {
    return user
  } else {
    throw new UnauthorizedError('Invalid email or password')
  }
}

const createOrFindUser = async (
  email: string,
  name: string,
  googleId: string
) => {
  console.log('email, googleId, name', email, googleId, name)

  const exitsUser = await User.findOne({ email })

  console.log(exitsUser)

  if (!exitsUser) {
    const user = await User.create({ name, email, password: googleId })

    return user
  }

  if (exitsUser) {
    const passwordCorrect = await exitsUser?.matchPassword(googleId)

    if (exitsUser && passwordCorrect) {
      return exitsUser
    }
  }
}

const findUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  return user
}

const updateUser = async (id: string, update: Partial<UserInterface>) => {
  const user = await findUserById(id)

  const {
    name: updateName,
    email: updateEmail,
    password: updatePassword,
  } = update

  if (user) {
    user.name = updateName || user.name
    user.email = updateEmail || user.email
    if (updatePassword) {
      user.password = updatePassword
    }
  }

  const updatedUser = await user.save()

  return updatedUser
}

export { createUser, findUser, findUserById, updateUser, createOrFindUser }

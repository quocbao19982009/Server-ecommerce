import mongoose from 'mongoose'
import bycrypt from 'bcryptjs'

export interface UserInput {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

export interface UserInterface extends UserInput, mongoose.Document {
  isAdmin: boolean
  matchPassword: (enteredPassword: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<UserInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // If user login with Google, use Google ID as password
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Check if password correctly
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bycrypt.compare(enteredPassword, this.password)
}

// Hashing password before save in database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bycrypt.genSalt(10)
  this.password = await bycrypt.hash(this.password, salt)
})

const User = mongoose.model<UserInterface>('User', userSchema)

export default User

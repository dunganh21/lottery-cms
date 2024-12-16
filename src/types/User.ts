import { ObjectId } from 'mongoose'

export enum UserRole {
  Guest = 'guest',
  Writer = 'writer',
  Moderator = 'moderator',
  Root = 'root',
}

export interface IUser {
  _id: ObjectId
  username: string
  email: string
  password: string
  phoneNumber?: string
  role: UserRole
  verified: boolean
  isGuest: boolean
  createdAt: Date
  updatedAt: Date
  avatar: string
}

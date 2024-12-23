import { UserRole } from '@/types/User'
import type { Access } from 'payload'

export const loggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const notGuest: Access = ({ req: { user } }) => {
  return Boolean(user) && (user?.role as UserRole) !== UserRole.Guest
}

export const isRoot: Access = ({ req: { user } }) => {
  return Boolean(user) && user?.role === UserRole.Root
}

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user) && [UserRole.Moderator, UserRole.Root].includes(user?.role as UserRole)
}

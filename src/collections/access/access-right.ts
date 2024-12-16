import { UserRole } from '@/types/User'
import type { Access } from 'payload'

export const loggedIn: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const notGuest: Access = ({ req: { user } }) => {
  return Boolean(user) && user?.role !== UserRole.Guest
}

export const isRoot: Access = ({ req: { user } }) => {
  return Boolean(user) && user?.role === UserRole.Root
}

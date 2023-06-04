import { api } from '@/services'
import { userStorage } from '@/stores/user'

export default function (): void {
  const token = userStorage.get()?.token
  if (token !== undefined) api.setSecurityData(token)
}

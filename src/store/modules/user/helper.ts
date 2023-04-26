import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  if (window.$keycloak) {
    console.log(window.$keycloak)
    return {
      userInfo: {
        avatar: '',
        name: window.$keycloak.idTokenParsed.preferred_username || 'invalid username',
        description: 'Greetings',
      },
    }
  }
  else {
    return {
      userInfo: {
        avatar: '',
        name: 'No Login',
        description: 'Greetings',
      },
    }
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}

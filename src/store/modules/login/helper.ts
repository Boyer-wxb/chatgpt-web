import { ss } from '@/utils/storage'

const LOCAL_NAME = 'loginStorage'

export interface LoginInfo {
  token: String
}

export interface LoginState {
  loginInfo: LoginInfo
}

export function defaultSetting(): LoginState {
  return {
    loginInfo: {
      token: '',
    },
  }
}

export function getLoginState(): LoginState {
  const localSetting: LoginState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLoginState(setting: LoginState): void {
  ss.set(LOCAL_NAME, setting)
}

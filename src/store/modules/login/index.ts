import { defineStore } from 'pinia'
import type { LoginInfo, LoginState } from './helper'
import { defaultSetting, getLoginState, setLoginState } from './helper'
import { store } from '@/store'

export const loginStore = defineStore('login-store', {
  state: (): LoginState => getLoginState(),
  actions: {
    updateLoginInfo(loginInfo: Partial<LoginInfo>) {
      this.loginInfo = { ...this.loginInfo, ...loginInfo }
      this.recordState()
    },

    resetLoginInfo() {
      this.loginInfo = { ...defaultSetting().loginInfo }
      this.recordState()
    },

    recordState() {
      setLoginState(this.$state)
    },
  },
})

export function useLoginStore() {
  return loginStore(store)
}

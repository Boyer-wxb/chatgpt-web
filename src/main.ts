import { createApp } from 'vue'
import Keycloak from 'keycloak-js'
import App from './App.vue'
import { setupI18n } from './locales'
import { setupAssets } from './plugins'
import { setupStore } from './store'
import { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)
  setupAssets()

  setupStore(app)

  setupI18n(app)

  await setupRouter(app)

  const initOptions = {
    url: import.meta.env.VITE_KC_BASE_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
    onLoad: 'login-required',
  }

  if (!initOptions.url || initOptions.url === '') {
    app.mount('#app')
    return
  }

  const keycloak = new Keycloak(initOptions)

  keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth)
      window.location.reload()
    else
      app.mount('#app')
  }).catch(() => {
    alert('Authenticated Failed')
  })

  window.$keycloak = keycloak
}

bootstrap()

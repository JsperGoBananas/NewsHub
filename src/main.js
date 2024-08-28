import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "@/router";
import { createI18n } from 'vue-i18n'
// 全局样式
import "@/style/global.scss";
import en from './i18n/en';
import zh from './i18n/zh';
const app = createApp(App);

const messages = {
  en,
  zh
}

const i18n = createI18n({
    // something vue-i18n options here ...
    legacy: false,  // 设置为 false，启用 composition API 模式
    messages,
    locale: 'en'  // 设置默认语言
  
  })
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(i18n)
app.mount("#app");

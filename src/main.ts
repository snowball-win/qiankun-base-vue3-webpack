import './public-path';
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus)
// .mount('#app')

let instance:any = null;

const render = (container:any) => {
    // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
    const appDom = container ? container : "#app"
    app.mount(appDom)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render(null);
}
  
export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}

export async function mount(props:any) {
    console.log('[vue] props from main framework', props);
    render(props.container);
}

export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
}

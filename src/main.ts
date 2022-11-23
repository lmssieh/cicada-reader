import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'virtual:windi.css'

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    document.body.insertAdjacentElement('afterbegin', app)
    // document.body.append(app);
    return app;
  })(),
);

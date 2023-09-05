import { createApp } from 'vue'
import App from './App.vue'
import characters from './components/Characters.vue';
import battleLog from './components/BattleLog.vue';

const app = createApp(App)

app.component('characters-stat', characters);
app.component('battle-log', battleLog);

app.mount('#app');

import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupApp from '@/views/SetupApp.vue'
import SetupGame from '@/views/SetupGame.vue'
import JeanTurnPlayer from '@/views/jean/TurnPlayer.vue'
import JeanTurnBot from '@/views/jean/TurnBot.vue'
import JeanEndOfRound from '@/views/jean/EndOfRound.vue'
import JeanGameEnd from '@/views/jean/GameEnd.vue'
import JacquesTurnPlayer from '@/views/jacques/TurnPlayer.vue'
import JacquesTurnBot from '@/views/jacques/TurnBot.vue'
import JacquesGameEnd from '@/views/jacques/GameEnd.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  { 
    path: '/setup',
    name: 'SetupApp',
    component: SetupApp
  },
  { 
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/jean/turn/:turn/player',
    name: 'JeanTurnPlayer',
    component: JeanTurnPlayer
  },
  {
    path: '/jean/turn/:turn/player/endOfRound',
    name: 'JeanTurnPlayerEndOfRound',
    component: JeanEndOfRound
  },
  {
    path: '/jean/turn/:turn/bot',
    name: 'JeanTurnBot',
    component: JeanTurnBot
  },
  {
    path: '/jean/turn/:turn/bot/endOfRound',
    name: 'JeanTurnBotEndOfRound',
    component: JeanEndOfRound
  },
  {
    path: '/jean/gameEnd',
    name: 'JeanGameEnd',
    component: JeanGameEnd
  },
  {
    path: '/jacques/turn/:turn/player',
    name: 'JacquesTurnPlayer',
    component: JacquesTurnPlayer
  },
  {
    path: '/jacques/turn/:turn/bot',
    name: 'JacquesTurnBot',
    component: JacquesTurnBot
  },
  {
    path: '/jacques/gameEnd',
    name: 'JacquesGameEnd',
    component: JacquesGameEnd
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')
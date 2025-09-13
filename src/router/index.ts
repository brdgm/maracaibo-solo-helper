import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupApp from '@/views/SetupApp.vue'
import SetupGame from '@/views/SetupGame.vue'
import RoundTurnPlayer from '@/views/RoundTurnPlayer.vue'
import RoundTurnBot from '@/views/RoundTurnBot.vue'
import RoundRewards from '@/views/RoundRewards.vue'
import RoundCleanup from '@/views/RoundCleanup.vue'
import GameEnd from '@/views/GameEnd.vue'

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
    path: '/round/:round/turn/:turn/player',
    name: 'RoundTurnPlayer',
    component: RoundTurnPlayer
  },
  {
    path: '/round/:round/turn/:turn/bot',
    name: 'RoundTurnBot',
    component: RoundTurnBot
  },
  {
    path: '/round/:round/turn/:turn/bot/action/:action',
    name: 'RoundTurnBotAction',
    component: RoundTurnBot
  },
  {
    path: '/round/:round/rewards',
    name: 'RoundRewards',
    component: RoundRewards
  },
  {
    path: '/round/:round/cleanup',
    name: 'RoundCleanup',
    component: RoundCleanup
  },
  {
    path: '/gameEnd',
    name: 'GameEnd',
    component: GameEnd
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')
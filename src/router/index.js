import Vue from 'vue'
import Router from 'vue-router'
import Recommended from '@/components/recommended/recommended'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Disc from '@/components/disc/disc'
import TopList from '@/components/top-list/top-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommended'
    },
    {
      path: '/recommended',
      component: Recommended,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
  ]
})

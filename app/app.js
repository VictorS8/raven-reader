const app = require('remote').require('app')
const jetpack = require('fs-jetpack').cwd(app.getAppPath())
const fs = require('fs')
const useDataDir = jetpack.cwd(app.getPath("userData"))
const $ = require('jquery')
const select2 = require('select2')
import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import Main from './components/Main.vue'
import AddArticle from './components/AddArticle.vue'
import Article from './components/Article.vue'
import store from './store'

// Check if directory for storing article exists or not
var dirYes = jetpack.exists(useDataDir.path('streams'))
var dirFavi = jetpack.exists(useDataDir.path('favicons'))

if(!dirYes){
  fs.mkdir(useDataDir.path('streams'))
}
if(!dirFavi){
  fs.mkdir(useDataDir.path('favicons'))
}

Vue.use(Router);

var router = new Router({
  hashbang:false,
  abstract:true
})

router.map({
  '/':{
    component: Main,
    subRoutes: {
      'article/:id':{
        component: Article
      }
    }
  },
  '/:feed':{
    component: Main,
    subRoutes: {
      '/:id':{
        component: Article
      }
    }
  },
  '/article/add':{
    component: AddArticle
  }
})

store.actions.getFeed()
store.actions.getArticles()

router.start(App,'#app')

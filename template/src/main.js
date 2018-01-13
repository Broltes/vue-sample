import 'babel-polyfill';
import Vue from 'vue';
import App from './App';

import './app/filters';
import './style/index.scss';
import './assets/svg';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});

import Vue from 'vue';

const filters = {
};

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

export default filters;

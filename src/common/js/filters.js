import Vue from 'vue';
import {padString} from '@/common/js/util';
// 格式化音乐听众数据
Vue.filter('listenFormat', val => {
	return padString(val, -4, '.', 0, 1);
});
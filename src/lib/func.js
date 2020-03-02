import Vue from 'vue';
import {Notification}  from 'element-ui';
// 通知提醒
Vue.prototype.notify=(msg,type,title,subTitle=null)=>{
  Notification({
		type:type?type:'info',
    title: title?title:'操作提示',
    dangerouslyUseHTMLString: true,
    // duration:3,
    message: `<div>
                ${!subTitle?`<p style="color:#ff9800">演示，不发任何请求。</p>
                <p style="color:#666">只是告知你干了什么操作。</p>`:`<p style="color:#666"></p>${subTitle}</p>`}
                <p class="notify-list">${msg}</p>
              <div>`});
}

// 格式化时间
/**
 * 时间格式化函数, 按照指定格式化字符串格式化传入时间
 * 
 * @param {Date} time 需要格式化的时间
 * @param {String} fmStr 定义时间的格式
 * 		yyyy: 代表四位数年份
 * 		  yy: 代表两位数年份 
 * 		  mm: 代表月份(小于10时补0)
 * 		  dd: 代表日期(小于10时补0)
 * 		  hh: 代表小时(小于10时补0)
 * 		  MM: 代表分钟(小于10时补0)
 * 		  ss: 代表秒数(小于10时补0)
 * 		 SSS: 代表毫秒数
 * 		   w: 代表周几(数字) 
 * 		   W: 代表周几(中文) 
 * 		  ww: 代表周几(英文) 
 * @returns {String} 返回格式化的时间
 */
Vue.prototype.$timer=(time, fmStr="yyyy-mm-dd hh:MM:ss")=>{
	if(!time){
		return '';
	}
	time = new Date(time);
	const weekCN = '一二三四五六日';
	const weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	let year = time.getFullYear();
	let month = time.getMonth() + 1;
	let day = time.getDate();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();
	let milliSeconds = time.getMilliseconds();
	let week = time.getDay();

	month = month >= 10 ? month : ('0' + month);
	day = day >= 10 ? day : ('0' + day);
	hours = hours >= 10 ? hours : ('0' + hours);
	minutes = minutes >= 10 ? minutes : ('0' + minutes);
	seconds = seconds >= 10 ? seconds : ('0' + seconds);

	if (fmStr.indexOf('yyyy') !== -1) {
		fmStr = fmStr.replace('yyyy', year);
	} else {
		fmStr = fmStr.replace('yy', (year + '').slice(2));
	}
	fmStr = fmStr.replace('mm', month);
	fmStr = fmStr.replace('dd', day);
	fmStr = fmStr.replace('hh', hours);
	fmStr = fmStr.replace('MM', minutes);
	fmStr = fmStr.replace('ss', seconds);
	fmStr = fmStr.replace('SSS', milliSeconds);
	fmStr = fmStr.replace('W', weekCN[week - 1]);
	fmStr = fmStr.replace('ww', weekEN[week - 1]);
	fmStr = fmStr.replace('w', week);

	return fmStr;
}
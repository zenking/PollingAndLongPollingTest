
var testStart = false; //防止多次请求
var index = 0 ; //对请求进行标记识别

/**
* 请求地址
*/
var url_polling = "http://localhost:3000/polling";
var url_longpolling = "http://localhost:3000/longpolling";

/**
* 发送测试数据
* @param url 	请求地址
* @param callback  回调函数
*/
function sendDataOnce (url,callback) {
	post(url,{index:index++},callback);
}


/**
* 设置click事件
*/
$("#polling").addEventListener("click",function (e) {	
	if (testStart) return ;
	testStart = true ;

	this.innerHTML = "polling already start";

	/**
	* 轮询的回调函数
	* @param e 	请求返回的数据
	*/
	function pollingCallback (e) {
		log(e)
	};

	//进行轮询，间隔时间为3s,
	setInterval(sendDataOnce,3000,url_polling,pollingCallback);
});


$("#longpolling").addEventListener("click",function (e) {	
	if (testStart) return ;
	testStart = true ;

	this.innerHTML = "longpolling already start";

	/**
	* 轮询的回调函数
	* @param e 	请求返回的数据
	*/
	function longpollingCallback (e) {
		log(e);

		//请求完成后进行下一次请求
		sendDataOnce(url_longpolling,longpollingCallback);
	};

	//开始请求数据
	sendDataOnce(url_longpolling,longpollingCallback);
});
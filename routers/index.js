/**
*	获取基本数据
*/
function getRespTpl (req) {
	var tpl = {
		index : req.body.index    
	};
	return tpl;
}

/**
* 模拟检查新数据   
* @param callback   回调函数
*/
function checkNewData (callback) {

	var random = Math.floor( Math.random() * 3) ; //随机取 0-2 整数

	var newData ;
	var tmpData = {  		//查看所有产生的值
			data : random,
			time : new Date().valueOf()
		};
	console.log(tmpData);

	// 若值为 0 则表示有新数据 
	if (random  == 0) {
		newData = tmpData ;
	};

	if (callback) {
		callback(newData);
	};

}


/**
*	用于处理普通轮询
*/
exports.polling = function (req, resp) {

	var pollingCallback = function (newData) {
		var data = getRespTpl(req);

		if (newData) {
			data['data'] = newData;
		};
		resp.send(JSON.stringify(data));
	}

	checkNewData(pollingCallback);
}



/**
*	用于处理长轮询
*/
exports.longpolling = function (req, resp) {
	
	//设置查询超时  
	var lpMaxTimeout = 15000 ;
	var checkDataHandler ;
	var timeoutHandler = setTimeout(function () {
		clearTimeout(checkDataHandler);
		var data = getRespTpl(req);
		resp.send(JSON.stringify(data));
	},lpMaxTimeout);

	var longpollingCallback = function (newData) {
		var data = getRespTpl(req);

		if (newData) {
			data['data'] = newData;
			resp.send(JSON.stringify(data));
			clearTimeout(timeoutHandler);
		}else{
			//每次检查完后隔一段时间后进行第二次查询
			checkDataHandler = setTimeout(checkNewData,3000,longpollingCallback);
		}
	}

	checkNewData(longpollingCallback);
}

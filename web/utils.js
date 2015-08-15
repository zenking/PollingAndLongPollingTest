function $(query) {
	var eleList=document.querySelectorAll(query);
	if(eleList.length==1)
		return eleList[0];
	else if(eleList.length==0)
		return undefined;
	else return eleList;
}

function log (e) {
	console.log(e);
}

function post (url,data,callback) {
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("post",url,true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 ){
			if(callback){
				callback(xmlhttp.status + xmlhttp.responseText);
			}
		}
	};
	var tmp = "";
	for(var k in data){
		if(data.hasOwnProperty(k)){
			tmp += (k+"="+data[k]+"&");
		}
	}
	if (tmp[tmp.length-1] == "&") {
		tmp = tmp.slice(0,tmp.length-1);
	};
	xmlhttp.send(tmp);
}
 
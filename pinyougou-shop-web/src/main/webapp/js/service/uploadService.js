//服务层
app.service('uploadService',function($http){
	
	this.uploadFile=function(){
		
		var formdata = new FormData();
		//取第一个文件文件添加到formdata对象中
		formdata.append("file",file.files[0]);
		
		return $http({
				url: "../upload.do",
				method: "post",
				data: formdata,
				headers: {"Content-Type":undefined},
				transformRequest: angular.identity
		});
	}
});
app.controller("indexController",function($scope,loginService){
	
	$scope.loginName="";
	//获取登录用户姓名并展示
	$scope.showLoginName=function(){
		loginService.loginName().success(
				function(response){
					$scope.loginName=response.loginName;
				}
		);
	}
	
	
})
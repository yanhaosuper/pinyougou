app.controller("baseController",function($scope){
	
	
	//封装重新加载分页信息
	$scope.reloadList= function() {
			$scope.search($scope.paginationConf.currentPage,
					$scope.paginationConf.itemsPerPage);
			
	}
	$scope.paginationConf = {
			//当前页
			currentPage : 1,
			//总记录数
			totalItems : 10,
			//每页记录数	
			itemsPerPage : 10,
			//分页选项
			perPageOptions : [ 10, 20, 30, 40, 50 ],
			//当页码变更后触发
			onChange : function() {
				$scope.reloadList();//重新加载
			}
		};
//	   //重新加载列表 数据
//    $scope.reloadList=function(){
//    	//切换页码  
//    	$scope.findPage( $scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);	   	
//    }
//    
//	//分页控件配置 
//	$scope.paginationConf = {
//         currentPage: 1,
//         totalItems: 10,
//         itemsPerPage: 10,
//         perPageOptions: [10, 20, 30, 40, 50],
//         onChange: function(){
//        	 $scope.reloadList();//重新加载
//     	 }
//	}; 
//	
	
	//存储需要删除的id值
	$scope.selectIds=[];
	//点击复选框完成selectIds的增删
	$scope.updateSelection=function($event,id){
		if($event.target.checked){
			//复选框被选中,添加
			$scope.selectIds.push(id);
		}else{
			//复选框没被选中,删除
			var index = $scope.selectIds.indexOf(id);
			$scope.selectIds.splice(index,1);
		}
	}
	
	
	//处理json数据展示效果
	$scope.jsonToString=function(jsonString,key){
		var value="";
		//字符串封装成json对象
		var json = JSON.parse(jsonString);
		//遍历
		for (var i = 0; i < json.length; i++) {
			if(i > 0){
				value+=","+json[i][key];
			}
			value+=json[i][key];
			
		}		
		return value;
		
	}	
	
})
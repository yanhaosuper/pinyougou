//建立控制器
app.controller('brandController', function($scope,$controller,brandService) {
			
	
			//查询所有
			$scope.findAll = function() {
				brandService.findAll().success(function(response) {
					$scope.list = response;
				});
			}
		
			//封装重新加载分页信息
			$scope.reloadList= function() {
					$scope.findPage($scope.paginationConf.currentPage,
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
			//初始化searchEntity对象
			$scope.searchEntity={};
			//发送分页请求,带条件
			$scope.findPage = function(page, size) {
				brandService.findPage(page, size,$scope.searchEntity).success(
						function(response) {
							$scope.list = response.rows;
							$scope.paginationConf.totalItems = response.total;
						});
			}
		
			
			//增改brand(因为修改与添加都是在同一个界面完成)
			$scope.save=function(){
				var object = brandService.add($scope.entity);
				if($scope.entity.id != null){
					object = brandService.update($scope.entity);
				}
				object.success(
					function(response){
						if(response.success){
							//添操作成功
							$scope.reloadList();
						}else{
							//操作失败
							alert(response.message);
						}
					}		
				);
			}
			
			//根据id查询brand
			$scope.findOne=function(id){
				brandService.findOne(id).success(
					function(response){
						$scope.entity=response;
					}		
				);
			}
		
			//完成删除请求
			$scope.del=function(){
				brandService.del($scope.selectIds).success(
					function(response){
						if(response.success){
							//删除成功
							$scope.reloadList();
							//清空需要删除的id
							$scope.selectIds=[];
						}else{
							//删除失败
							alert(response.message);
						}
					}		
				)	
			}
			
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
		});
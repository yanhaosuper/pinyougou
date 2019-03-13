	//建立服务层
		app.service("brandService", function($http) {
			//查询所有
			this.findAll=function(){
				return $http.get('../brand/findAll.do');
			}
			//分页查询带条件
			this.findPage=function(page,size,searchEntity){
				return $http.post('../brand/findPage.do?page=' + page + '&size=' + size,searchEntity);
			}
			//brand的增加
			this.add=function(entity){
				return 	$http.post('../brand/add.do',entity);
			}
			//brand的修改
			this.update=function(entity){
				return 	$http.post('../brand/update.do',entity);
			}
			//根据id查找brand
			this.findOne=function(id){
				return $http.get('../brand/findOne.do?id='+id);
			}
			//删除brand
			this.del=function(selectIds){
				return $http.get('../brand/delete.do?ids='+selectIds);
			}
			
			//查询select2 品牌关联下拉框数据
			this.selectOptionList=function(){
				return $http.get('../brand/selectOptionList.do');
			}
			
		})
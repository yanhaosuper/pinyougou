 //控制层 
app.controller('goodsController' ,function($scope,$controller   ,goodsService,uploadService,itemCatService,typeTemplateService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=goodsService.update( $scope.entity ); //修改  
		}else{
			serviceObject=goodsService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	//保存,无修改只有添加功能
	$scope.add=function(){		
		
		//将富文本框内容赋值
		$scope.entity.goodsDesc.introduction=editor.html();
		goodsService.add($scope.entity).success(
			function(response){
				if(response.success){
					alert("新增成功");
					//清空文本框内容
					$scope.entity={};
					editor.html("");
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	
	$scope.uploadFile=function(){
		uploadService.uploadFile().success(
			function(response){
			if(response.success){
				//上传成功
				$scope.image_entity.url=response.message;
			}else{
				alert(response.message);
			}
			
		});
	}
	//上传窗口保存
	//初始化
	$scope.entity={goods:{},goodsDesc:{itemImages:[],specificationItems:[]}};
	$scope.add_image_entity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	}
	
	//删除上传图片
	$scope.remove_image_entity=function(index){
		$scope.entity.goodsDesc.itemImages.splice(index,1);
	}
	
	//查询一级商品分类列表,
	$scope.selectItemCat1List=function(){
		itemCatService.findByParentId(0).success(
			function(response){
			$scope.itemCat1List=response;
			
		});
	}
	
	//当一级商品id改变,触发方法
	$scope.$watch('entity.goods.category1Id',function(newValue,oldValue){
		
		itemCatService.findByParentId(newValue).success(
				function(response){
				$scope.itemCat2List=response;
				
			});
		
	})
	//当二级商品id改变,触发方法
	$scope.$watch('entity.goods.category2Id',function(newValue,oldValue){
		
			itemCatService.findByParentId(newValue).success(
					function(response){
					$scope.itemCat3List=response;
				});
		
		
		
	})
	//重新选定一级商品,清空内容
	$scope.$watch('itemCat2List',function(newValue,oldValue){	
					$scope.itemCat3List={};
	})
	//当三级商品id改变,触发方法
	$scope.$watch('entity.goods.category3Id',function(newValue,oldValue){
		
		itemCatService.findOne(newValue).success(
				function(response){
				$scope.entity.goods.typeTemplateId=response.typeId;
			});
		
	})
	//当模板id改变,触发方法
	$scope.$watch('entity.goods.typeTemplateId',function(newValue,oldValue){
		
		typeTemplateService.findOne(newValue).success(
				function(response){
				$scope.typeTemplate=response;
				//要遍历,需要转换为json对象
				$scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds);
				$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.typeTemplate.customAttributeItems);
			});
		
		typeTemplateService.findSpecList(newValue).success(
				function(response){
					$scope.specList=response;
				})
	})
	
	//添加规格属性值
	$scope.updateSpecAttribute=function(name,value,$event){
		
		var object = $scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems,'attributeName',name);
		
		if(object != null){
			if($event.target.checked){
				//添加属性
				object.attributeValue.push(value);
			}else{
				//删除属性
				var index = object.attributeValue.indexOf(value);
				object.attributeValue.splice(index,1);
				//如果属性值没有了,将该对象清空
				if(object.attributeValue.length == 0){
					var index1 = $scope.entity.goodsDesc.specificationItems.indexOf(object);
					$scope.entity.goodsDesc.specificationItems.splice(index1,1);
				}
			}
			
		}else{
			$scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]});
		}
			
	}
	
	
	//添加SKU数据
	$scope.createItemList=function(){
		//初始化SKU列表
		$scope.entity.itemList=[{spec:{},price:0,num:999,status:'0',isDefault:'0'}];
		//规格集合
		var items = $scope.entity.goodsDesc.specificationItems;
		//将规格集合遍历
		for (let item of items) {
			//添加过程抽取一个方法
			$scope.entity.itemList = addColumn($scope.entity.itemList, item.attributeName, item.attributeValue);
		}
	}
	
	//定义一个私有方法,完成SKU规格的添加
	addColumn=function(list,attributeName,attributeValues){
		//定义一个集合,封装数据
		var newList = [];
		for (var i = 0; i < list.length; i++) {
			var oldRow = list[i];
			for (var j = 0; j < attributeValues.length; j++) {
				//深克隆,进行添加操作不改变list原有内容
				var newRow = JSON.parse(JSON.stringify(oldRow));
				newRow.spec[attributeName]=attributeValues[j];
				newList.push(newRow);
			}
		}
		return newList;
		
	}
	
});	

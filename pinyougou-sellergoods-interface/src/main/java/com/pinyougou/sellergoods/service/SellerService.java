package com.pinyougou.sellergoods.service;
import java.util.List;

import com.pinyougou.pojo.TbSeller;

import entity.PageResult;
import entity.Result;
/**
 * 服务层接口
 * @author Administrator
 *
 */
public interface SellerService {

	/**
	 * 返回全部列表
	 * @return
	 */
	public List<TbSeller> findAll();
	
	
	/**
	 * 返回分页列表
	 * @return
	 */
	public PageResult findPage(int pageNum,int pageSize);
	
	
	/**
	 * 增加
	*/
	public void add(TbSeller seller);
	
	
	/**
	 * 修改
	 */
	public void update(TbSeller seller);
	

	/**
	 * 根据ID获取实体
	 * @param id
	 * @returnString
	 */
	public TbSeller findOne(String id);
	
	
	/**
	 * 批量删除
	 * @param ids
	 */
	public void delete(String[] ids);

	/**
	 * 分页
	 * @param pageNum 当前页 码
	 * @param pageSize 每页记录数
	 * @return
	 */
	public PageResult findPage(TbSeller seller, int pageNum,int pageSize);
	
	/**
	 * 更改状态
	 * @param id
	 * @param status
	 * @return
	 */
	public void updataStatus(String id,String status); 
}
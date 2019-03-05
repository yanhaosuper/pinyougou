package com.pinyougou.sellergoods.service;

import java.util.List;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;

public interface IBrandService {
	
	/**
	 * 查询所有
	 * @return
	 */
	public List<TbBrand> findAll();
	
	/**
	 * 分页查询
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public PageResult findPage(TbBrand brand,int pageNum,int pageSize);
	
	/**
	 * 添加brand
	 * @param brand
	 */
	public void add(TbBrand brand);
	/**
	 * 根据id查找brand
	 * @param id
	 * @return
	 */
	public TbBrand findOne(Long id);
	
	/**
	 * 修改brand信息
	 * @param brand
	 */
	public void update(TbBrand brand);
	
	/**
	 * 根据id删除brand
	 * @param id
	 */
	public void delete(Long[] ids);
}

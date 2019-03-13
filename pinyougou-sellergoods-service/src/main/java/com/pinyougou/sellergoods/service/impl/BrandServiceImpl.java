package com.pinyougou.sellergoods.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.pojo.TbBrandExample;
import com.pinyougou.pojo.TbBrandExample.Criteria;
import com.pinyougou.sellergoods.service.IBrandService;

import entity.PageResult;

@Service
@Transactional
public class BrandServiceImpl implements IBrandService{

	@Autowired
	private TbBrandMapper brandMapper;
	
	/**
	 * 查询所有
	 */
	@Override
	public List<TbBrand> findAll() {
		return brandMapper.selectByExample(null);
	}
	
	/**
	 * 分页查询,带条件
	 */
	@Override
	public PageResult findPage(TbBrand brand,int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);
		
		TbBrandExample example = new TbBrandExample();
		Criteria criteria = example.createCriteria();
		//给查询添加条件
		if(brand != null) {
			if(brand.getName()!=null&&brand.getName().length()>0) {
				criteria.andNameLike(brand.getName());
			}
			if(brand.getFirstChar()!=null&&brand.getFirstChar().length()>0) {
				criteria.andFirstCharLike(brand.getFirstChar());
			}
		}
		Page<TbBrand> list = (Page<TbBrand>) brandMapper.selectByExample(example );
		PageResult pageResult = new PageResult(list.getTotal(), list.getResult());
		return pageResult;
	}
	/**
	 * 添加brand
	 * @param brand
	 */
	@Override
	public void add(TbBrand brand) {
		brandMapper.insert(brand);
		
	}
	
	/**
	 * 根据id查找brand
	 * @param id
	 * @return
	 */
	@Override
	public TbBrand findOne(Long id) {
		return brandMapper.selectByPrimaryKey(id);
	}

	/**
	 * 修改brand信息
	 * @param brand
	 */
	@Override
	public void update(TbBrand brand) {
		brandMapper.updateByPrimaryKey(brand);
		
	}

	/**
	 * 根据id删除brand
	 */
	@Override
	public void delete(Long[] ids) {
		for(Long id:ids) {
			brandMapper.deleteByPrimaryKey(id);
		}
		
	}
	
	/**
	 * 查询select2 品牌关联下拉框数据
	 * @return
	 */
	@Override
	public List<Map> selectOptionList() {
		return brandMapper.selectOptionList();
	}
	

}

import serves from './request'

const service = serves();

// 登录
export const login = body => service.post("/admin/login",body);
// 博客列表
export const getBlogListAPI = body => service.post("/msyml/blog/getAllList",body);
// 获取全部分类
export const getAllCategoryAPI = body => service.get("/msyml/category/getAllList",body);
// 上传文件
export const uploadFileAPI = body => service.post("/common/uploadFile",body);
// 保存 修改博客
export const saveBlogAPI = body => service.post("/msyml/blog/createOrUpdate",body);

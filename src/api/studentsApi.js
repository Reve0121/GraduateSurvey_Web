import appServices from '../utils/appServices';

const get = appServices.get;
const post = appServices.post;

//查询所有学生
export const getAllStudentsApi = params => {
    let api = '/students/all';
    return post(api, params);
};

//学生登录
export const stuLoginApi = (params = '') => {
    let api = '/students/login';
    return post(api, params);
};
//删除学生信息
export const daleteStudentsApi = (params = '') => {
    let api = '/students/delete';
    return post(api, params);
};
//修改学生信息
export const updateStudentsApi = (params = '') => {
    let api = '/students/update';
    return post(api, params);
};
//新增学生信息
export const addStudentsApi = (params = '') => {
    let api = '/students/add';
    return post(api, params);
};
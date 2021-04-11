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

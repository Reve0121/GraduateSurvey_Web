import appServices from '../utils/appServices';

const get = appServices.get;
const post = appServices.post;

//查询所有问题
export const getAllQuestionsApi = (params = '') => {
    let api = '/questions/all';
    return get(api, params);
};

//新增问题
export const addQuestionsApi = (params = {}) => {
    let api = '/questions/add';
    return post(api, params);
};

//更新问题
export const updateQuestionsApi = (params = {}) => {
    let api = '/questions/update';
    return post(api, params);
};

//删除问题
export const deleteQuestionsApi = (params = {}) => {
    let api = '/questions/delete';
    return post(api, params);
};

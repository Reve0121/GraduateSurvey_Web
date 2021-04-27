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

//提交问卷
export const submitQuestionsApi = (params = {}) => {
    let api = '/answers/add';
    return post(api, params);
};
//获得统计各题ABCD选项
export const getAnswersApi = async (params = {}) => {
    let apiA = post('/answers/countA', params);
    let apiB = post('/answers/countB', params);
    let apiC = post('/answers/countC', params);
    let apiD = post('/answers/countD', params);
    let data = await Promise.all([apiA, apiB, apiC, apiD]);
    console.log("data", data)
    return data;
}
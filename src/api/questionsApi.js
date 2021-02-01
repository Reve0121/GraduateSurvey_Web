import appServices from "../utils/appServices";

const get = appServices.get;
const post = appServices.post;

export const getAllQuestionsApi = (params = "") => {
    let api = "/questions/all";   //待修改
    return get(api, params);
}

export const addQuestionsApi = (params = {}) => {
    let api = "/questions/add";   //待修改
    return post(api, params);
}
export const updateQuestionsApi = (params = {}) => {
    let api = "/questions/update";   //待修改
    return post(api, params);
}
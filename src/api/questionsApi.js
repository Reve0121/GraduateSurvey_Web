import appServices from "../utils/appServices";

const get = appServices.get;
const post = appServices.post;

export const getAllquestionsApi = (params = "") => {
    let api = "/questions/all";   //待修改
    return get(api, params);
}
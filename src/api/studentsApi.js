import appServices from "../utils/appServices";

const get = appServices.get;
const post = appServices.post;

export const getAllStudents = (params = "") => {
    let api = "/students/all";   //待修改
    return get(api, params);
}
export const testGetApi = (params = "") => {
    let api = "/api/test/getUserInfo";  //待修改
    return get(api, params);
}
import appAxios from './request'

const baseURL = process.env.BASE_URL || "http://192.168.3.18:3000";
const appServices = {
    post(url, data) {
        let requestURL = baseURL + url;
        let params = data || '';
        return new Promise((resolve, rejects) => {
            appAxios.post(requestURL, params)
                .then((res) => {
                    resolve(res);
                }).catch((error) => {
                    rejects(error);
                })
        })
    },
    get(url, data) {
        let requestURL = baseURL + url;
        let params = data || '';
        return new Promise((resolve, rejects) => {
            appAxios.get(requestURL, { params: params })
                .then((res) => {
                    resolve(res);
                }).catch(error => {
                    rejects(error);
                })
            // appAxios({
            //     url: requestURL,
            //     method: 'get',
            //     params: params
            // }).then((res) => {
            //     resolve(res);
            // }).catch(error => {
            //     rejects(error);
            // })
        })
    }

}




export default appServices
/**
 *
 * Created by quanke(http://quanke.name) on 2017/5/17.
 */
let Fetch = (host, method, requestMethod, body = undefined, headers = undefined) => {
    return new Promise((resolve, reject) => {
        let bodys = '';
        let requestConfig;
        let url;
        url = host + '?requestMethod=' + requestMethod + '&YR_CODE_VERSION=9.9.9';
        if (method === 'get' || method === 'GET') {
            if (body !== undefined) {
                Object.keys(body).map((index) => {
                    let param = encodeURI(body[index]);
                    bodys += `&${index}=${param}`;
                });
            }
            url += bodys;
            requestConfig = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                }
            };
        } else if (method === 'post' || method === 'POST') {
            if (body !== undefined) {
                Object.keys(body).map((index) => {
                    let param = encodeURI(body[index]);
                    if (bodys === '') {
                        bodys += `${index}=${param}`;
                    } else {
                        bodys += `&${index}=${param}`;
                    }
                });
            }
            requestConfig = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: bodys,
            };
        }
        fetch(url, requestConfig)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 0) {
                    resolve(responseJson);
                } else {
                    // 状态不为 0 返回错误信息
                    reject({msg: responseJson.msg, code: responseJson.status , data: responseJson.data});
                }
            })
            .catch((error) => {
                reject(error.message);
            });

    });
};

module.exports = Fetch;
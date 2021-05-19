import { url } from "./api";
import { userList, updateUser } from "./user";
import { categoryList, removeCategory } from "./category";

export default {
    userList,
    updateUser,
    categoryList,
    removeCategory
}
const AUTH_TOKEN = 'MTU5Mjq1MDg3NDcwNw=='

export function get(api) {
    return params => fetch(buildParams(url + api, params),
        {
            headers: {
                'auth-token': AUTH_TOKEN
            }
        })
}

export function put(api) {
    return params => {
        const formData = new FormData()
        Object.entries(params).forEach(([k, v]) => {
            formData.append(k, v)
        })
        return queryParams => fetch(buildParams(url + api, queryParams),
            {
                method: 'PUT',
                body: formData,
                headers: {
                    'auth-token': AUTH_TOKEN
                }
            })
    }
}

export function del(api) {
    return queryParams => fetch(buildParams(url + api, queryParams), {
        method: 'DELETE',
        headers: {
            'auth-token': AUTH_TOKEN
        }
    })
}

function buildParams(url, params = {}) {
    let newUrl = new URL(url)
    if (typeof params === 'object') {
        Object.keys(params).forEach(key => {
            newUrl.searchParams.append(key, params[key]);
        });
        return newUrl.toString();
    } else {
        // 适配path参数
        return url.endsWith('/') ? (url + params) : (url + '/' + params)
    }
}
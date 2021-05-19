import { get, del } from '../index'
import * as api from '../api'

export function categoryList(params) {
    return get(api.api.categoryList)(params)
}

export function removeCategory(params) {
    return del(api.api.removeCategory)(params)
}
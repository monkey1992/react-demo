import { get } from '../index'
import * as api from '../api'

export function userList(params) {
    return get(api.api.userList)(params)
}
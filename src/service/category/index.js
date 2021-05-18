import { get, put } from '../index'
import * as api from '../api'

export function categories(params) {
    return get(api.api.categories)(params)
}
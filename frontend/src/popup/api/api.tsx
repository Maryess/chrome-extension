import AxiosFromPackage from 'axios'
import { SERVER_URL } from './api.helper'

export const axios = AxiosFromPackage.create({
    baseURL:SERVER_URL,
    headers:{
        "Content-Type": "application/json"
    }
})
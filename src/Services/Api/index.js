import axios from 'axios'
// import { store } from '@/store/store.js'
const clientApi = axios.create({
    // baseURL: process.env.NODE_ENV === "development" ? "http://139.162.25.181/api" : "https://api.wildwolf.vip/api",
    baseURL: import.meta.env.VITE_BACKEND,
})
let loading = null
const options = {
    lock: true,
    text: 'Loading'
    // background: 'rgba(0, 0, 0, 0.7)',
}
clientApi.interceptors.request.use(
    (config) => {
        // const user= store.getUser()
        //     config.headers['Authorization'] = user?.authorization
            config.headers['email'] =  "andrews@gmail.com" //user?.email

        if( config.url !== "/imgUpload"){
            config.headers['Content-Type'] = `application/json`
        }else{
            config.headers['Content-Type'] = `multipart/form-data`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
clientApi.defaults.timeout = 10000
clientApi.interceptors.response.use(
    (response) => {
        // loading.close()
        const code = response.data.code
        if (code == 200) {
            return response.data
        } else {
            return Promise.reject(response.data || 'request error')
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)


export function signin(value) {
    return post('/signin', value)
}
export function createUser(value) {
    return post('/createUser', value)
}
export function imgUpload(value) {
    return post('/imgUpload', value)
}


export function post(url, data = {}) {
    return new Promise(function (resolve, reject) {
        clientApi
            .post(url, data)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function get(url, data = {}) {
    return new Promise(function (resolve, reject) {
        clientApi
            .get(url, {
                params: data
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

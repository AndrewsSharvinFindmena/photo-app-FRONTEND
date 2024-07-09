import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    unAuthorized:false,
    async runRefreshToken(){
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/refresh-token`, {
                token: this.getRefreshToken(),
            });
            const token = response.data.accessToken;
            this.setToken(token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Failed to refresh token', error);
        }
    },
    setUser(value){
        this.set('user',value)
    },
    getUser(){
        return this.get('user');
    },
    removeUser(){
        this.remove('user')
    },
    logout(){
        this.removeUser()
        this.removeToken()
        this.removeRefreshToken()
    },
    removeToken(){
        this.remove('token')
    },
    setToken(value){
        this.set('token',value)
    },
    getToken(){
        return this.get('token');
    },
    removeRefreshToken(){
        this.remove('refreshToken')
    },
    setRefreshToken(value){
        this.set('refreshToken',value)
    },
    getRefreshToken(){
        return this.get('refreshToken');
    },
    set(key, value) {
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key, defaultValue = null) {
        let value = localStorage.getItem(key);
        if (value === undefined || value === null) {
            value = false;
        }
        return JSON.parse(value);
    },
    remove(key) {
        localStorage.removeItem(key);
    },
})
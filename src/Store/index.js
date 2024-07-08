import { reactive } from "vue";
export const store = reactive({
    setUser(value){
        this.set('user',value)
    },
    getUser(){
        return JSON.parse(this.get('user'));
    },
    removeUser(){
        this.remove('user')
    },
    set(key, value) {
        localStorage.setItem(key, value);
    },
    get(key, defaultValue = null) {
        let value = localStorage.getItem(key);
        if (value === undefined || value === null) {
            value = false;
        }
        return value;
    },
    getLocalLanguage() {
        return this.get("language") ? this.get("language") : "en_US";
    },
    setLocalLanguage(value) {
        this.set("language", value);
        this.currentLanguage=value;
    },
    remove(key) {
        localStorage.removeItem(key);
    },
})
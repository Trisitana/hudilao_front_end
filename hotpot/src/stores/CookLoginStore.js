import { defineStore } from 'pinia'

export const CookLoginStore = defineStore("cook", {
     state: () => {
         return { //将这些登录信息存起来
             id: 0,
             account: "",
             token: "",
         }
     },
     actions: {},
     getters: {},
    
 })
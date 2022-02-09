import React, {useState, useMemo, useEffect} from 'react';
import { makeAutoObservable, makeObservable, toJS} from "mobx";
import { observable, computed, configure, action, decorate, runInAction} from 'mobx';
import PostService from '../API/PostService';

class UserStore {

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            user: observable,
            Token: observable,

            login: action,
            logout: action,
        }) 
    }

    isAuth: boolean = false
    Token: string = ''

    user = {
        email: "nun2@gmail.com",
        password: "12345678"
    }

    login = async (email: string, password: string) => {
        
        this.user.email = email
        this.user.password = password

        const res = await PostService.login(this.user)
        
        if(res) {
            runInAction( () => {
                this.Token = res
                this.isAuth = true
            })
            console.log(this.Token)
        }else {
            alert('Логин или пароль не верны')
        }   
    }

    logout = async() => {  
        
        await PostService.logout()
    
        runInAction(() => {
            this.isAuth = false;
            this.Token = ''
        })
    }

}

export default new UserStore();
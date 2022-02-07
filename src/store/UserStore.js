import React, {useState, useMemo, useEffect} from 'react';
import { makeAutoObservable, makeObservable, toJS} from "mobx";
import { observable, computed, configure, action, decorate, runInAction} from 'mobx';
import { observer } from 'mobx-react';
import axios from "axios";
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

    isAuth = false
    Token = ''

    user = {
        email: "nun2@gmail.com",
        password: "12345678"
    }

    login = async (email, password) => {
        
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
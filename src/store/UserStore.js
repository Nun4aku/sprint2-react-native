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
            setUserEmail: action,
            setUserPassword: action,
        }) 
    }

    isAuth = false
    Token = ''

    user = {
        email: "nun2@gmail.com",
        password: "12345678"
    }


    setUserEmail = ( { value } ) => {
        runInAction(() => {
            this.user.email = value
        })
    }
    setUserPassword = ( { value } ) => {
        runInAction(() => {
            this.user.password =  value
        })
    }



    login = async (email, password) => {
        

        this.user.email = email
        this.user.password = password

        const res = await PostService.login(this.user)
        
        runInAction( () => {
            this.Token = res
            this.isAuth = true
        })
        console.log(this.Token)
        

        /*
        axios.post('http://localhost:3000/api/Users/login', this.user)
        .then( (response) => {

                console.log(this.user)
                console.log(response);
                console.log(response.data.id);
                
                runInAction(() => {
                    this.isAuth = true;
                    this.Token = response.data.id;
                })
                console.log(`this.isAuth = ${this.isAuth}`);
                console.log(`this.Token = ${this.Token}`);
                
        })
        .catch(function (error) {
            alert('Не правильный логин или пароль')
        });
      */  
        
    }

    logout = () => {   
        axios.post(`http://176.196.2.67:3000/api/Users/logout?access_token=${this.Token}`)
        localStorage.removeItem('auth')
        localStorage.removeItem('access_token')
        runInAction(() => {
            this.isAuth = false;
        })
        console.log(`this.isAuth = ${this.isAuth}`);
    }

}

export default new UserStore();
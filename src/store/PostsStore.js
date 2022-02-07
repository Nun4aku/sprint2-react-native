import React, {useState, useMemo, useEffect} from 'react';
import { makeAutoObservable, makeObservable, toJS} from "mobx";

import { observable, action, runInAction, computed} from 'mobx';
import { observer } from 'mobx-react';
import PostService from '../API/PostService';
import axios from 'axios';
import UserStore from './UserStore';


class PostsStore {

    constructor() {
        makeObservable(this, {
            posts: observable,
            addPost: observable,
            editPostID: observable,
            onePost: observable,

            getPosts: action,
            addPostFunction: action,
            getOnePost: action,
            delPost: action,
            editOnePost: action,
            
        })
    }

    posts = [];
    post
    
    //функция получения постов с Бэка
    async getPosts() {

        try {
                const res = await PostService.getAll()
                runInAction( () => {
                    this.posts = res.sort( (a,b) => b['id']-a['id'] )
                })
        }
        finally {
            /*
            runInAction( () => {
                //this.isPostLoading = false
            })
            */
        }
    }

    //Добавление поста
    addPost = {
        title: '',
        body: '',
        done: false
    }



    //функция добавления постов
    addPostFunction = async ( title, body ) => {

        this.addPost.title = title
        this.addPost.body = body

        await PostService.addPost(this.addPost)

        runInAction( async () => {
            this.addPost = { title: '', body: '', done: false }
        })
        
        this.getPosts()
        
    }


    //Функция получения одного поста
    editPostID = ''

    onePost = {
        id: '',
        title: '',
        body: '',
        done: false
    }
    

    getOnePost = async (id) => {

        const res = await PostService.getOnePost(id)

        console.log(res)
        if (res.id == id) {
            runInAction( async () => {
                this.onePost = res
            })
        }

        /*
        await axios.get(`http://176.196.2.67:3000/api/tasks/${id}?access_token=${UserStore.Token}`)
            .then( (response) => {
                    
                    console.log(response);
                    //console.log(response.data.id);
                    runInAction( async () => {
                        this.onePost = response.data
                    })
                    
                    return response
            
            })
            .catch(function (error) {
                alert('Что-то пошло не так')
        })
        */
    }

    //Редактирование поста

    editOnePost = async (title, body) => {

        this.onePost.title =  title
        this.onePost.body =  body
        console.log(toJS(this.onePost))
        console.log(this.onePost.id)
        
        await PostService.editOnePost(this.onePost, this.onePost.id)
        await this.getPosts()

        /*
        axios.put(`http://176.196.2.67:3000/api/tasks/${this.editPostID}?access_token=${UserStore.Token}`, this.onePost)
            .then( (response) => {
                    
                    console.log(response);
                    this.getPosts()  
            
            })
            .catch(function (error) {
                alert('Что-то пошло не так')
        })
        */

    }


    //функция удаления постов
    delPost = async (id) => {

        await PostService.delPost(id)
        await this.getPosts()

        /*
        axios.delete(`http://176.196.2.67:3000/api/tasks/${id}?access_token=${UserStore.Token}`)
        .then( (response) => {

                console.log(response);
                console.log(response.status);
                this.getPosts()    

        })
        .catch(function (error) {
            alert('Что-то пошло не так')
        });
        */
    }
}


export default new PostsStore();
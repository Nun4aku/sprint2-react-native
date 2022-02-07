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
            setAddPostTitle: action,
            setAddPostBody: action,
            getOnePost: action,
            delPost: action,
            setEditPostTitle: action,
            setEditPostBody: action,
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
                    this.posts = res
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


    setAddPostTitle = ( { value } ) => {
        runInAction(() => {
            this.addPost.title =  value
        })
    }
    setAddPostBody = ( { value } ) => {
        runInAction(() => {
            this.addPost.body =  value
        })
    }


    //функция добавления постов
    addPostFunction = async ( {valueTitle, valueBody} ) => {

        console.log(valueTitle)
        console.log(valueBody)

        console.log(toJS(this.addPost))

        /*
        await PostService.addPost(this.addPost)

        runInAction( async () => {
            this.addPost = { title: '', body: '', done: false }
        })
        
        this.getPosts()
        */
    }


    //Функция получения одного поста
    editPostID = ''

    onePost = {
        title: '',
        body: '',
        done: false
    }
    

    getOnePost = (id) => {
        axios.get(`http://176.196.2.67:3000/api/tasks/${id}?access_token=${UserStore.Token}`)
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
    }

    //Редактирование поста

    setEditPostTitle = ( { value } ) => {
        runInAction(() => {
            this.onePost.title =  value
        })
    }
    setEditPostBody = ( { value } ) => {
        runInAction(() => {
            this.onePost.body =  value
        })
    }

    editOnePost = () => {

        axios.put(`http://176.196.2.67:3000/api/tasks/${this.editPostID}?access_token=${UserStore.Token}`, this.onePost)
            .then( (response) => {
                    
                    console.log(response);
                    this.getPosts()  
            
            })
            .catch(function (error) {
                alert('Что-то пошло не так')
        })


    }


    //функция удаления постов
    delPost = (id) => {

        axios.delete(`http://176.196.2.67:3000/api/tasks/${id}?access_token=${UserStore.Token}`)
        .then( (response) => {

                console.log(response);
                console.log(response.status);
                this.getPosts()    

        })
        .catch(function (error) {
            alert('Что-то пошло не так')
        });
    }
}


export default new PostsStore();
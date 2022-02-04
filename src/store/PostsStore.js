import React, {useState, useMemo, useEffect} from 'react';
import { makeAutoObservable, makeObservable, toJS} from "mobx";

import { observable, action, runInAction, computed} from 'mobx';
import { observer } from 'mobx-react';
import PostService from '../API/PostService';
import axios from 'axios';


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
                    this.posts = res.sort( (a,b) => b['id'] - a['id'])
                })
        }
        finally {
            runInAction( () => {
                //this.isPostLoading = false
            })
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
    addPostFunction = async () => {
        console.log(toJS(this.addPost))

        
        await PostService.addPost(this.addPost)

        runInAction( async () => {
            this.addPost = { title: '', body: '', done: false }
        })
        
        this.getPosts()
    }


    //Функция получения одного поста
    editPostID = ''

    onePost = {
        title: '',
        body: '',
        done: false
    }
    

    getOnePost = (id) => {
        axios.get(`http://localhost:3000/api/tasks/${id}?access_token=2LFM4hdieZb4fIQfD7zMlOg8n2eME05gNwbswm1Fr6BAnbY4v7yl5APk7iPpAqCv`)
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

        axios.put(`http://localhost:3000/api/tasks/${this.editPostID}?access_token=2LFM4hdieZb4fIQfD7zMlOg8n2eME05gNwbswm1Fr6BAnbY4v7yl5APk7iPpAqCv`, this.onePost)
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

        axios.delete(`http://localhost:3000/api/tasks/${id}?access_token=2LFM4hdieZb4fIQfD7zMlOg8n2eME05gNwbswm1Fr6BAnbY4v7yl5APk7iPpAqCv`)
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
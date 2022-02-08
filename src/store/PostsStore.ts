import React, {useState, useMemo, useEffect} from 'react';
import { makeAutoObservable, makeObservable, toJS} from "mobx";
import { observable, action, runInAction, computed} from 'mobx';
import PostService from '../API/PostService';

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
            sortPostId: action,
            sortPostIdRev: action,
        })
    }

    posts = [];

    
    //функция сортировки постов
    sortPostId = () => {
        runInAction( () => {
            this.posts.sort( (a,b) => b['id']-a['id'] )
            console.log(toJS(this.posts))
        })
    }
    sortPostIdRev = ( sortSelect ) => {
        runInAction( () => {
            this.posts.sort( (a,b) => a['id']-b['id'] )
            console.log(toJS(this.posts))
        })
    }

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
    }

    //Редактирование поста

    editOnePost = async (title, body) => {

        this.onePost.title =  title
        this.onePost.body =  body
        // console.log(toJS(this.onePost))
        // console.log(this.onePost.id)
        await PostService.editOnePost(this.onePost, this.onePost.id)
        await this.getPosts()
    }


    //функция удаления постов
    delPost = async (id) => {

        await PostService.delPost(id)
        await this.getPosts()
    }
}


export default new PostsStore();
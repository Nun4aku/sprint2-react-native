import React, {useState, useMemo, useEffect} from 'react';
import { makeAutoObservable, makeObservable, toJS} from "mobx";
import { observable, action, runInAction, computed} from 'mobx';
import PostService from '../API/PostService';
import type { addPostInterface, onePostInterface } from '../interfaces/Interfaces';


class PostsStore {

    constructor() {
        makeObservable(this, {
            posts: observable,
            addPost: observable,
            editPostID: observable,
            onePost: observable,
            searchQuery: observable,
            sortOrderByID: observable,

            getPosts: action,
            addPostFunction: action,
            getOnePost: action,
            delPost: action,
            editOnePost: action,
            sortPostId: action,
            sortPostIdRev: action,
            setSearchQuery: action,
            doOnePost: action,

            totalPosts: computed,
        })
    }

    posts: onePostInterface[]= [];

    
    //функция сортировки постов
    sortOrderByID = 'UP'

    sortPostId = () => {
        runInAction( () => {
            this.posts.sort( (a, b) => b['id']-a['id'] )
            console.log(toJS(this.posts))
            this.sortOrderByID = 'UP'
        })
    }
    sortPostIdRev = () => {
        runInAction( () => {
            this.posts.sort( (a,b) => a['id']-b['id'] )
            console.log(toJS(this.posts))
            this.sortOrderByID = 'DOWN'
        })
    }

    //функция получения постов с Бэка
    async getPosts() {

        try {
                const res = await PostService.getAll()
                if( res !== undefined) {
                    runInAction( () => {
                        this.posts = res.sort( (a, b) => parseInt(b.id)-parseInt(a.id) )
                        //this.posts = res.sort( (a, b) => b['id']-a['id'] )
                    })
                }
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
    addPost: addPostInterface = {
        title: '',
        body: '',
        done: false
    }

    //функция добавления постов
    addPostFunction = async ( title: string, body:string ) => {

        this.addPost.title = title
        this.addPost.body = body

        await PostService.addPost(this.addPost)

        runInAction( async () => {
            this.addPost = { title: '', body: '', done: false }
        })
        this.getPosts()
    }


    //ID одного поста
    editPostID: string = ''

    //Данные одного поста по ID
    onePost: onePostInterface = {
        id: '',
        title: '',
        body: '',
        done: false
    }
    
    //Функция получения одного поста
    getOnePost = async (id: string): Promise<onePostInterface | undefined> => {

        const res = await PostService.getOnePost(id)
        //console.log(res)

        if (res !== undefined) {
            if (res.id == id) {
                return this.onePost = res
                // runInAction( async () => {
                //     this.onePost = res
                // })
            }
        } else {
            console.log('пост не найден')
        }
    }

    //Редактирование поста
    editOnePost = async (title: string, body:string) => {

        this.onePost.title =  title
        this.onePost.body =  body
        // console.log(toJS(this.onePost))
        // console.log(this.onePost.id)
        await PostService.editOnePost(this.onePost, this.onePost.id)
        await this.getPosts()
    }


    //отметка "выполненно" поста
    doOnePost = async (id: string, item: onePostInterface) => {
        // console.log(id)
        // console.log(item)
        await PostService.doOnePost(id, item)
        await this.getPosts()
        
    }

    //функция удаления постов
    delPost = async (id: string) => {
        await PostService.delPost(id)
        await this.getPosts()
    }

    //Поиск
    searchQuery = ''

    setSearchQuery = (text: string) => {
        runInAction( async () => {
            this.searchQuery = text
        })
    }

    get totalPosts() {
        return this.posts.filter( post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }

}


export default new PostsStore();
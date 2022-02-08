import axios from "axios";
import { toJS } from "mobx";
import UserStore from "../store/UserStore";
export default class PostService {
    

    static async getAll () {

        try {
            const response = await axiosOptions().get('tasks')
            return response.data
    
        } catch (e) {
            console.log(e);
        }
    }

    static  addPost = async (post) => {

        try {
            const response = await axiosOptions().post('tasks', post)
            return response.data
        }
        catch (e) {
            console.log(e);
        }
    }

    static  getOnePost = async (id) => {

        try {
            const response = await axiosOptions().get(`tasks/${id}`)
            return response.data
        }
        catch (e) {
            console.log(e);
        }
    }

    static  editOnePost = async (onePost, id) => {

        try {
            const response = await axiosOptions().put(`tasks/${id}`, onePost)
            //return response.data
        }
        catch (e) {
            console.log(e);
        }
    }


    static  delPost = async (id) => {

        try {
            const response = await axiosOptions().delete(`tasks/${id}`)
            //return response.data
        }
        catch (e) {
            console.log(e);
        }
    }

    
    static  login = async (user) => {

        try {
            
            const response = await axiosOptions().post('Users/login', user)
            return response.data.id
        }
        catch (e) {
            console.log(e);
        }
    }

    static  logout = async () => {

        try {
            await axiosOptions().post('Users/logout', UserStore.Token)
        }
        catch (e) {
            console.log(e);
        }
    }

}


function axiosOptions () {

    const instance = axios.create({
        //baseURL: 'http://localhost:3000/api/',
        baseURL: 'http://176.196.2.67:3000/api/',
        headers: {'access_token': UserStore.Token}
    });

    return instance;
}


import axios from "axios";
import { toJS } from "mobx";
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


    static  login = async (user) => {

        try {
            
            const response = await axiosOptions().post('Users/login', user)
            return response.data.id
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
        headers: {'access_token': 'qmr9XsxxkcEVE4iJ04Hpnw9nUyD6p3HNqijC5l6pWkhKSg1sVMxg9prnq6XlR6PH'}
    });

    return instance;
}

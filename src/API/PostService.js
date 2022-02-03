import axios from "axios";
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

}


function axiosOptions () {

    const instance = axios.create({
        baseURL: 'http://localhost:3000/api/',
        headers: {'access_token': '2LFM4hdieZb4fIQfD7zMlOg8n2eME05gNwbswm1Fr6BAnbY4v7yl5APk7iPpAqCv'}
    });

    return instance;
}

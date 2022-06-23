import axios from 'axios';
const baseUrl = 'http://localhost:4000/api';



//users
export const getUsers = () => {
    return axios.get(baseUrl + '/users', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

//vault-folders
export const newFolder = (data) => {
    return axios.post(baseUrl + 'folders/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getFolders = (id) => {
    return axios.get(baseUrl + 'folders/folderId/'+ id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getFoldershome = () => {
    return axios.get(baseUrl + 'folders/folderId', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getFolder = (id) => {
    return axios.get(baseUrl + 'folders/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const updateFolder = (data) => {
    return axios.put(baseUrl + 'folders/', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const deleteFolder = (id) => {
    return axios.delete(baseUrl + 'folders/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

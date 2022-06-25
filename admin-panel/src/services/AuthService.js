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

//service providers
export const getServiceproviders = () => {
    return axios.get(baseUrl + '/serviceProvider', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

//appointments
export const getAppointments = () => {
    return axios.get(baseUrl + '/appointments', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

//category
export const addcatagory = (data) => {
    return axios.post(baseUrl + '/categories', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const deletecatagory = (id) => {
    return axios.delete(baseUrl + '/categories/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const loadCategories = () => {
    return axios.get(baseUrl + '/categories', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const loadCat = (id) => {
    return axios.get(baseUrl + '/categories/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const editcategory = (data) => {
    return axios.put(baseUrl + '/categories', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


//vault-folders
// export const newFolder = (data) => {
//     return axios.post(baseUrl + 'folders/', data, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// export const getFolders = (id) => {
//     return axios.get(baseUrl + 'folders/folderId/'+ id, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// export const getFoldershome = () => {
//     return axios.get(baseUrl + 'folders/folderId', {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// export const getFolder = (id) => {
//     return axios.get(baseUrl + 'folders/' + id, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// export const updateFolder = (data) => {
//     return axios.put(baseUrl + 'folders/', data, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

// export const deleteFolder = (id) => {
//     return axios.delete(baseUrl + 'folders/' + id, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// };

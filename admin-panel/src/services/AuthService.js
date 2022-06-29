import axios from 'axios';
const baseUrl = 'http://localhost:4000/api';

//users
export const getUsers = () => {
  return axios.get(baseUrl + '/users', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getUser = (id) => {
  return axios.get(baseUrl + '/users/' + id , {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

//get all clients
export const getClients = () => {
  return axios.get(baseUrl + '/users/clients', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

//service providers
export const getServiceproviders = () => {
  return axios.get(baseUrl + '/serviceProvider', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getServiceProvider = (id) => {
  return axios.get(baseUrl + '/serviceProvider/' + id , {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateServiceprovider = (data) => {
  return axios.put(baseUrl + '/serviceProvider/', data, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
};

//appointments
export const getAppointments = () => {
  return axios.get(baseUrl + '/appointments', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getApproveAppointments = () => {
  return axios.get(baseUrl + '/appointments/approve', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getRejectAppointments = () => {
  return axios.get(baseUrl + '/appointments/reject', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
//category
export const addcatagory = (data) => {
  return axios.post(baseUrl + '/categories', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const deletecatagory = (id) => {
  return axios.delete(baseUrl + '/categories/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loadCategories = () => {
  return axios.get(baseUrl + '/categories', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loadCat = (id) => {
  return axios.get(baseUrl + '/categories/' + id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const editcategory = (data) => {
  return axios.put(baseUrl + '/categories', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

//reviews
export const getReviews = (id) => {
  return axios.get(baseUrl + '/reviews/user/'+ id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
import http from './http-common';

const getAll=()=>{
    return http.get('/todos');
};

const get=id=>{
    return http.get(`/todos/${id}`);
};

const create=data=> {
    return http.post('/todos',data);
};

const update=(id,data)=>{
    return http.put(`/todos/${id}`,data);
};

const remove = id => {
    return http.delete(`/todos/${id}`);
  };
  
const removeAll = () => {
    return http.delete('/todos');
  };
  
const findByTitle = title => {
    return http.get(`/todos?title=${title}`);
  };

  export default {getAll,get,create,update,remove,removeAll,findByTitle};
axios.defaults.baseURL = 'https://the-reader-react-1715725e4d83.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.get(serviceUrl, onSuccess, onFailure)
.then(resp => { 
      let result = resp.data;
      onSuccess(result);
})
.catch(error => {
      if(onFailure) {
          return onFailure(error);
      }
})
import axios from "axios";

axios.defaults.baseURL = 'https://the-reader-2a70cde2ef2e.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true
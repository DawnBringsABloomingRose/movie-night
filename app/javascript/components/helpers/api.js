export default class Api {
    constructor() {
        this.api_url = '/api/v1/'
    }

    getCall(location, params = []){
        param_url = params.map((param) => {
            param.key + '=' + param.value
        })
        url = this.api_url + location + '?' + params_url.join('&')
        options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }
        return fetch(url)
            .then((data) => {
            if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
    }
}
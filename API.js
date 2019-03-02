import axios from 'axios';

class API {
    constructor() {
        this._api = axios.create( { baseURL : 'http://know-now.herokuapp.com' } );
    }

    getData() {
        return this._api.get( 'api/v1/dashboard_data' );
    }
}

export default new API();
import axios from 'axios';

class API {
    constructor() {
        this._api = axios.create( { baseURL : 'http://know-now.herokuapp.com' } );
    }

    getLocations() {
        return this._api.get( 'api/v1/locations' );
    }

    getFillByLocations(id) {
        return this._api.get( 'api/v1/fill/' + id );
    }
}

export default new API();
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URI = "http://seaexpen.somee.com/api/";

class UserServices {
    getToken = async () => {
        var token = AsyncStorage.getItem('token');
        return await token
    }

    Login (user) {
        return axios.post(`${ API_URI }user/login`, user);
    }

    async Verify () {
        return axios.get(`${ API_URI }user/userid`, {
            headers: {
                Authorization: `Bearer ${ await this.getToken() }`
            }
        });
    }
}

export default new UserServices()
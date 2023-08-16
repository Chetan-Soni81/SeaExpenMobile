import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URI = "http://seaexpen.somee.com/api/";


class ExpenseService {
    getToken = async () => {
        var token = await AsyncStorage.getItem('token');
        return token;
    }

    async getExpenses () {
        return axios.get(`${ API_URI }expense`, {
            headers: {
                Authorization: `Bearer ${ await this.getToken() }`
            }
        });
    }

    async getExpensesById (id) {
        return axios.get(`${ API_URI }expense/${ id }`, {
            headers: {
                Authorization: `Bearer ${ await this.getToken() }`
            }
        });
    }

    async createExpense (data) {
        return axios.post(`${ API_URI }expense`, data, {
            headers: {
                Authorization: `Bearer ${ await this.getToken() }`
            }
        });
    }

    getCategories () {
        return axios.get(`${ API_URI }category`)
    }
}

export default new ExpenseService()
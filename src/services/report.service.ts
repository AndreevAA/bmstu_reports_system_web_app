import axios from "axios";
import AuthService from "./auth.service";
import {array} from "yup";

const API_URL = "http://localhost:8000/api/v1/reports";
const API_URL_LOGIN = "http://localhost:8000/api/v1/accounts/login";

class ReportService {
    getAllReports() {
        const user = AuthService.getCurrentUser();

        return new Promise((resolve, rej) => {
            axios
                .get(API_URL, {
                    headers: {
                        Authorization: "Bearer " + user.token,
                    },
                })
                .then((response) => {
                    console.log(response.data["reports"]);
                    console.log(response.data["reports"][0]);
                    let res = [];
                    for (let report of response.data["reports"]) {
                        res.push(report);
                    }
                    console.log(typeof res);
                    return resolve(res);
                }).catch(rej);
        });
    }
}

export default new ReportService();

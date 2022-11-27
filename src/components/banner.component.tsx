import { Component } from "react";
import {Link, Navigate} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

type Props = {};

type State = {
    redirect: string | null,
    loading: boolean,
    message: string
};

class CabinetBanner extends Component<Props, State>  {
    constructor(props: Props) {
        super(props);
        this.state = {
            redirect: null,
            loading: false,
            message: ""
        };
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { loading, message } = this.state;

        const initialValues = {
            username: "",
            password: "",
        };

        return (
            <nav className="navbar navbar-expand bg-transparent">
                <Link to={"/"} className="banner primary_text">
                    rs - all reports in one place
                </Link>
            </nav>
        );
    }
}

export default class Banner extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            redirect: null,
            loading: false,
            message: ""
        };
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }

        const { loading, message } = this.state;

        const initialValues = {
            username: "",
            password: "",
        };

        return (
            <nav className="navbar navbar-expand bg-transparent">
                <Link to={"/"} className="banner primary_text">
                    rs - all reports in one place
                </Link>
            </nav>
        );
    }
}

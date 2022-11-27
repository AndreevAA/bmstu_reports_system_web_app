import { Component } from "react";
import {Link, Navigate} from "react-router-dom";

type Props = {};

type State = {
    redirect: string | null,
    loading: boolean,
    message: string
};

export default class Figure extends Component<Props, State> {
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
            <div className="figure-img-light w-100 p-0 m-0">
                <img src="http://localhost:3000/figure.png" className="figure-img-light" alt="sdf"/>
            </div>
        );
    }
}


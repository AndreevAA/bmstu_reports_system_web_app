import React, { Component } from "react";
import {Navigate, Route} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";
import Slogan from "./slogan.component";
import {kMaxLength} from "buffer";

type Props = {};

type State = {
  redirect: string | null,
  username: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      redirect: null,
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      this.setState({ redirect: "/profile" });
    };
  }

  componentWillUnmount() {
    window.location.reload();
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    this.setState({
      message: "",
      loading: true
    });


    AuthService.login(username, password).then(
      () => {
        this.setState({
          redirect: "/profile"
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
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
        <div className="row pt-5 pb-5">
          <div className="col-7 align-self-center">
            {<Slogan />}
          </div>
          <div className="col-4 ">
            <div className="card bg-transparent border-0 shadow-none">
              <h5 className="card-title text-center secondary_header pb-3 sign_in_form_element">SIGN IN</h5>

              <Formik
                  initialValues={initialValues}
                  validationSchema={this.validationSchema}
                  onSubmit={this.handleLogin}
              >
                <Form>
                  <div className="form-group d-flex justify-content-center sign_in_form_element">
                    {/*<label htmlFor="username">Username</label>*/}
                    <Field name="username" type="text" placeholder="username" className="form-control line_edit" />
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger sign_in_form_element"
                    />
                  </div>

                  <div className="form-group d-flex justify-content-center sign_in_form_element">
                    {/*<label htmlFor="password">Password</label>*/}
                    <Field name="password" type="password" placeholder="password" className="form-control line_edit" />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger sign_in_form_element"
                    />
                  </div>

                  <div className="form-group d-flex justify-content-center sign_in_form_element">
                    <button type="submit" className="btn singin_button" disabled={loading}>
                      {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>SIGN IN</span>
                    </button>
                  </div>

                  {message && (
                      <div className="form-group sign_in_form_element">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                  )}
                </Form>
              </Formik>
              <div className="row pt-4 d-flex justify-content-center sign_in_form_element">
                <div className="col-sm-5 ">
                  <a href="/register" className="button_text w-100 align-content-start">SIGN UP</a>
                </div>
                <div className="col-sm-7 pr-0 text-right ">
                  <a href="mailto: support@rs.com" className="pr-0 button_text ">FORGOT PASSWORD?</a>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
}

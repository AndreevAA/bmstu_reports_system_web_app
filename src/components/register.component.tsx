import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";
import {redirect} from "react-router-dom";

type Props = {};

type State = {
  username: string,
  email: string,
  name: string,
  password: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      name: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      name: Yup.string()
          .test(
              "len",
              "The username must be between 3 and 20 characters.",
              (val: any) =>
                  val &&
                  val.toString().length >= 3 &&
                  val.toString().length <= 20
          )
          .required("This field is required!"),
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: { username: string; email: string; name: string; password: string }) {
    const { username, email, name, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      username,
      email,
      name,
      password
    ).then(
      response => {
        this.setState({
          message: "Вы успешно зарегистрировались!",//response.data.message,
          successful: true
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
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      email: "",
      name: "",
      password: "",
    };

    return (
      <div className="col-md-12 pt-5 pb-5">
        <div className="card sign_up_form_element bg-transparent border-0 shadow-none">

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >




            <Form>
              <h5 className="card-title text-center secondary_header pb-3 ">SIGN UP</h5>

              {!successful && (
                <div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <Field name="username" type="text" placeholder="username" className="form-control form-control line_edit" />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="alert alert-danger sign_in_form_element"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <Field name="name" type="name" placeholder="name" className="form-control form-control form-control line_edit" />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="alert alert-danger"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="form-group">
                    <Field name="email" type="email" placeholder="email" className="form-control form-control form-control line_edit" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-group " >
                        <Field
                            name="password"
                            type="password"
                            placeholder="password"
                            className="form-control line_edit"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group ">
                        <Field
                            name="repeat_password"
                            type="password"
                            placeholder="repeat password"
                            className="form-control line_edit"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="form-group d-flex justify-content-center ">
                    <button type="submit" className="btn singin_button">SIGN UP</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}

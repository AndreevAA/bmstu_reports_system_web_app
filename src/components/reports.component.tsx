import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import IUser from "../types/user.type";
import ReportService from "../services/report.service";
import AuthService from "../services/auth.service";
import {array, ObjectSchema} from "yup";

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { token: string },
  allReports: Array<{id: number, header: string, body: string, shortBody: string, labels: [], edited: string}>
}
export default class Reports extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    ReportService.getAllReports().then((res: any)=>{
      this.setState({ allReports  : res })
    });

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { token: "" },
      allReports: []
    };

  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const allReports = ReportService.getAllReports();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser, allReports: allReports, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect}/>
    }

    const {currentUser} = this.state;

    // console.log((this.state.allReports));

    // while (this.state.allReports.next()){
    //
    // }

    const reports = this.state.allReports.map(x=><div>My report {x}</div>)

    for (let i = 0; i <= this.state.allReports.length; i++) {
      console.log(this.state.allReports[i]);
    }

    // @ts-ignore
    return (
        <div className="reports_body">
          {(this.state.userReady) ?
              <div>
                <div className="row">
                  <div className="col-3 sidepannel">
                    <div className="secondary_text">
                      MY REPORTS
                    </div>
                    {/*{this.render_names_list()}*/}

                    <button type="submit" className="btn singin_button">
                      <span>ADD A REPORT</span>
                    </button>
                  </div>
                  <div className="col">
                    <header className="jumbotron">
                      <h3>
                        <strong>{currentUser.username}</strong> Reports
                      </h3>
                    </header>
                    <p>
                      <strong>token:</strong>{" "}
                      {currentUser.token.substring(0, 20)} ...{" "}
                      {currentUser.token.substr(currentUser.token.length - 20)}
                    </p>
                    <p>
                      <strong>Id:</strong>{" "}
                      {currentUser.id}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                      {currentUser.roles &&
                          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                  </div>
                  {reports}
                </div>

              </div> : null}
        </div>
    );
  }
}
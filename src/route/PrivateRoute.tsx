import React from "react";
import { Route, Redirect } from "react-router-dom";
import { EXTRA_FLAT_FORM } from "../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../rootComponents/flatForm";


const PrivateRoute = (props: any) => {
      const { component: Component, USER, ...rest } = props;
      const local = localStorage.getItem("_WEB_TK");
      const sess = window.sessionStorage.getItem("_WEB_TK");
      return (
            <Route
                  {...rest}
                  render={(routeProps: any) =>
                        local || sess ? (
                              <Component {...routeProps} />
                        ) : (
                              <Redirect
                                    to={{
                                          pathname: '/sign-in',
                                          search: '1',
                                          state: { from: routeProps.location }
                                    }}
                              />
                        )
                  }
            />
      )
}
export default PrivateRoute
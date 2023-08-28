import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router,Switch } from "react-router-dom";
import { SWRConfig } from "swr";
import Application from "./containers/layouts/application";
import NewLayout from "./containers/layouts/newLayout";
import store from "./store";
import "common/src/template/css/bootstrap.min.css";
import "common/src/template/font-awesome/css/font-awesome.css";
import "common/src/template/css/plugins/iCheck/custom.css";
import "common/src/template/css/animate.css";
import "common/src/template/css/style.css";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-notifications-component/dist/theme.css";
import "react-circular-progressbar/dist/styles.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-datepicker/dist/react-datepicker.css";
import "bs-stepper/dist/css/bs-stepper.min.css";
import "common/src/css/index.css";
import "common/src/css/assets-index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactNotification from "react-notifications-component";
import SWRMiddlewares from "common/src/swr/middlewares";
import { createBrowserHistory } from "history";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "react-loader-spinner";
const  GuestRoutes= React.lazy(()=>import("./routes/guest")) ;
const  StudentRoutes=React.lazy(()=>import("./routes/student")) ;
const  TeacherRoutes=React.lazy(()=>import("./routes/teacher")) ;
const  AdminRoutes=React.lazy(()=>import("./routes/admin")) ;

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={ store }>
    <Suspense fallback={
      <div className="d-flex w-100 h-100 align-items-center justify-content-center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={ 100 }
          width={ 100 }
        />
      </div>
    }>
      <SWRConfig value={ { use:SWRMiddlewares } } >
        <ReactNotification />
        <Router history={ history }>
          <NewLayout />
          <Application>
            <Switch>
              <Route path="/admin">
                <AdminRoutes/>
              </Route>
              <Route path="/teacher">
                <TeacherRoutes/>
              </Route>
              <Route path="/student">
                <StudentRoutes/>
              </Route>
              <GuestRoutes/>
            </Switch>
          </Application>
        </Router>
      </SWRConfig>
    </Suspense>
  </Provider>
  ,
  document.getElementById("root")
);

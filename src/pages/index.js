import { Route, Switch } from "react-router-dom";
import PersistentDrawerRight from "../components/mainlayout";
import { StyledEngineProvider } from "@mui/material/styles";
import Home from "./Home";
import Employee from "./Employee/Employee";
import AddEmployee from "./Employee/AddEmployee";
import OneEmployee from "./Employee/OneEmployee";
import EditEmployee from "./Employee/EditEmployee";
import NewsForm from "./news/NewsForm";
import OneNews from "./news/OneNews";
import EditNewsForm from "./news/EditNewsForm";
import News from "./news/News";
import AddPartner from "./Partner/AddPartner";
import OnePartner from "./Partner/OnePartner";
import EditPartner from "./Partner/EditPartner";
import Partner from "./Partner/Partner";
import User from "./users/User"
import OneUser from "./users/OneUser"

const PagesRoutes = () => {
  return (
    <StyledEngineProvider injectFirst>
      <PersistentDrawerRight>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/news" component={News} />
          <Route path="/news/new" component={NewsForm} />
          <Route exact path="/news/:id" component={OneNews} />
          <Route exact path="/news/edit/:id" component={EditNewsForm} />

          
          <Route exact path="/user" component={User} />
          <Route exact path="/user/:id" component={OneUser} />

          <Route exact path="/partner" component={Partner} />
          <Route path="/partner/new" component={AddPartner} />
          <Route exact path="/partner/:id" component={OnePartner} />
          <Route exact path="/partner/edit/:id" component={EditPartner} />

          <Route exact path="/employee" component={Employee} />
          <Route path="/employee/add-employee" component={AddEmployee} />
          <Route path="/employee/edit/:id" component={EditEmployee} />
          <Route exact path="/employee/:id" component={OneEmployee} />


        </Switch>
      </PersistentDrawerRight>
    </StyledEngineProvider>
  );
};

export default PagesRoutes;

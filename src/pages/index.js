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
import TrainForm from "./Train/TrainForm";
import OneTrain from "./Train/OneTrain";
import EditTrainForm from "./Train/EditTrainForm";
import Train from "./Train/Train";


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

          <Route exact path="/train" component={Train} />
          <Route path="/train/new" component={TrainForm} />
          <Route exact path="/train/:id" component={OneTrain} />
          <Route exact path="/train/edit/:id" component={EditTrainForm} />
     
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

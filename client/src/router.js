import { Route, BrowserRouter, Switch } from "react-router-dom";
import React, {useState} from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Search from "./components/search";
import Details from "./components/details";
import Pagenotfound from "./components/404";
import Chat from "./components/Chat";
import Form from "./components/Form";
import OrderSuccessMessage from "./OrderSuccessMessage";
import Footer from "./components/Footer";
import AboutUsPage from "./components/AboutUsPage"
// import AuthContext from "./shared/authContext";

const Router = () => {
  const [name, setName] = useState("");
  const handleName = (name) => {
    setName(name);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/details/:id" component={Details}></Route>
        <Route exact path="/search" component={Search}></Route>
        <Route path='/chat' render={() => <div>{
        name?
        <Chat name={ name }/>:
        <Form handleName={ handleName }/>
      }</div>}/>
        <Route exact path="/About" component={AboutUsPage}></Route>
        <Route exact path="/success" component={OrderSuccessMessage}></Route>
        <Route component={Pagenotfound}></Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

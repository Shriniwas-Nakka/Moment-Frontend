import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MainPage from "../../pages/Main Page/MainPage";
import Dashboard from "../../pages/Dasgboard/Dashboard";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Redirect exact from="/" to="/signin" />
                <Route path="/" component={MainPage} />
            </Switch>
        </BrowserRouter>
    )
}
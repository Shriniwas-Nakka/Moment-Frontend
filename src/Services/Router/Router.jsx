import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MainPage from "../../pages/Main Page/MainPage";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/signin" />
                <Route path="/" component={MainPage} />
            </Switch>
        </BrowserRouter>
    )
}
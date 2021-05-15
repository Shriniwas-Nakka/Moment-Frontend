import './MainPage.scss';
import logo from "../../assets/images/logo.png";
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import { Route } from 'react-router-dom';

export default function MainPage() {
    return (
        <div className="container">
            <img src={logo} alt="" className="logo" />
            <div className="inner-container">
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
            </div>
        </div>
    )
}
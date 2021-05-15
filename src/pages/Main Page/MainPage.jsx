import './MainPage.scss';
import logo from "../../assets/images/logo.png";
import SignUp from '../../components/SignUp/SignUp';

export default function MainPage() {
    return (
        <div className="container">
            <img src={logo} alt="" className="logo" />
            <div className="inner-container">
                <SignUp />
            </div>
        </div>
    )
}
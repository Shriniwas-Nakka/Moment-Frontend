import InputField from '../InputField/InputField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsIcon from '@material-ui/icons/Https';
import './SignIn.scss';
import { useState } from 'react';

export default function SignIn(props) {

    const [show, setShow] = useState(false);

    let handleRedirect = () => {
        props.history.push('/signup');
    }

    let handlePasswordShow = () => {
        setShow(!show);
    }

    return (
        <div className="signin-container">
            <h1 className="s-c-title">Sign In</h1>
            <h4 className="s-c-text">To start using the app</h4>
            <div className="s-c-inputfield">
                <div className="s-c-i-row">
                    <InputField label="Email ID" placeholder="Enter Email ID" icon={<MailOutlineIcon />} style={{ width: '100%' }} type="email" />
                    <InputField label="Password" placeholder="Enter Password" icon={<HttpsIcon />} style={{ width: '100%' }} type="password" handlePasswordShow={handlePasswordShow} passwordHide={show} />
                </div>
            </div>
            <button className="s-c-button">Sign In</button>
            <p className="s-c-member">Not a member ? <span className="s-c-signin" onClick={handleRedirect}>Sign Up</span></p>
        </div>
    )
}
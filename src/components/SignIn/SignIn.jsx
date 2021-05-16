import InputField from '../InputField/InputField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsIcon from '@material-ui/icons/Https';
import './SignIn.scss';
import { useState } from 'react';

export default function SignIn(props) {

    const [show, setShow] = useState(true);
    const [state, setState] = useState({
        email: '',
        emailFlag: false,
        emailErrorMessage: '',
        password: '',
        passwordFlag: false,
        passwordErrorMessage: ''
    });

    let handleRedirect = () => {
        props.history.push('/signup');
    }

    let handlePasswordShow = () => {
        setShow(!show);
    }

    let handleChange = (e) => {
        setState({
            ...state, [e.target.name]: e.target.value
        })
    }

    let validate = () => {
        setState(prev => ({
            ...prev,
            emailFlag: false,
            emailErrorMessage: '',
            passwordFlag: false,
            passwordErrorMessage: ''
        }))
        let valid = true;
        if (state.email.length == 0) {
            setState(prev => ({
                ...prev,
                emailFlag: true, emailErrorMessage: 'Email is required !'
            }))
            valid = false;
        }
        if (state.email.trim().length > 0 && !state.email.includes('@')) {
            setState(prev => ({
                ...prev,
                emailFlag: true,
                emailErrorMessage: 'Email is invalid !'
            }))
            valid = true;
        }
        if (state.password.length == 0) {
            setState(prev => ({
                ...prev,
                passwordFlag: true, passwordErrorMessage: 'Password is required !'
            }))
            valid = false;
        }
        return valid;
    }

    let submit = () => {
        if (validate()) {
            console.log('Valid !');
            console.log(state);
        } else {
            console.log('Invalid !');
        }
    }

    return (
        <div className="signin-container">
            <h1 className="s-c-title">Sign In</h1>
            <h4 className="s-c-text">To start using the app</h4>
            <div className="s-c-inputfield">
                <div className="s-c-i-row">
                    <InputField name="email" label="Email ID" placeholder="Enter Email ID" icon={<MailOutlineIcon />} style={{ width: '100%' }} type="email" handleChange={handleChange} error={state.emailFlag} errorMessage={state.emailErrorMessage} />
                    <InputField name="password" label="Password" placeholder="Enter Password" icon={<HttpsIcon />} style={{ width: '100%' }} type="password" handleChange={handleChange} error={state.passwordFlag} errorMessage={state.passwordErrorMessage} handlePasswordShow={handlePasswordShow} passwordHide={show} />
                </div>
            </div>
            <button className="s-c-button" onClick={submit}>Sign In</button>
            <p className="s-c-member">Not a member ? <span className="s-c-signin" onClick={handleRedirect}>Sign Up</span></p>
        </div>
    )
}
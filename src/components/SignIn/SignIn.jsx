import InputField from '../InputField/InputField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsIcon from '@material-ui/icons/Https';
import UserService from '../../Services/userService';
import SnackBar from '../../components/SnackBar/SnackBar';
import './SignIn.scss';
import { useState } from 'react';

const userService = new UserService();

export default function SignIn(props) {

    const [show, setShow] = useState(true);
    const [snakbar, setSnakbar] = useState({
        open: false,
        message: ''
    });
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
            let data = {
                email: state.email,
                password: state.password
            };
            userService.signIn(data).then(data => {
                localStorage.setItem('userdata', JSON.stringify(data.data.data));
                setSnakbar({
                    open: true,
                    message: data.data.message
                })
                setTimeout(() => {
                    setState({
                        email: '',
                        emailFlag: false,
                        emailErrorMessage: '',
                        password: '',
                        passwordFlag: false,
                        passwordErrorMessage: ''
                    })
                    props.history.push('/dashboard/addMoment');
                }, 3000)
            }).catch(error => {
                setSnakbar({
                    open: true,
                    message: 'Failed to login !'
                })
                setState({
                    email: '',
                    emailFlag: false,
                    emailErrorMessage: '',
                    password: '',
                    passwordFlag: false,
                    passwordErrorMessage: ''
                })
            })
        } else {
            console.log('Invalid !');
        }
    }

    let closeSnackbar = () => {
        setSnakbar({
            open: false,
            message: ''
        })
    }

    return (
        <div className="signin-container">
            <h1 className="s-c-title">Sign In</h1>
            <h4 className="s-c-text">To start using the app</h4>
            <div className="s-c-inputfield">
                <div className="s-c-i-row">
                    <InputField name="email" value={state.email} label="Email ID" placeholder="Enter Email ID" icon={<MailOutlineIcon />} style={{ width: '100%' }} type="email" handleChange={handleChange} error={state.emailFlag} errorMessage={state.emailErrorMessage} />
                    <InputField name="password" value={state.password} label="Password" placeholder="Enter Password" icon={<HttpsIcon />} style={{ width: '100%' }} type="password" handleChange={handleChange} error={state.passwordFlag} errorMessage={state.passwordErrorMessage} handlePasswordShow={handlePasswordShow} passwordHide={show} />
                </div>
            </div>
            <button className="s-c-button" onClick={submit}>Sign In</button>
            <p className="s-c-member">Not a member ? <span className="s-c-signin" onClick={handleRedirect}>Sign Up</span></p>
            <SnackBar open={snakbar.open} close={closeSnackbar} message={snakbar.message} />
        </div>
    )
}
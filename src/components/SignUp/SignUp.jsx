import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InputField from '../InputField/InputField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsIcon from '@material-ui/icons/Https';
import CallIcon from '@material-ui/icons/Call';
import UserService from '../../Services/userService';
import SnackBar from '../../components/SnackBar/SnackBar';
import './SignUp.scss';
import { useState } from 'react';

const userService = new UserService();

export default function SignUp(props) {

    const [show, setShow] = useState(false);
    const [snakbar, setSnakbar] = useState({
        open: false,
        message: ''
    });
    const [state, setState] = useState({
        firstName: '',
        firstNameFlag: false,
        firstNameErrorMessage: '',
        lastName: '',
        lastNameFlag: false,
        lastNameErrorMessage: '',
        mobile: '',
        mobileFlag: false,
        mobileErrorMessage: '',
        city: '',
        cityFlag: false,
        cityErrorMessage: '',
        email: '',
        emailFlag: false,
        emailErrorMessage: '',
        password: '',
        passwordFlag: false,
        passwordErrorMessage: ''
    });

    let handleRedirect = () => {
        props.history.push('/signin');
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
            firstNameFlag: false,
            firstNameErrorMessage: '',
            lastNameFlag: false,
            lastNameErrorMessage: '',
            mobileFlag: false,
            mobileErrorMessage: '',
            cityFlag: false,
            cityErrorMessage: '',
            emailFlag: false,
            emailErrorMessage: '',
            passwordFlag: false,
            passwordErrorMessage: ''
        }))
        let valid = true;

        if (state.firstName.length == 0) {
            setState(prev => ({
                ...prev,
                firstNameFlag: true, firstNameErrorMessage: 'First Name is required !'
            }))
            valid = false;
        }
        if (state.lastName.length == 0) {
            setState(prev => ({
                ...prev,
                lastNameFlag: true, lastNameErrorMessage: 'Last Name is required !'
            }))
            valid = false;
        }
        if (state.mobile.length == 0) {
            setState(prev => ({
                ...prev,
                mobileFlag: true, mobileErrorMessage: 'Mobile is required !'
            }))
            valid = false;
        }
        if (state.city.length == 0) {
            setState(prev => ({
                ...prev,
                cityFlag: true, cityErrorMessage: 'City is required !'
            }))
            valid = false;
        }
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
        console.log(state);
        if (validate()) {
            let data = {
                firstName: state.firstName,
                lastName: state.lastName,
                city: state.city,
                mobile: state.mobile,
                email: state.email,
                password: state.password
            };
            console.log(data);
            userService.signUp(data).then(data => {
                setSnakbar({
                    open: true,
                    message: data.data.message
                })
                setTimeout(() => {
                    setState({
                        firstName: '',
                        firstNameFlag: false,
                        firstNameErrorMessage: '',
                        lastName: '',
                        lastNameFlag: false,
                        lastNameErrorMessage: '',
                        mobile: '',
                        mobileFlag: false,
                        mobileErrorMessage: '',
                        city: '',
                        cityFlag: false,
                        cityErrorMessage: '',
                        email: '',
                        emailFlag: false,
                        emailErrorMessage: '',
                        password: '',
                        passwordFlag: false,
                        passwordErrorMessage: ''
                    })
                    props.history.push('/signin');
                }, 3000)
            }).catch(error => {
                setSnakbar({
                    open: true,
                    message: 'Failed to register !'
                })
                setState({
                    firstName: '',
                    firstNameFlag: false,
                    firstNameErrorMessage: '',
                    lastName: '',
                    lastNameFlag: false,
                    lastNameErrorMessage: '',
                    mobile: '',
                    mobileFlag: false,
                    mobileErrorMessage: '',
                    city: '',
                    cityFlag: false,
                    cityErrorMessage: '',
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
        <div className="signup-container">
            <h1 className="s-c-title">Sign Up</h1>
            <h4 className="s-c-text">To be a member</h4>
            <div className="s-c-inputfield">
                <div className="s-c-i-row">
                    <InputField name="firstName" value={state.firstName} label="First Name" placeholder="Enter First Name" icon={<PermIdentityIcon />} style={{ width: '100%', marginRight: '15%' }} handleChange={handleChange} error={state.firstNameFlag} errorMessage={state.firstNameErrorMessage} />
                    <InputField name="lastName" value={state.lastName} label="Last Name" placeholder="Enter Last Name" icon={<PermIdentityIcon />} style={{ width: '100%' }} handleChange={handleChange} error={state.lastNameFlag} errorMessage={state.lastNameErrorMessage} />
                </div>
                <div className="s-c-i-row">
                    <InputField name="mobile" value={state.mobile} label="Mobile No" placeholder="Enter Mobile Number" icon={<CallIcon />} type="tel" style={{ width: '100%', marginRight: '15%' }} handleChange={handleChange} error={state.mobileFlag} errorMessage={state.mobileErrorMessage} />
                    <InputField name="email" value={state.email} label="Email ID" placeholder="Enter Email ID" icon={<MailOutlineIcon />} type="email" style={{ width: '100%' }} handleChange={handleChange} error={state.emailFlag} errorMessage={state.emailErrorMessage} />
                </div>
                <div className="s-c-i-row">
                    <InputField name="city" value={state.city} label="City" placeholder="Enter City" style={{ width: '100%', marginRight: '15%' }} handleChange={handleChange} error={state.cityFlag} errorMessage={state.cityErrorMessage} />
                    <InputField name="password" value={state.password} label="Password" placeholder="Enter Password" icon={<HttpsIcon />} type="password" style={{ width: '100%' }} handlePasswordShow={handlePasswordShow} passwordHide={show} handleChange={handleChange} error={state.passwordFlag} errorMessage={state.passwordErrorMessage} />
                </div>
            </div>
            <button className="s-c-button" onClick={submit}>Submit</button>
            <p className="s-c-member">Already a member ? <span className="s-c-signin" onClick={handleRedirect}>Sign In</span></p>
            <SnackBar open={snakbar.open} close={closeSnackbar} message={snakbar.message} />
        </div>
    )
}
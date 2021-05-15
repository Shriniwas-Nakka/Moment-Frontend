import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InputField from '../InputField/InputField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsIcon from '@material-ui/icons/Https';
import CallIcon from '@material-ui/icons/Call';
import './SignUp.scss';

export default function SignUp(props) {

    let handleRedirect = () => {
        props.history.push('/signin');
    }

    return (
        <div className="signup-container">
            <h1 className="s-c-title">Sign Up</h1>
            <h4 className="s-c-text">To be a member</h4>
            <div className="s-c-inputfield">
                <div className="s-c-i-row">
                    <InputField label="First Name" placeholder="Enter First Name" icon={<PermIdentityIcon />} style={{ width: '100%', marginRight: '15%' }} />
                    <InputField label="Last Name" placeholder="Enter Last Name" icon={<PermIdentityIcon />} style={{ width: '100%' }} />
                </div>
                <div className="s-c-i-row">
                    <InputField label="Mobile No" placeholder="Enter Mobile Number" icon={<CallIcon />} type="tel" style={{ width: '100%', marginRight: '15%' }} />
                    <InputField label="Email ID" placeholder="Enter Email ID" icon={<MailOutlineIcon />} type="email" style={{ width: '100%' }} />
                </div>
                <div className="s-c-i-row">
                    <InputField label="City" placeholder="Enter City" style={{ width: '100%', marginRight: '15%' }} />
                    <InputField label="Password" placeholder="Enter Password" icon={<HttpsIcon />} type="password" style={{ width: '100%' }} />
                </div>
            </div>
            <button className="s-c-button">Submit</button>
            <p className="s-c-member">Already a member ? <span className="s-c-signin" onClick={handleRedirect}>Sign In</span></p>
        </div>
    )
}
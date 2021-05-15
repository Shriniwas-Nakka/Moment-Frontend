import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InputField from '../InputField/InputField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HttpsIcon from '@material-ui/icons/Https';
import CallIcon from '@material-ui/icons/Call';
import './SignUp.scss';

export default function SignUp() {
    return (
        <div className="signup-container">
            <h1 className="s-c-title">Sign Up</h1>
            <h4 className="s-c-text">To be a member</h4>
            <div className="s-c-inputfield">
                <div className="s-c-i-row">
                    <InputField label="First Name" placeholder="Enter First Name" icon={<PermIdentityIcon />} />
                    <InputField label="Last Name" placeholder="Enter Last Name" icon={<PermIdentityIcon />} />
                </div>
                <div className="s-c-i-row">
                    <InputField label="Mobile No" placeholder="Enter Mobile Number" icon={<CallIcon />} />
                    <InputField label="Email ID" placeholder="Enter Email ID" icon={<MailOutlineIcon />} />
                </div>
                <div className="s-c-i-row">
                    <InputField label="City" placeholder="Enter City" />
                    <InputField label="Password" placeholder="Enter Password" icon={<HttpsIcon />} />
                </div>
            </div>
            <button className="s-c-button">Submit</button>
            <p className="s-c-member">Already a member ? <span className="s-c-signin">Sign In</span></p>
        </div>
    )
}
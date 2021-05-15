import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import PersonIcon from '@material-ui/icons/Person';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import './InputField.scss'
import InputAdornment from '@material-ui/core/InputAdornment';

export default function InputField(props) {
    return (
        <div className="inputField-Container">
            <span className="i-c-label">{props.label}</span>
            <div className="i-c-box">
                {props.icon &&
                    <div className="i-c-icon">
                        {props.icon}
                    </div>
                }
                {props.mobileIcon === "mobile" &&
                    <TextField
                        // className="i-c-icon"
                        // margin="dense"
                        style={{ marginRight: '5px' }}
                        id="standard-select-currency-native"
                        select
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle style={{ color: 'lightgrey', width: '40px' }} />
                                </InputAdornment>
                            ),
                        }}
                        // value={currency}
                        // onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                    />
                }
                <TextField
                    id="standard-full-width"
                    placeholder={props.placeholder}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        </div>
    )
}
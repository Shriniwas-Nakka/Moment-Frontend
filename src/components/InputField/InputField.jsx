import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import './InputField.scss'

export default function InputField(props) {

    let handleChange = e => {
        props.handleChange(e);
    }

    return (
        <div className="inputField-Container" style={{ ...props.style }}>
            <span className="i-c-label">{props.label}</span>
            <div className="i-c-box">
                {props.icon &&
                    <div className="i-c-icon">
                        {props.icon}
                    </div>
                }
                {props.passwordHide}
                <TextField
                    type={props.passwordHide ? 'password' : 'text' || props.type}
                    id="standard-full-width"
                    placeholder={props.placeholder}
                    fullWidth
                    size="small"
                    name={props.name}
                    value={props.value}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={props.error}
                    helperText={props.errorMessage}
                    InputProps={{
                        endAdornment:
                            props.type === "password" && <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={props.handlePasswordShow}
                                >
                                    {props.passwordHide ? <VisibilityOff style={{ color: 'lightgrey' }} /> : <Visibility style={{ color: 'lightgrey' }} />}
                                </IconButton>
                            </InputAdornment>

                    }}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
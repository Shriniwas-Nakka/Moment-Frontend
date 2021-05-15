import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import './InputField.scss'

export default function InputField(props) {
    return (
        <div className="inputField-Container" style={{ ...props.style }}>
            <span className="i-c-label">{props.label}</span>
            <div className="i-c-box">
                {props.icon &&
                    <div className="i-c-icon">
                        {props.icon}
                    </div>
                }
                {/* {props.mobileIcon === "mobile" &&
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
                } */}
                <TextField
                    type={props.type}
                    id="standard-full-width"
                    placeholder={props.placeholder}
                    fullWidth
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment:
                            props.type === "password" && <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                >
                                    <Visibility />
                                    {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                </IconButton>
                            </InputAdornment>

                    }}
                />
            </div>
        </div>
    )
}
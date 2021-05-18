import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputField from '../InputField/InputField';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import MomentService from '../../Services/momentService';
import SnackBar from '../../components/SnackBar/SnackBar';
import Tag from '../Tag/Tag';
import Avatar from '@material-ui/core/Avatar';
import './AddMoment.scss';

const momentService = new MomentService();

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        width: '98%',
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            justifyContent: 'flex-start'
        }
    },
    table: {
        minWidth: 650,
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    }
}));

export default function AddMoment(props) {
    const classes = useStyles();
    const [tags, setTags] = React.useState([]);
    const [moments, setMoments] = React.useState([]);
    const [image, setImage] = React.useState("");
    const [state, setState] = React.useState({
        title: '',
        titleFlag: false,
        titleErrorMessage: '',
        tagFlag: false,
        tagErrorMessage: ''
    });
    const inputFile = React.useRef(null);
    const [snakbar, setSnakbar] = React.useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('userdata')).token
        momentService.getMoment(token).then(data => {
            setMoments(data.data.data)
        })
    }, [])

    const addTags = e => {
        if (e.key === "Enter" && e.target.value !== "") {
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
    };

    const removeTag = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
            const filename = files[0].name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            console.log("fileType", fileType);
            setImage(files[0]);
        }
    };

    const onHandleBrowse = () => {
        inputFile.current.click();
    };

    let handleChange = (e) => {
        setState({
            ...state, [e.target.name]: e.target.value
        })
    }

    let validate = () => {
        setState(prev => ({
            ...prev,
            titleFlag: false,
            titleErrorMessage: '',
            tagFlag: false,
            tagErrorMessage: ''
        }))
        let valid = true;
        if (state.title.length == 0) {
            setState(prev => ({
                ...prev,
                titleFlag: true, titleErrorMessage: 'Title is required !'
            }))
            valid = false;
        }
        if (tags.length == 0) {
            setState(prev => ({
                ...prev,
                tagFlag: true, tagErrorMessage: 'Tag is required !'
            }))
            valid = false;
        }
        if (image.length == 0) {
            setSnakbar({
                open: true,
                message: 'Image is required !'
            })
            valid = false;
        }
        return valid;
    }

    let submit = () => {
        if (validate()) {
            let formdata = new FormData();
            formdata.append('title', state.title);
            tags.forEach(element => {
                formdata.append('tags', element);
            });
            formdata.append('image', image);

            let token = JSON.parse(localStorage.getItem('userdata')).token;

            momentService.createMoment(formdata, token).then(data => {
                setSnakbar({
                    open: true,
                    message: data.data.message
                })
                setState({
                    title: '',
                    titleFlag: false,
                    titleErrorMessage: '',
                    tagFlag: false,
                    tagErrorMessage: ''
                });
                setImage('');
                setTags([]);
            }).catch(error => {
                setSnakbar({
                    open: true,
                    message: 'Failed to create moment !'
                })
                setState({
                    title: '',
                    titleFlag: false,
                    titleErrorMessage: '',
                    tagFlag: false,
                    tagErrorMessage: ''
                });
                setImage('');
                setTags([]);
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
        <div className="a-m-container">
            <div className="a-m-header"><span className="a-m-h-title">{props.title}</span></div>
            { props.type === "add" && <div className="a-m-box">
                <InputField name="title" value={state.title} label="Title" placeholder="Sample title" style={{ width: '100%' }} type="text" handleChange={handleChange} error={state.titleFlag} errorMessage={state.titleErrorMessage} />
                <div className="a-m-add-tags">
                    <div className="a-m-tag">
                        <div className="a-m-input-tag">
                            <TextField
                                className={classes.margin}
                                id="input-with-icon-textfield"
                                label="Tags"
                                name="tags"
                                placeholder="Enter tags"
                                fullWidth
                                multiline
                                error={state.tagFlag}
                                helperText={state.tagErrorMessage}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            {tags.map((tag, index) => (
                                                <Tag name={tag} index={index} removeTag={removeTag} />
                                            ))}
                                        </InputAdornment>
                                    ),
                                }}
                                onKeyUp={e => addTags(e)}
                            />
                        </div>
                    </div>
                    <div className="a-m-upload">
                        <div className='drag-drop-zone'
                        // oagEnter={e => handleDragEnter(e)}
                        // onDrnDrop={e => handleDrop(e)}
                        // onDragOver={e => handleDragOver(e)}
                        // onDragLeave={e => handleDragLeave(e)}
                        >
                            <CloudUploadOutlinedIcon className="d-d-icon" />
                            <p>Drag and drop file</p>
                            <span>OR</span>
                            <input type="file"
                                ref={inputFile}
                                onChange={handleFileUpload}
                                className="d-d-button"
                                style={{ display: 'none' }} />
                            <button className="d-d-button" onClick={onHandleBrowse}>Browse</button>
                        </div>
                    </div>
                </div>
            </div>}
            {props.type === "add" && <button className="d-d-submit" onClick={submit}>Submit</button>}
            {props.type === "list" &&
                <div className={classes.container}>
                    <TableContainer component={Paper} className={classes.container}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" >Sr.No<ArrowUpwardOutlinedIcon fontSize="small" className="table-icon" /></TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Title<ArrowUpwardOutlinedIcon fontSize="small" className="table-icon" /></TableCell>
                                    <TableCell align="center">Tags<ArrowUpwardOutlinedIcon fontSize="small" className="table-icon" /></TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {moments.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell align="center" component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            {/* <img src={row.image} alt="" /> */}
                                            <Avatar alt={row.image} src="" className={classes.small} >{row.image.charAt(0)}</Avatar>
                                        </TableCell>
                                        <TableCell align="center">{row.title}</TableCell>
                                        <TableCell align="center" style={{ display: 'flex', minHeight: '50px', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                                            {row.tags.map((tag, index) => (
                                                <Tag name={tag} index={index} />
                                            ))}
                                        </TableCell>
                                        <TableCell align="center">
                                            <EditOutlinedIcon style={{ marginRight: '8px' }} className="table-icon" />
                                            <DeleteOutlineIcon className="table-icon" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
            <SnackBar open={snakbar.open} close={closeSnackbar} message={snakbar.message} />
        </div>
    )

}
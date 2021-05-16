import React from 'react';
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
import Tag from '../Tag/Tag';
import './AddMoment.scss';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        width: '98%',
    },
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function AddMoment(props) {
    const classes = useStyles();
    const [tags, setTags] = React.useState([]);
    const [image, setImage] = React.useState("");
    const inputFile = React.useRef(null);

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

    return (
        <div className="a-m-container">
            <div className="a-m-header"><span className="a-m-h-title">{props.title}</span></div>
            { props.type === "add" && <div className="a-m-box">
                <InputField label="Title" placeholder="Sample title" style={{ width: '100%' }} type="text" />
                <div className="a-m-add-tags">
                    <div className="a-m-tag">
                        <div className="a-m-input-tag">
                            <TextField
                                className={classes.margin}
                                id="input-with-icon-textfield"
                                label="Tags"
                                placeholder="Enter tags"
                                fullWidth
                                multiline
                                // rows={4}
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
            {props.type === "add" && <button className="d-d-submit">Submit</button>}
            {props.type === "list" &&
                <div className={classes.container}>
                    <TableContainer component={Paper} className={classes.container}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Sr.No<ArrowUpwardOutlinedIcon fontSize="small" className="table-icon" /></TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Title<ArrowUpwardOutlinedIcon fontSize="small" className="table-icon" /></TableCell>
                                    <TableCell align="center">Tags<ArrowUpwardOutlinedIcon fontSize="small" className="table-icon" /></TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center"><img src="" alt="" /></TableCell>
                                        <TableCell align="center">{row.fat}</TableCell>
                                        <TableCell align="center">{row.carbs}</TableCell>
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
        </div>
    )

}
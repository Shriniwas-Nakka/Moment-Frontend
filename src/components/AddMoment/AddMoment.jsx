import InputField from '../InputField/InputField';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import './AddMoment.scss';

export default function AddMoment() {

    return (
        <div className="a-m-container">
            <div className="a-m-header"><span className="a-m-h-title">Add new moment</span></div>
            <div className="a-m-box">
                <InputField label="Title" placeholder="Sample title" style={{ width: '100%' }} type="text" />
                <div className="a-m-add-tags">
                    <div className="a-m-tag">
                        <InputField label="Tags" placeholder="Enter tags" style={{ width: '100%' }} type="text" />
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
                            <button className="d-d-button">Browse</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="d-d-submit">Submit</button>
        </div>
    )

}
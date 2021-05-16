import './Tag.scss';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

export default function Tag(props) {

    const removeTags = index => {
        props.removeTag(index);
    }

    return (
        <div className="tag-body">
            {props.name}
            <CancelRoundedIcon className="t-b-close" onClick={() => removeTags(props.index)} />
        </div>
    )
}
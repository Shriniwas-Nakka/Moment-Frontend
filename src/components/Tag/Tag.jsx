import './Tag.scss';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

export default function Tag(props) {
    return (
        <div className="tag-body">
            {props.name}
            <CancelRoundedIcon className="t-b-close" />
        </div>
    )
}
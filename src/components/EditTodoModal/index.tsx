// import TooltipContent from 'components/TooltipContent';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { selectTodoCategories } from '../../../src/store';
import TooltipContent from '../TooltipContent';

const EditTodoModal = (): ReactElement => {
    const todoCategories = useSelector(selectTodoCategories);

    useEffect(() => {
        ReactTooltip.rebuild(); //Rebuild event listeners
    }, [todoCategories]);

    return (
        <ReactTooltip
            place="bottom"
            effect="solid"
            event="click"
            globalEventOff="click"
            clickable={true}
            backgroundColor="white"
            border={true}
            borderColor="#eaeaea"
            delayShow={100}
            getContent={(props) => <TooltipContent todoId={props} />}
        />
    );
};

export default EditTodoModal;

import { ReactElement } from 'react';
import { Priority } from '../../scripts/classes/TodoItem';
import './style.scss';

interface Props {
    priority: Priority;
    isSelected: boolean;
    handleClick: (priority: Priority) => void;
}

const TooltipPriority = ({ priority, isSelected, handleClick }: Props): ReactElement => {
    const classList = [
        'tooltip-priority',
        `tooltip-priority--${priority}`,
        `tooltip-priority--${isSelected ? 'selected' : 'not-selected'}`,
    ].join(' ');

    const includeExclamations = (): string => {
        if (priority === 'No') return '!̷';
        else if (priority === 'Low') return '!';
        else if (priority === 'Medium') return '!!';
        else if (priority === 'High') return '!!!';
        else throw new Error('Not implemented');
    };

    return (
        <i className={classList} title={`${priority} priority`} onClick={() => handleClick(priority)}>
            {includeExclamations()}
        </i>
    );
};

export default TooltipPriority;

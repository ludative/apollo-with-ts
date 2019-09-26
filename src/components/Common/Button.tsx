import * as React from 'react';
import {IButtonProps} from "../../interface/IProps/ICommon";

const Button: React.FunctionComponent<IButtonProps> = (props): JSX.Element => {
    const {
        text,
        onClick
    } = props;
    return (
        <button onClick={onClick}>{text || ''}</button>
    )
};

export default Button;
import * as React from 'react';
import { IInputProps } from '../../interface/IProps/ICommon'

const Input: React.FunctionComponent<IInputProps> = (props): JSX.Element => {
    const inputOption = {
        ...props,
        type: props.type || 'text'
    };
    return (
        <input {...inputOption}/>
    )
};

export default Input;
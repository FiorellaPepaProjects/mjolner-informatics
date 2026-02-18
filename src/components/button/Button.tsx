import { ReactNode } from 'react';

interface ButtonProps {
    type?: 'primary' | 'secondary';
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

function Button(props: ButtonProps) {
    let classNamesForType = '';

    switch (props.type) {
        case 'secondary':
            classNamesForType = 'border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white transition-colors';
            break;
        case 'primary':
        default:
            classNamesForType = 'bg-primary text-white hover:brightness-90 active:scale-95 transition-all shadow-md hover:shadow-lg';
            break;
    }

    const classNamesForDisabled = (props.disabled)
        ? 'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 disabled:hover:brightness-100'
        : '';

    return (
        <button className={`px-6 py-2 font-medium rounded-lg duration-200 ${classNamesForType} ${classNamesForDisabled}`} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
}

export default Button;

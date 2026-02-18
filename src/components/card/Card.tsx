import { ReactNode } from 'react';

interface CharacterProps {
    children: ReactNode;
}

function Card(props: CharacterProps) {
    return (
        <div className='group bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden'>
            {props.children}
        </div>
    );
}

export default Card;

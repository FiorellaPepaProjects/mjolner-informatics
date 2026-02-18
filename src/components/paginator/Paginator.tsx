import { useState } from 'react';
import Button from '../button/Button';

export interface Pagination {
    count: number;
    nextPage: string;
    previousPage: string;
    totalPages: number;
}

interface PaginatorProps {
    pagination: Pagination;
    onPrevPage: () => void;
    onNextPage: () => void;
}

function Paginator(props: PaginatorProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const goToPrevPage = () => {
        props.onPrevPage();
        setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        props.onNextPage();
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className='flex items-center justify-center gap-6 pt-6'>
            <Button type='secondary' onClick={goToPrevPage} disabled={!props.pagination.previousPage}>Prev</Button>

            <span className='text-gray-500'>Page {currentPage} of {props.pagination.totalPages}</span>

            <Button onClick={goToNextPage} disabled={!props.pagination.nextPage}>Next</Button>
        </div>
    );
}

export default Paginator;

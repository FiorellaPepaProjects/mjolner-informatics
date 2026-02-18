function Spinner() {
    return (
        <div className='flex flex-col justify-center items-center h-[calc(100vh-64px)] w-full'>
            <div className='relative'>
                <div className='w-16 h-16 rounded-full border-8 border-gray-100'></div>
                <div className='absolute top-0 left-0 w-16 h-16 rounded-full border-8 border-gray-500 border-t-transparent animate-spin'></div>
            </div>
        </div>
    );
}

export default Spinner;

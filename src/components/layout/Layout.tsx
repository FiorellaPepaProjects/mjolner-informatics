import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='relative w-full'>
            <div className='sticky top-0 z-50 h-16 w-full bg-white shadow-md'>
                <div className='flex items-center justify-center h-full'>
                    <h1 className='font-bold'>Disney characters</h1>
                </div>
            </div>

            <main className='p-8'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;

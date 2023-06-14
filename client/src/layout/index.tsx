import { Outlet } from 'react-router-dom'
import LeftMenu from './left-menu';
import Header from './header';
const MainLayout = () => {
    return (
        <div className="flex w-full h-screen bg-[#F5F4F9]">
            <LeftMenu />
            <div className='flex flex-col w-full pb-2'>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;
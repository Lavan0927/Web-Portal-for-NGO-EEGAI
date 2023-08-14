import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDashcube } from 'react-icons/fa';
import './Admin.css';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <FaDashcube />,
        to: '/admin"',
        section: ''
    },
    {
        display: 'Statistics',
        icon: <i className='bx bx-star'></i>,
        to: '/products',
        section: 'started'
    },
    {
        display: 'Projects',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ManageProjects',
        section: 'order'
    },
    {
        display: 'Events',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ManageProjects',
        section: 'order'
    },
    {
        display: 'Crowdfunding',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ManageProjects',
        section: 'order'
    },
    {
        display: 'Donations',
        icon: <i className='bx bx-calendar'></i>,
        to: '/manageProduct',
        section: 'Manage Products'
    },
    {
        display: 'User',
        icon: <i className='bx bx-user'></i>,
        to: '/users',
        section: 'user'
    },
    {
        display: 'Volunteers',
        icon: <i className='bx bx-user'></i>,
        to: '/users',
        section: 'user'
    },
    {
        display: 'Manage Visiting Appointments',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ManageVistingAppointments',
        section: 'order'
    },
    {
        display: 'Notifications',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ManageVistingAppointments',
        section: 'order'
    },
    {
        display: 'Settings',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ManageVistingAppointments',
        section: 'order'
    },
    {
        display: 'Logout',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ManageVistingAppointments',
        section: 'order'
    },
    {
        display: 'Orders',
        icon: <i className='bx bx-receipt'></i>,
        to: '/adminLogin',
        section: 'order'
    },
    {
        display: 'Create Project',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ProjectForm',
        section: 'order'
    },
    {
        display: 'Project Test',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ProjectTest',
        section: 'order'
    },
]

const AdminSidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Admin
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default AdminSidebar;
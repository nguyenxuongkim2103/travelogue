import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props => {
    const [drawerIsOpen, setDrawIsOpen] = useState(false);

    const toggleDrawerHandler = () => {
        setDrawIsOpen(prev => !prev);
    }

    return <Fragment>
        {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
        <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
                <NavLinks />
            </nav>
        </SideDrawer>
        <MainHeader>
            <button className='main-navigation__menu-btn' onClick={toggleDrawerHandler}>
                <span />
                <span />
                <span />
            </button>
            <h1 className='main-navigation__title'>
                <Link to="/">Travelogue</Link>
            </h1>
            <nav className="main-navigation__header-nav">
                <NavLinks />
            </nav>
        </MainHeader>
    </Fragment>
}

export default MainNavigation;
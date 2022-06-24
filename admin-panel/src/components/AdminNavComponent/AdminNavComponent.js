/*eslint-disable */
import React from 'react';
import { NavLink} from 'react-router-dom';
import './AdminNavComponent.scss';

function AdminNavComponent() {
    return (
        <div>
            <div className='adminpage'>
                <nav className='main-menu'>
                    <ul>
                        <li>
                            <NavLink to='/AdminUserPage'
                            className={isActive =>
                                isActive ? 'active':'navlink'
                              }>
                                <i className='fa fa-user'></i>
                                <span className='nav-text'>Dashboard</span>
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to='/AdminCategoryPage'
                            className={isActive =>
                                isActive ? 'active':'navlink'
                              }>
                                <i className='fa fa-list'></i>
                                <span className= 'nav-text'>catagories</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/AdminTagsPage'
                            className={isActive =>
                                isActive ? 'active':'navlink'
                              }>
                                <i className='fa fa-tag'></i>
                                <span className='nav-text'>Tags</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/AdminStatisticsPage'
                            className={isActive =>
                                isActive ? 'active':'navlink'
                              }>
                                <i className='fa fa-bar-chart-o'></i>
                                <span className='nav-text'>Statistics</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default AdminNavComponent;

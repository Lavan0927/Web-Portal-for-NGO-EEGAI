import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
  MDBRipple,
  MDBBadge,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import '/Users/lavanya/Desktop/eegai copy/src/Admin/SideBarTest.css';
import { Link } from 'react-router-dom';
 import logo from "/Users/lavanya/Desktop/eegai copy/src/Logo.png";


export default function Collapsed() {
  const [showShow, setShowShow] = useState(false);
  const [collapse1, setCollapse1] = useState(true);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  useEffect(() => {
    // Check if user is already logged in
    const userId = sessionStorage.getItem('userID');
    const userName = sessionStorage.getItem('userName');
    const userRole = sessionStorage.getItem('userRole');
    const token = sessionStorage.getItem('token');

    setUserId(userId);
    setUserName(userName);
    setUserRole(userRole);
    setToken(token);

    if (token && userRole && userId) {
      setLoggedIn(true);
    }
  
  }, []);

  const handleLogout = () => {
    clearSession();
    setLoggedIn(false);
  };

  const clearSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('userName');
  };

  return (
    <>
      <MDBCollapse show={showShow} tag="nav" className="d-lg-block bg-white sidebar">
        <div className="position-sticky">
          <MDBListGroup flush className="mx-3 mt-4">
            <MDBRipple rippleTag='span'>
              <MDBListGroupItem tag='a' href='#' action
                className='border-0 border-bottom rounded rounded'
                onClick={() => setCollapse1(!collapse1)}
              >
                <MDBIcon fas icon="tachometer-alt me-3" />
                Volunteer Dashboard
              </MDBListGroupItem>
            </MDBRipple>

            <MDBCollapse show={collapse1}>
              <MDBListGroup flush>
              <MDBListGroupItem className="py-1" tag={Link} action to='/'>Visit Home</MDBListGroupItem>
                <MDBListGroupItem className="py-1" tag={Link} action to='/VolunteerDashboard'>Dashboard</MDBListGroupItem>
                <MDBListGroupItem className="py-1" tag={Link} action to=''>Manage Profile</MDBListGroupItem>  
                <MDBListGroupItem className="py-1" tag={Link} action to='/VolunteerManageProjects'>Manage Projects</MDBListGroupItem> 
                <MDBListGroupItem className="py-1" tag={Link} action to='/VolunteerManageActivity'>Manage Activities</MDBListGroupItem> 
                <MDBListGroupItem className="py-1" tag={Link} action to='/VolunteerManageEvent'>Manage Events</MDBListGroupItem>
                <MDBListGroupItem className="py-1" tag={Link} action to=''>Notifications</MDBListGroupItem> 
                <MDBListGroupItem className="py-1" tag={Link} action to=''>Settings</MDBListGroupItem>     
                <MDBListGroupItem className="py-1" tag={Link} action to='/Login' onClick={handleLogout}>Logouts</MDBListGroupItem>           

              </MDBListGroup>
            </MDBCollapse>

          </MDBListGroup>

        </div>
      </MDBCollapse>

      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarNav className="d-flex flex-row align-items-center w-auto">
            <MDBNavbarToggler
              type='button'
              aria-label='Toggle navigation'
              onClick={toggleShow}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBNavbarBrand href='#'>
              <img
                src={logo}
                height='30'
                alt=''
                loading='lazy'
              />
            </MDBNavbarBrand>

            <MDBCollapse navbar>
              {/* <MDBNavbarItem className="d-flex align-items-center">
                <MDBInput label='Search (ctrl + "/" to focus)' id='form1' type='text' />
                <MDBIcon fas icon="search mx-2" />
              </MDBNavbarItem> */}
            </MDBCollapse>
          </MDBNavbarNav>
          <MDBNavbarNav className="d-flex flex-row justify-content-end w-auto">
            <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-center'>
              <MDBDropdown>
                {/* <MDBDropdownToggle tag="a" href="#!" className="hidden-arrow nav-link">
                  <MDBIcon fas icon="bell" />
                  <MDBBadge color='danger' notification pill>
                    1
                  </MDBBadge>
                </MDBDropdownToggle> */}

                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    {/* <MDBDropdownLink href="#">Some news</MDBDropdownLink> */}

                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    {/* <MDBDropdownLink href="#">Another news</MDBDropdownLink> */}
                    Manage Account
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                  Logout
                    {/* <MDBDropdownLink href="#">Something else here</MDBDropdownLink> */}
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            {/* <MDBNavbarItem className='me-3 me-lg-0'>
              <MDBNavbarLink href='#'>
                <MDBIcon fas icon='fill-drip' />
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='me-3 me-lg-0'>
              <MDBNavbarLink href='#'>
                <MDBIcon fab icon='github' />
              </MDBNavbarLink>
            </MDBNavbarItem> */}

            <MDBNavbarItem className='me-3 me-lg-0 d-flex align-items-center'>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" href="#!" className="hidden-arrow nav-link">
                  <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" className="rounded-circle" height="22" alt="" loading="lazy" />
                </MDBDropdownToggle>

                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    {/* <MDBDropdownLink href="#">My profile</MDBDropdownLink> */}
                    Hey! {userName}
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    Manage User Account
                    {/* <MDBDropdownLink href="#">Settings</MDBDropdownLink> */}
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    Logout
                    {/* <MDBDropdownLink href="#">Logout</MDBDropdownLink> */}
                  </MDBDropdownItem>
                </MDBDropdownMenu>

              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
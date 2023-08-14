import React, { useState, useEffect, memo } from 'react'
import Scrollbars from 'react-custom-scrollbars';
// import { logo_small_svg, logo_svg } from '/Users/lavanya/Desktop/eegai copy/src/Admin/Admin-images';
import logo_small_svg from '/Users/lavanya/Desktop/eegai copy/src/Admin/assets/img/logo-small.svg';
import logo_svg from '/Users/lavanya/Desktop/eegai copy/src/Admin/assets/img/logo.svg';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Link } from 'react-router-dom';

const MainSidebar = () => {
  const [isSideMenu, setSideMenu] = useState("");
  const pathname = window.location.pathname;

  const toggleSidebar = (value) => {
    setSideMenu(value)  
    }
    const handleSidebar =(e)=>{
      // console.log(e.target.checked,"e.target.checked");
      if(e.target.checked == true){
        document.body.classList.add("mini-sidebar");
      }else if(e.target.checked == false){
        document.body.classList.remove("mini-sidebar"); 
      }
    }
    const expandMenu = () => {
      document.body.classList.remove("expand-menu");
    };
    const expandMenuOpen = () => {
      document.body.classList.add("expand-menu");
    };
    return (
       <>
       {/* Sidebar */}
      <div className="sidebar" id="sidebar"  
      onMouseOver={expandMenuOpen}
      onMouseLeave={expandMenu}
      >
      <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Link to="index">
              <img src={logo_svg} className="img-fluid logo" alt="" />
            </Link>
            <Link to="index">
              <img src={logo_small_svg} className="img-fluid logo-small" alt="" />
            </Link>
          </div>
          <div className="siderbar-toggle">
            <label className="switch" id="toggle_btn" >
              <input type="checkbox" onChange={(e)=>handleSidebar(e)}/>
              <span className="slider round" />
            </label>
          </div>
        </div>
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title m-0">
                <h6>Home</h6>
              </li>
              <li>
                <Link  className={` ${pathname === "/admin/dashboard" ? "active" : ""}`} to="/admin/dashboard" ><i className="fe fe-grid" ><FeatherIcon icon={"grid"}/>
                                </i> <span>Dashboard</span></Link>
              </li>
              <li className="menu-title">
                <h6>Services</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/services" ? "active" : ""}`} to="/admin/services"><i className="fe fe-briefcase" ><FeatherIcon icon={"briefcase"}/></i>
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/categories" ? "active" : ""}`} to="/admin/categories"><i className="fe fe-file-text" ><FeatherIcon icon={"file-text"}/></i>
                  <span>Categories</span>
                </Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/sub-categories" ? "active" : ""}`} to="/admin/sub-categories"><i className="fe fe-clipboard" ><FeatherIcon icon={"clipboard"}/></i> <span>Sub Categories</span></Link>
              </li>

              <li  className='submenu' >
                <Link to="#" className={`${isSideMenu === "/admin/review-type" ? "subdrop" : ""}`} onClick={()=> toggleSidebar(isSideMenu ==="/admin/review-type" ? "": "/admin/review-type")}><i className="fe fe-star" ><FeatherIcon icon={"star"}/></i>
                  <span>Review</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right" ><FeatherIcon icon={"chevron-right"}/></i></span>
                </Link>
                <ul className={`${isSideMenu === "/admin/review-type" ? "d-block" : "none"}`}>
                  <li>
                    <Link to="/admin/review-type">Review Type</Link>
                  </li>
                  <li>
                    <Link to="/admin/review">Review</Link>
                  </li>
                </ul>
              </li>

              <li className="menu-title">
                <h6>Booking</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/booking" ? "active" : ""}`} to="/admin/booking"><i className="fe fe-smartphone" ><FeatherIcon icon={"smartphone"}/></i> <span> Bookings</span></Link>
              </li>
              <li className="menu-title">
                <h6>Finance &amp; Accounts</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/banktransferlist" ? "active" : ""}`} to="/admin/banktransferlist"><i className="fe fe-file" ><FeatherIcon icon={"file"}/></i>
                  <span>Bank Transfer</span>
                </Link>
              </li>
              <li>
                <Link  className={` ${pathname === "/admin/wallet" ? "active" : ""}`} to="/admin/wallet"><i className="fe fe-credit-card" ><FeatherIcon icon={"credit-card"}/></i>
                  <span>Wallet</span>
                </Link>
              </li>
              <li >
                <Link className={` ${pathname === "/admin/refund-request" ? "active" : ""}`} to="/admin/refund-request"><i className="fe fe-git-pull-request" ><FeatherIcon icon={"git-pull-request"}/></i> <span>Refund Request</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/cash-on-delivery" ? "active" : ""}`} to="/admin/cash-on-delivery"><i className="fe fe-dollar-sign" ><FeatherIcon icon={"dollar-sign"}/></i> <span>Cash on Delivery</span></Link>
              </li>

              <li className="submenu">
                <Link to="#" className={`${isSideMenu === "/admin/payout-request" ? "subdrop" : ""}`} onClick={()=> toggleSidebar(isSideMenu ==="/admin/payout-request" ? "": "/admin/payout-request")}><i className="fe fe-credit-card" ><FeatherIcon icon={"credit-card"}/></i>
                  <span>Payouts</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right" ><FeatherIcon icon={"chevron-right"}/></i></span>
                </Link>
                <ul className={`${isSideMenu === "/admin/payout-request" ? "d-block" : "none"}`}>
                  <li>
                    <Link to="/admin/payout-request">Payout Requests</Link>
                  </li>
                  <li>
                    <Link to="/admin/payout-settings">Payout Settings</Link>
                  </li>
                </ul>
              </li>
              
              <li>
                <Link className={` ${pathname === "/admin/sales-transactions" ? "active" : ""}`} to="/admin/sales-transactions"><i className="fe fe-bar-chart" ><FeatherIcon icon={"bar-chart"}/></i> <span>Sales Transactions</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/tax-rates" ? "active" : ""}`} to="/admin/tax-rates"><i className="fe fe-file-text" ><FeatherIcon icon={"file-text"}/></i>
                  <span>Tax Rates</span>
                </Link>
              </li>
              <li className="menu-title">
                <h6>Others</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/chat" ? "active" : ""}`} to="/admin/chat"><i className="fe fe-message-square" ><FeatherIcon icon={"message-square"}/></i> <span>Chat</span></Link>
              </li>
              <li className="menu-title">
                <h6>Content</h6>
              </li>
              <li className="submenu">
                <Link to="#" className={`${isSideMenu === "/admin/add-page" ? "subdrop" : ""}`} onClick={()=> toggleSidebar(isSideMenu ==="/admin/add-page" ? "": "/admin/add-page")}><i className="fe fe-file" ><FeatherIcon icon={"file"}/></i>
                  <span>Pages</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right" ><FeatherIcon icon={"chevron-right"}/></i></span>
                </Link>
                <ul className={`${isSideMenu === "/admin/add-page" ? "d-block" : "none"}`}>
                  <li>
                    <Link to="/admin/add-page">Add Page</Link>
                  </li>
                  <li>
                    <Link to="/admin/pages-list">Pages</Link>
                  </li>
                  <li>
                    <Link to="/admin/page-list">Pages List</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#"className={`${isSideMenu === "/admin/all-blog" ? "subdrop" : ""}`} onClick={()=> toggleSidebar(isSideMenu ==="/admin/all-blog" ? "": "/admin/all-blog")}><i className="fe fe-file-text" ><FeatherIcon icon={"file-text"}/></i>
                  <span>Blog</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right" ><FeatherIcon icon={"chevron-right"}/></i></span>
                </Link>
                <ul className={`${isSideMenu === "/admin/all-blog" ? "d-block" : "none"}`}>
                  <li>
                    <Link to="/admin/all-blog">All Blog</Link>
                  </li>
                  <li>
                    <Link to="/admin/add-blog">Add Blog</Link>
                  </li>
                  <li>
                    <Link to="/admin/blogs-categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/admin/blogs-comments">Blog Comments</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#" className={`${isSideMenu === "/admin/countries" ? "subdrop" : ""}`} onClick={()=> toggleSidebar(isSideMenu ==="/admin/countries" ? "": "/admin/countries")}><i className="fe fe-map-pin" ><FeatherIcon icon={"map-pin"}/></i> 
                  <span>Location</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right" ><FeatherIcon icon={"chevron-right"}/></i> </span>
                </Link>
                <ul className={`${isSideMenu === "/admin/countries" ? "d-block" : "none"}`}>
                  <li>
                    <Link to="/admin/countries">Countries</Link>
                  </li>
                  <li>
                    <Link to="/admin/states">States</Link>
                  </li>
                  <li>
                    <Link to="/admin/cities">Cities</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/testimonials" ? "active" : ""}`} to="/admin/testimonials"><i className="fe fe-star" ><FeatherIcon icon={"star"}/></i>  <span>Testimonials</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/faq" ? "active" : ""}`} to="/admin/faq"><i className="fe fe-help-circle" ><FeatherIcon icon={"help-circle"}/></i><span>FAQ</span></Link>
              </li>
              <li className="menu-title">
                <h6>Membership</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/membership" ? "active" : ""}`} to="/admin/membership"><i className="fe fe-user" ><FeatherIcon icon={"user"}/></i> <span>Membership</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/membership-addons" ? "active" : ""}`} to="/admin/membership-addons"><i className="fe fe-user-plus" ><FeatherIcon icon={"user-plus"}/></i> <span>Membership Addons</span></Link>
              </li>
              <li className="menu-title">
                <h6>Reports</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/earnings" ? "active" : ""}`} to="/admin/earnings"><i className="fe fe-user" ><FeatherIcon icon={"user"}/></i>
                  <span>Admin Earnings</span>
                </Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/provider-earnings" ? "active" : ""}`} to="/admin/provider-earnings"><i className="fe fe-dollar-sign" ><FeatherIcon icon={"dollar-sign"}/></i>
                  <span>Provider Earnings</span>
                </Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/membership-transaction" ? "active" : ""}`} to="/admin/membership-transaction"><i className="fe fe-tv" ><FeatherIcon icon={"tv"}/></i>
                  <span>Membership Transaction</span>
                </Link>
              </li>
              <li className="menu-title">
                <h6>User Management</h6>
              </li>
              <li className="submenu">
                <Link to="#" className={`${isSideMenu === "/admin/user-list" ? "subdrop" : ""}`} onClick={()=> toggleSidebar(isSideMenu ==="/admin/user-list" ? "": "/admin/user-list")}><i className="fe fe-user" ><FeatherIcon icon={"user"}/></i> 
                  <span> Users</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right" ><FeatherIcon icon={"chevron-right"}/></i> </span>
                </Link>
                <ul className={`${isSideMenu === "/admin/user-list" ? "d-block" : "none"}`}>
                  <li>
                    <Link to="/admin/user-list">New User</Link>
                  </li>
                  <li>
                    <Link to="/admin/user-customers">Customers</Link>
                  </li>
                  <li>
                    <Link to="/admin/user-providers">Providers </Link>
                  </li> 
                </ul>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/roles-permissions" ? "active" : ""}`} to="/admin/roles-permissions"><i className="fe fe-file" ><FeatherIcon icon={"file"}/></i> <span>Roles &amp; Permissions</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/delete-account-requests" ? "active" : ""}`} to="/admin/delete-account-requests"><i className="fe fe-trash-2" ><FeatherIcon icon={"trash-2"}/></i> <span>Delete Account Requests</span></Link>
              </li>
              <li className="menu-title">
                <h6>Marketing</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/marketing-coupons" ? "active" : ""}`} to="/admin/marketing-coupons"><i className="fe fe-bookmark" ><FeatherIcon icon={"bookmark"}/></i> <span>Coupons</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/marketing-service" ? "active" : ""}`} to="/admin/marketing-service"><i className="fe fe-briefcase" ><FeatherIcon icon={"briefcase"}/></i> <span>Service Offers</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/marketing-featured" ? "active" : ""}`} to="/admin/marketing-featured"><i className="fe fe-briefcase" ><FeatherIcon icon={"briefcase"}/></i> <span>Featured Services</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/marketing-newsletter" ? "active" : ""}`} to="/admin/marketing-newsletter"><i className="fe fe-mail" ><FeatherIcon icon={"mail"}/></i> <span>Email Newsletter</span></Link>
              </li>
              <li className="menu-title">
                <h6>Management</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/cachesystem" ? "active" : ""}`} to="/admin/cachesystem"><i className="fe fe-user" ><FeatherIcon icon={"user"}/></i> 
                  <span>Cache System</span>
                </Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/email-templates" ? "active" : ""}`} to="/admin/email-templates"><i className="fe fe-mail" ><FeatherIcon icon={"mail"}/></i> <span>Email Templates</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/sms-templates" ? "active" : ""}`} to="/admin/sms-templates"><i className="fe fe-message-square" ><FeatherIcon icon={"message-square"}/></i> <span>SMS Templates</span></Link>
              </li>
              <li className="menu-title">
                <h6>Support</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/contact-messages" ? "active" : ""}`} to="/admin/contact-messages"><i className="fe fe-message-square" ><FeatherIcon icon={"message-square"}/></i> <span>Contact Messages</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/abuse-reports" ? "active" : ""}`} to="/admin/abuse-reports"><i className="fe fe-file-text" ><FeatherIcon icon={"file-text"}/></i> <span>Abuse Reports</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/announcements" ? "active" : ""}`} to="/admin/announcements"><i className="fe fe-volume-2" ><FeatherIcon icon={"volume-2"}/></i>  <span>Announcements</span></Link>
              </li>
              <li className="menu-title">
                <h6>Settings</h6>
              </li>
              <li>
                <Link className={` ${pathname === "/admin/localization" ? "active" : ""}`} to="/admin/localization"><i className="fe fe-settings" ><FeatherIcon icon={"settings"}/></i> <span>Settings</span></Link>
              </li>
              <li>
                <Link className={` ${pathname === "//admin/signin" ? "active" : ""}`} to="/admin/signin"><i className="fe fe-log-out" ><FeatherIcon icon={"log-out"}/></i> <span>Logout</span></Link>
              </li>
            </ul>
          </div>
        </div>
        </Scrollbars>
      </div>
      {/* /Sidebar */}
       </>
    );
}

export default MainSidebar;
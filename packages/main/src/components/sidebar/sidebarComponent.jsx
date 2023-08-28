import React from "react";
import { Accordion, Card, useAccordionToggle } from "react-bootstrap";
import { connect } from "react-redux";
import {
  Link,
  NavLink,
  useLocation
} from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import Sidebar from "react-sidebar";

import "./sidebar.css";
import class_img from "common/src/images/classes.svg";
import student_img from "common/src/images/students_grey.svg";
import assignment_img from "common/src/images/assignments_grey.svg";
import vs_img from "common/src/images/videos_storybooks_grey.svg";
import billing_img from "common/src/images/Billing_grey.svg";
import profile_img from "common/src/images/Profile_grey.svg";

import AddNewTeacher from "../school/addTeacher";
import InviteSent from "../school/inviteSent";
import CommingSoonDialog from "common/src/components/shared/commingSoonDialog";
const mql = window.matchMedia("(min-width: 800px)");
const style = {
  root: {
    position: "absolute",
    top: 110,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  },
  sidebar: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "auto",
    width: 260,
    backgroundColor: "#080845"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
    // overflowY: "auto",
    // WebkitOverflowScrolling: "touch",
    // transition: "left .3s ease-out, right .3s ease-out",
  },
  overlay: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  },
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  }
};

// const pathIndex = [
//   "home",
//   "class",
//   "student",
//   "postwork",
//   "video",
//   "billing",
//   "profile",
// ];
const pathIndex = {
  home: 0,
  class: 1,
  classes: 1,
  stats: 1,
  performance: 1,
  student: 2,
  students: 2,
  reports: 2,
  invite: 2,
  postwork: 3,
  create: 3,
  postworks: 3,
  homework: 3,
  videos: 4,
  assign: 4,
  video: 4,
  payments: 5,
  account: 6
};
class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      activeKey: 0,
      path: window.location.pathname,
      dialogOpen: "",
      menus: {
        student: [
          {
            name: "Classes",
            submenus: [
              {
                name: "My Classes",
                url: "/student/classes"
              },
              {
                name: "Join a Class",
                url: "/student/classes/new"
              }
            ],
            img: class_img
          },
          {
            name: "All Assignments",
            submenus: [{ name: "My Assignments", url: "/student/assignments" }],
            img: assignment_img
          },
          {
            name: "Library",
            submenus: [
              {
                name: "Videos",
                url: "/student/videos/all"
              },
              {
                name: "StoryBook",
                url: "#"
              }
            ],
            img: assignment_img
          },
          {
            name: "Progress",
            submenus: [
              { name: "My Progress", url: "/student/progress/mine" },
              { name: "Practices", url: "/student/reports/practice" }
            ]
          },
          {
            name: "Demos",
            submenus: [{
              name: "Demos",
              url: "https://www.learnlit.online/demos#block-yui_3_17_2_1_1593791930175_7174",
              isBlank: true
            }]
          }
        ],
        teacher: [
          {
            name: "Classes",
            key: 1,
            submenus: [
              {
                name: "My Classes",
                url: "/teacher/class/",
                alt: [
                  "/teacher/classes/",
                  "/teacher/classes/:id/homeworks/new",
                  "/teacher/classes/:id/show",
                  "/teacher/performance/class/:id/student/:id"
                ]
              },
              {
                name: "Create a Class",
                url: "/teacher/classes/new"
              },
              {
                name: "Class Stats",
                url: "/teacher/stats"
              }
            ],
            img: class_img
          },
          {
            name: "Students",
            key: 2,
            submenus: [
              {
                name: "All Students",
                url: "/teacher/students/",
                alt: [
                  "/teacher/student/:id",
                  "/teacher/reports/classes/:id/students/:id"
                ]
              },
              {
                name: "Invite Students",
                url: "/teacher/invite"
              },
              {
                name: "Students Stats",
                url: "/teacher/student-stats"
              }
            ],
            img: student_img
          },
          {
            name: "Assignments",
            key: 3,
            submenus: [
              {
                name: "All Assignments",
                url: "/teacher/postwork/",
                alt: ["/teacher/homework/:id"]
              },
              {
                name: "Create Assignment",
                url: "/teacher/create-assignment"
              },
              {
                name: "Assignment Stats",
                url: "/teacher/postworks/stats",
                alt: ["/teacher/postworks/:id"]
              },
              {
                name: "Contest",
                url: "#"
              }
            ],
            img: assignment_img
          },
          {
            name: "Videos & StoryBooks",
            key: 4,
            submenus: [
              {
                name: "All Videos",
                url: "/teacher/videos/all",
                alt: ["/teacher/videos/:id/practice"]
              },
              // {
              //   name: "All StoryBooks",
              //   url: "#",
              // },
              {
                name: "Assign Video",
                url: "/teacher/assign"
              },
              {
                name: "Video stats",
                url: "/teacher/videos/list",
                alt: ["/teacher/videos/stats/:id"]
              },
              // {
              //   name: "StoryBooks stats",
              //   url: "#",
              // },
              {
                name: "Favorites",
                url: "/teacher/video/favorites",
                alt: []
              },
              {
                name: "Recommended",
                url: "/teacher/video/recommended",
                alt: []
              },
              {
                name: "Recently Watched",
                url: "/teacher/video/watched",
                alt: []
              }
            ],
            img: vs_img
          },
          {
            name: "Billing",
            key: 5,
            submenus: [
              {
                name: "Payment",
                url: "/teacher/payments"
              }
            ],
            img: billing_img
          },
          {
            name: "Profile",
            key: 6,
            submenus: [
              {
                name: "My Account",
                url: "/teacher/account",
                alt: ["/teacher/account", "/teacher/account/update"]
              },
              {
                name: "My Subscription",
                url: "/teacher/account/subscription"
              }
            ],
            img: profile_img
          },
          {
            name: "Demos",
            url: "https://www.learnlit.online/demos#block-yui_3_17_2_1_1593791930175_6097",
            target: "_blank"
          }
          // { name: "Students", url: "/dashboard" },
          // { name: "Assignments", url: "/dashboard" },
          // { name: "Videos", url: "/dashboard", },
          // { name: "Events", url: "/dashboard", },
          // { name: "Billing", url: "/dashboard", },
          // { name: "Profile", url: "/dashboard", }
        ],
        admin: [
          {
            name: "Classes",
            url: "/dashboard",
            img: { class_img }
          },
          {
            name: "Teachers",
            url: "/dashboard",
            submenus: [
              {
                name: "Add New Teacher",
                url: "#",
                onClickMethod: {
                  method: () => this.setDialogOpen("addNewTeacher")
                }
              }
            ]
          },
          { name: "Students", url: "/dashboard" },
          { name: "Assignments", url: "/dashboard" },
          { name: "Videos", url: "/dashboard" },
          { name: "Events", url: "/dashboard" },
          { name: "Billing", url: "/teacher/payments" },
          { name: "Profile", url: "/dashboard" }
        ]
      },
      show: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.setDialogOpen = this.setDialogOpen.bind(this);
    this.setActiveKey = this.setActiveKey.bind(this);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    const res = window.location.pathname.split("/");
    this.checkActiveItem(res);
  }

  // componentWillUnmount() {
  //   if (this.state.mql) {
  //     this.state.mql.removeListener(this.mediaQueryChanged);
  //   }
  // }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
  setActiveKey(key) {
    this.setState({ activeKey: key });
  }

  setDialogOpen(name) {
    this.setState({ dialogOpen: name });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.path !== window.location.pathname) {
      this.setState({ path: window.location.pathname });
      const res = window.location.pathname.split("/");

      this.checkActiveItem(res);
    }
  }
  checkActiveItem = (res) => {
    if (this.props.role === "teacher") {
      const prevIndex = res.indexOf("teacher");
      const activeKey =
        pathIndex[res[prevIndex + 1]] ||
        pathIndex[res[prevIndex + 1]?.split("-")[0]] ||
        0;
      this.setState({ activeKey: activeKey });
    }
  };
  render() {
    // const [activeKey, setActiveKey] = useState(0);
    const { activeKey } = this.state;
    return (
      <Sidebar
        sidebar={
          <div className="sidebar-wrapper">
            <NavLink to={ `/${this.props.role}/home` }>
              <h4>
                <svg
                  width="20"
                  height="20"
                  className="mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 10.5H19V15H7V10.5Z" fill="white" />
                  <path opacity="0.5" d="M7 17H16V21H7V17Z" fill="white" />
                  <path d="M22 3.25H7V8.25H22V3.25Z" fill="white" />
                  <path d="M4 2H2V22H4V2Z" fill="white" />
                </svg>
                Dashboard
              </h4>
            </NavLink>
            <ul className="list-unstyled">
              <li>
                <Accordion defaultActiveKey={ 0 } activeKey={ activeKey }>
                  { this.state.menus[`${this.props.role}`].map((item, index) => (
                    <Card key={ index } id={ "menu_" + index }>
                      <CustomToggle
                        as={ Card.Header }
                        eventKey={ index + 1 }
                        handleClick={ () => {
                          if (activeKey === index + 1) {
                            this.setActiveKey(null);
                          } else {
                            this.setActiveKey(index + 1);
                          }
                        } }
                      >
                        <h6 className="sidebar-active">
                          { /* <img src={item.img} className="mr-2" alt="" height="24px" width="20px" />
                          <NavLink to="#">{item.name}</NavLink> */ }
                          <img src={ item.img } className="mr-2" alt="" />
                          { item.target ? (
                            <a
                              href={ item.url }
                              target={ item.target }
                              className={
                                activeKey === index + 1 ? "sidebar-active" : ""
                              }
                            >
                              { item.name }
                            </a>
                          ) : (
                            <NavLink
                              to="#"
                              className={
                                activeKey === index + 1 ? "sidebar-active" : ""
                              }
                            >
                              { item.name }
                            </NavLink>
                          ) }
                        </h6>
                        <span>
                          { item.submenus && Object.keys(item.submenus).length
                            ? activeKey === index + 1
                              ? "-"
                              : "+"
                            : "" }
                        </span>
                      </CustomToggle>
                      { item.submenus && Object.keys(item.submenus).length > 0 && (
                        <Accordion.Collapse eventKey={ index + 1 }>
                          <Card.Body>
                            <div className="body-inner">
                              <ul className="list-unstyled">
                                { item.submenus.map((subMenu, subMenuIndex) => {
                                  return (
                                    <li
                                      id={
                                        "menu_" +
                                        index +
                                        "_subMenuIndex_" +
                                      subMenuIndex
                                      }
                                      key={ "subMenuIndex_" + subMenuIndex }
                                    >
                                      { subMenu.onClickMethod && (
                                        <Link
                                          to="#"
                                          onClick={ subMenu.onClickMethod.method }
                                        >
                                          { " " }
                                          _&nbsp;&nbsp;{ subMenu.name }
                                        </Link>
                                      ) }
                                      { !subMenu.isBlank && !subMenu.onClickMethod && (
                                        <NavURL
                                          subMenu={ subMenu }
                                          handleShow={ () => {
                                            this.setState({ show: true });
                                          } }
                                          setActiveKey={ this.setActiveKey }
                                          key={ item.key }
                                          activeKey={ activeKey }
                                          { ...this.props }
                                        />
                                      ) }
                                      { subMenu.isBlank && (
                                        <a
                                          target="_blank"
                                          rel="noreferrer"
                                          href={ subMenu.url }
                                          style={ {
                                            pointerEvents: subMenu.name === "Payment" ? "initial" : this.props.disabled
                                          } }
                                        >
                                          { subMenu.name }
                                        </a>
                                        // <NavURL
                                        //   subMenu={subMenu}
                                        //   handleShow={() => {
                                        //     this.setState({ show: true });
                                        //   }}
                                        //   setActiveKey={this.setActiveKey}
                                        //   key={item.key}
                                        //   activeKey={activeKey}
                                        //   {...this.props}
                                        // />
                                      ) }
                                    </li>
                                  );
                                }) }
                              </ul>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      ) }
                    </Card>
                  )) }
                </Accordion>
              </li>
            </ul>
          </div>
        }
        open={ this.state.sidebarOpen }
        docked={ this.state.sidebarDocked }
        onSetOpen={ this.onSetSidebarOpen }
        styles={ style }
        defaultSidebarWidth={ 260 }
      >
        { this.state.dialogOpen !== "" && (
          <RenderDialog
            dialogOpen={ this.state.dialogOpen }
            setDialogOpen={ this.setDialogOpen }
          />
        ) }
        <CommingSoonDialog
          show={ this.state.show }
          handleClose={ () => this.setState({ show: false }) }
        />
        <div style={ { pointerEvents: (window.location.href.includes("/payments") 
                                          && "inherit" ) 
                                        ||this.props.disabled } }>
          <Child { ...this.props } />
        </div>
      </Sidebar>
    );
  }
}

const Child = (props) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // window.scrollTo(0, 0);
    scroll.scrollToTop();
  }, [pathname]);
  return props.children;
};
const mapStateToProps = (state) => {
  const {
    user: { accessToken, role }
  } = state;
  return { accessToken, role };
};

export default connect(mapStateToProps, null)(SidebarComponent);

const CustomToggle = ({ children, eventKey, handleClick }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    handleClick();
  });

  return (
    <div className="card-header" type="button" onClick={ decoratedOnClick }>
      { children }
    </div>
  );
};
const RenderDialog = (props) => {
  const { setDialogOpen, dialogOpen } = props;

  switch (dialogOpen) {
  case "addNewTeacher":
    return <AddNewTeacher setDialogOpen={ setDialogOpen } />;
  case "inviteSent":
    return <InviteSent setDialogOpen={ setDialogOpen } />;

  default:
    return null;
  }
};
const stringContainsNumber = (_string) => {
  return /\d/.test(_string);
};

const NavURL = (props) => {
  const { subMenu, setActiveKey, activeKey } = props;
  const { pathname } = useLocation();
  const result = pathname
    .split("/")
    .map((item) => (stringContainsNumber(item) ? ":id" : item));
  const path = result.join("/");
  
  return (
    <NavLink
      to={ subMenu.url }
      onClick={ () => {
        return subMenu.name === "Contest" ? props.handleShow() : "";
      } }
      activeClassName="sidebar-active"
      style={ {
        pointerEvents: subMenu.name === "Payment" ? "initial" : props.disabled
      } }
      isActive={ (match, location) => {
        if (
          subMenu.url === location.pathname ||
          (subMenu.alt &&
            (subMenu.alt.indexOf(location.pathname) > -1 ||
              subMenu.alt.indexOf(path) > -1))
        ) {
          return true;
        } else {
          return false;
        }
      } }
    >
      { subMenu.name }
    </NavLink>
  );
};

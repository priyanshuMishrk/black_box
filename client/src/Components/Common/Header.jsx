import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../blackbox-logo-01.png";
import { BsSearch } from "react-icons/bs";
// import { BsGlobe } from "react-icons/bs";
// import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiWireframeGlobe } from "react-icons/gi";
import Avatarr from "./Avatarr";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const [navb, setNavb] = useState(false);

  const handleNavbar = () => {
    window.scrollY >= 20 ? setNavb(true) : setNavb(false);
  };

  const [isInputVisible, setIsInputVisible] = useState(false);
  // const [value, setValue] = useState("");

  const handleSearchIconClick = () => {
    setIsInputVisible(true);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  window.addEventListener("scroll", handleNavbar);
  const { setToChoose, value, setValue, seenavs } = useContext(AuthContext);

  return (
    <>
      <nav className={navb ? "active w-100" : "w-100"}>
        <Container
          fluid       
          className="d-flex justify-content-between w-100 p-3 navbar"
        >
          <div className="d-flex">
            <Link to="/main">
              <img src={Logo} width={200} className="p-0 m-0 cp" alt="" />
            </Link>
          </div>
          <div className="">
            <div className="navs align-items-center">
              <b>
                <ul className="navul">
                  {/* <li>
                    <Link to="/" className="link px-3 ">
                      STREAM
                    </Link>
                  </li> */}
                  {/* <li>
                    {user ? (
                      (user.classroom_id || workspaceAllow) && ( */}
                  { !isInputVisible && <Link to="/host" className={navb?"link":"link2 "}>
                  HOST A CLASS
                  </Link>}
                  {/* )
                    ) : (
                      <Link to="/classroom" className="link  ">
                        CLASSROOM{" "}
                      </Link>
                    )}
                  </li> */}
                  {seenavs ? (
                    // <li>
                    <Link to="/classroom/host" className={navb?"link px-5":"link2 px-5"}>
                      HOST A SESSION{" "}
                    </Link>
                  ) : (
                    // </li>
                    <>
                      <li>{
                        !isInputVisible &&
                        <Link to="/classes" className={navb?"link px-5":"link2 px-5"}>
                          JOIN A CLASS
                        </Link>
                        }
                      </li>

                      <Link to="/classroom" className={navb?"link clr":"link2 clr"}>
                        CLASSROOM
                      </Link>

                      <li>
                        {!isInputVisible && <Link
                          to="/main"
                          className={navb?"link pe-3":"link2 pe-3"}
                          onClick={() => {
                            setToChoose(true);
                          }}
                        >
                          STREAM
                        </Link>}
                      </li>
                      <li>
                      <div className={`ms-2 pt-1 d-flex ${isInputVisible ? 'searchdiv bggrey' : ''}`}>
                        {isInputVisible && (
                        <input
                          type="text"
                          className="borderless"
                          value={value}
                          title="Search Course or Class"
                          onChange={handleInputChange}
                          onBlur={() => setIsInputVisible(false)}
                          autoFocus
                        />
                        )}
                        <BsSearch className={`mt-2 ${isInputVisible ? '' : 'mb-2 larger-icon'}`} onClick={handleSearchIconClick} />
                      </div>
                      </li>
                    </>
                  )}

                  {/* <li>
                    <Link to='/enter' className='link px-2 '>
                    <BsSearch className="" size={25} />
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to="/login" className="link px-2 ">
                      <BsGlobe className="" size={25} />
                    </Link>
                  </li> */}
                  <GiWireframeGlobe size={31} className="ms-3" />
                  <li>
                    {/* <Link to="/profile" className="link px-2 ">
                      <FaRegUser className="" size={25} />
                    </Link> */}

                    <Avatarr />
                  </li>

                  <li>
                    <Link to="/nav" className={navb?"link px-3 pt-1 ":"link2 px-3 pt-1 "}>
                      <GiHamburgerMenu className="" size={30} />
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/nav" className="link px-3 pt-1 ">
                      <GiHamburgerMenu className="" size={30} />
                    </Link>
                  </li> */}
                </ul>
              </b>
            </div>
          </div>
        </Container>
      </nav>
      <nav className={navb ? "active w-100 navs2" : "w-100 navs2"}>
        <Container fluid className="d-flex justify-content-between w-100 p-3 ">
          <div>
            <Link to="/main">
              <img src={Logo} width={150} className="p-0 m-0 cp" alt="" />
            </Link>
          </div>
          <div className="">
            <div className="navs align-items-center">
              <b>
                <ul className="navul">
                  {/* <li>
                    <BsSearch className="" size={25} />
                  </li> */}
                  {/* <li>
                    <Link to="/login" className="link px-2 ">
                      <BsGlobe className="" size={25} />
                    </Link>
                  </li> */}
                  <li>
                    {/* <Link to="/profile" className="link px-2 "> */}
                    {/* <FaRegUser className="" size={25} /> */}

                    <Avatarr />
                    {/* </Link> */}
                  </li>
                  <li>
                    <Link to="/nav" className="link px-3 pt-1 ">
                      <GiHamburgerMenu className="" size={30} />
                    </Link>
                  </li>
                </ul>
              </b>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Header;

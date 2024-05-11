import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import DefaultPic from "../../Images/defualtProPic.jpg";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import ReadMoreReact from "read-more-react";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Whatsnew = () => {
  const name = localStorage.getItem("name");
  const pro = localStorage.getItem("propic");
  let prop;
  let propic;
  if (pro.includes("{")) {
    prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
    propic = prop.secure_url;
  } else {
    prop = pro;
    propic = pro;
  }
  // const prop = pro ? (pro.length > 0 ? JSON.parse(pro) : "") : "";
  // const propic = prop.secure_url;
  const about = localStorage.getItem("userDetails");
  const navigate = useNavigate();

  const { getCoursesList, courseList, willFrnd, willBeFrnd, saveFrnd } =
    useContext(AuthContext);
    const [scrollPosition, setScrollPosition] = useState(0);
  const scrollerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    if (scrollerRef.current) {
      const currentPosition = scrollerRef.current.scrollLeft; // Adjust according to your scroll direction
      const newPosition = currentPosition + scrollOffset;
      scrollerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newPosition);
    }
  };
    
    useEffect(() => {
    getCoursesList();
    willFrnd();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      fluid
      className="profilediv d-flex justify-content-center p-0 m-0 bggrey  my-1 bxsh"
    >
      <Container className="pc py-5 pb-0">
        <Row>
          <Col lg={1}></Col>
          <Col lg={3}>
            <Row className="mb-5">
              <Col
                md={12}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="ps-3">
                  {prop ? (
                    propic ? (
                      <img
                        src={propic}
                        className=" mb-1 mt-3 ic2 "
                        alt={DefaultPic}
                      />
                    ) : (
                      <img
                        width={100}
                        height={100}
                        alt=""
                        style={{
                          borderRadius: "50%",
                        }}
                        className="profilepic mb-1 mt-3 "
                      />
                    )
                  ) : (
                    <img
                      src={DefaultPic}
                      width={100}
                      height={100}
                      alt=""
                      className=" mb-1 mt-3 ic2"
                    />
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="text-center mt-2 ps-3 gl">
                  <h3 className="gsb">{name}</h3>
                  <ReadMoreReact
                    text={about}
                    min={150}
                    ideal={150}
                    max={200}
                    readMoreText=".. read more"
                  />
                  <div className="mt-4 pt-1 d-flex justify-content-center align-items-center">
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ width: 300 }}
                      options={
                        willBeFrnd && willBeFrnd.length > 0 ? willBeFrnd : []
                      }
                      autoHighlight
                      getOptionLabel={(option) =>
                        `${option.first_name} ${option.last_name}`
                      }
                      renderOption={(props, option) => (
                        <div className="d-flex p-1" key={option.id}>
                          <Box
                            component="li"
                            sx={{
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...props}
                            onClick={() => {
                              navigate(`/trainer/${option.id}`);
                            }}
                          >
                            {option.img_thumbnail.length > 0 ? (
                              <img
                                src={option.img_thumbnail}
                                width={40}
                                height={40}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                alt="logo"
                              />
                            ) : (
                              <img
                                src={DefaultPic}
                                width={40}
                                height={40}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                alt="logo"
                              />
                            )}
                            <Typography>
                              {option.first_name} {option.last_name}
                            </Typography>
                          </Box>
                          <button
                            style={{
                              border: 0,
                              borderRadius: 2,
                              marginLeft: "auto",
                            }}
                            className="bgy mt-1 mb-1"
                            onClick={() => {
                              let ind = willBeFrnd.indexOf(option);
                              saveFrnd(option.id, ind);
                            }}
                          >
                            {" "}
                            Save
                          </button>
                        </div>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Friends"
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col></Col>

          {/* //// */}
          <Col lg={7} className="ps-4 ">
            <h1 className="profilename gx">What's new</h1>
            <div className="scroll-container"
            style={{
              position : "relative"
            }}
            > 
            {scrollPosition > 0 && <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleScroll(-200)}  className="alllll"/>}
            <div
              className="d-flex w-85 abc"
              style={{
                overflowX: "hidden",
              }}
              ref={scrollerRef}
            >
              {courseList
                ? // eslint-disable-next-line
                  courseList.slice(0, 5).map((course, index) => {
                    const a = JSON.parse(course.images);
                    // let host;
                    // if (course.host_details.img_thumbnail.includes("{")) {
                    //   host = course.host_details.img_thumbnail
                    //     ? course.host_details.img_thumbnail.secure_url !== null
                    //       ? JSON.parse(course.host_details.img_thumbnail)
                    //       : null
                    //     : null;
                    // } else {
                    //   host = course.host_details.img_thumbnail;
                    // }
                    if (a.length !== 0 && a[0].length !== undefined) {
                      return (
                        <div
                          className="my-4 mt-1 me-4 class"
                          key={index}

                          // style={{ height: "320px" }}
                        >
                          <Link
                            to={`/classes/join/${course.id}`}
                            className="cp"
                          >
                            <div
                              className="boxshadow rounded-2 mb-2"
                              style={{
                                width: "200px",
                                overflow: "hidden",
                                
                              }}
                            >
                              <div className="profileclassesimg">
                                <img src={a[0]} className="classesimg" alt="" />
                              </div>
                              <Row
                                className="profilest bw m-0 p-0 "
                                style={{
                                  overflowY: "hidden",
                                }}
                              >
                                <div
                                  className="d-flex"
                                  style={{
                                    overflowX: "hidden",
                                  }}
                                >
                                  <div
                                    className="w-100 pt-1 d-flex  align-items-center newClass"
                                    style={{
                                      margin: "auto",
                                    }}
                                  >

                                    <div className="m-1">
                                      <img src={course.host_details.img_thumbnail} alt="Profile Pic" 
                                      width={35}
                                      height={35}
                                      style={{
                                        borderRadius: "50%",
                                      }}/>
                                    </div>

                                    <b style={{ textTransform: 'uppercase', color: '#a1a0a0 !important'}} className="overflow-ellipsis">
                                      <p
                                        className="gx   info-text-title"
                                        style={{
                                          margin: "auto",
                                        }}
                                      >
                                        {course.title
                                          ? course.title.length > 20
                                            ? course.title.slice(0, 20) + "..."
                                            : course.title
                                          : ""}
                                      </p>
                                      <p
                                        className="gx pb-1 info-text-name"
                                        style={{
                                          margin: "auto",
                                        }}
                                      >
                                        {course.host_details && course.host_details.first_name && course.host_details.last_name ? `${course.host_details.first_name} ${course.host_details.last_name}` : ""}
                                      </p>
                                    </b>
                                  </div>
                                </div>
                              </Row>
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  })
                : ""}
            </div>
            {scrollPosition < (scrollerRef.current?.scrollWidth - scrollerRef.current?.clientWidth) && (
        <FontAwesomeIcon icon={faChevronRight} onClick={() => handleScroll(200)} className="arrrr" />
      )}
    </div>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Whatsnew;

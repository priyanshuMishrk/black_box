import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Header from "../../Components/Common/Header";
import AuthContext from "../../Context/AuthContext";

const Classes = () => {
  const { goToTop, getCoursesList, courseList, value } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    goToTop();
    getCoursesList();
    // eslint-disable-next-line
  }, []);

  const renderClasses = () => {
    if (!courseList || courseList.length === 0) {
      return null;
    }

    const filteredCourses = courseList.filter(
      (course) =>
        course.title.toLowerCase().includes(value.toLowerCase()) ||
        course.description.toLowerCase().includes(value.toLowerCase()) ||
        value === ""
    );

    const rows = [];
    for (let i = 0; i < filteredCourses.length; i += 4) {
      const coursesInRow = filteredCourses.slice(i, i + 4);
      rows.push(
        <Row key={i} className=" p-4 pb-0 pt-0">
          {coursesInRow.map((course, index) => (
            <Col key={index} md={3}>
              {renderClass(course)}
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  };

  const renderClass = (course) => {
    const a = JSON.parse(course.images)[0];
    return (
      <div
        className="rounded-4 mb-2 mb-5 cp ssh bgw"
        style={{
          width: "23vw",
          height : "37vw "
        }}
        onClick={() => navigate("/classes/join/" + course.id)}
      >
        <div className="profileclassesimg22">
          <img src={a} className="classesimg22" alt="" />
        </div>
        <div className="d-flex" style={{ overflowX: "hidden", paddingTop : "1vw" }}>
          <img src={course.host_details.img_thumbnail} alt="nothingcool" className="dfimg" />
          <div className="cDiv">
            <span className="ctitle">{course.title}</span>
            <span className="cName">
            {`${course.host_details.first_name} ${course.host_details.last_name}`}
            </span>
          </div>

        </div>
      </div>
    );
  };

  return (
    <Container fluid className="p-0 m-0 bggrey">
      <Header />
      <Container fluid className="p-0 m-0 white"></Container>
      <Container fluid className="mb-5 m-0 p-0 bggrey">
        <Container fluid className="p-0 m-0 d-flex justify-content-center classescontainer w-100">
          <Container className="p-0 m-0 mb-5">
            <div className="d-flex justify-content-center flex-column w-100">
              <div>
                <h2 className="text-center gx my-5 ml-4 classTitleX">CLASSES</h2>
              </div>
              {renderClasses()}
            </div>
          </Container>
        </Container>
      </Container>
      <Footer />
    </Container>
  );
};

export default Classes;

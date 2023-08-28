import { DashFooter } from "common/src/components/shared/dashFooter";
import assignments_icon from "common/src/images/assignment_white.svg";
import {
  assignmentList,
  fetchClassDetails,
  updateClass
} from "common/src/old-api/classesActions";
import swr from "common/src/swr";
import moment from "moment";
import React,{ useEffect, useState } from "react";
import { Button, Col ,Row, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactSelect from "react-select";
import InviteStudent from "teacher/src/components/teachers/dialogs/inviteDialog";
import {
  ManageClass,
  RightSideClassesAccordion
} from "../components/teachers/classShow/index";
import Assignments from "../components/teachers/postWorkList/index";

const Index = (props)=>{
  const [selectClassOptions,setSelectClassOptions]=useState([]);
  const [selectedClass,setSelectedClass]=useState({});
  const [tabKey,setTabKey]=useState("home");
  const [startDate,setStartDate]=useState(null);
  const [dueDate,setDueDate]=useState(null);
  const [past,setPast]=useState([]);
  const [current,setCurrent]=useState([]);
  const [upcomming,setUpcomming]=useState([]);
  const [isInviteDialog,setIsInviteDialog]=useState(false);
  const [inviteClass,setInviteClass]=useState({});
  const clearDates=()=>{
    setStartDate();
    setDueDate();
  };
  const { data:classes=[],isLoading:isLoadingClasses }=swr.TEACHER.V0.CLASSES.useMyClasses({});
  useEffect(()=>{
    if(isLoadingClasses)return;
    const selectClassOptions=classes.map((c) =>({ value: c._id,label: c.name }));
    setSelectClassOptions(selectClassOptions);
    const selectedClass=selectClassOptions.length?selectClassOptions[0]:{};
    setSelectedClass(selectedClass);
  },[classes]);
  useEffect(()=>{
    const fetchAssignments= async()=>{
      const assignments=await assignmentList({
        params:{
          class_id: selectedClass?.value || null,
          ...(startDate && { startDate: moment(startDate).startOf("day").format() }),
          ...(dueDate && { dueDate: moment(dueDate).endOf("day").format() })
        }
      });
      const now = moment(new Date());
      setPast(assignments.filter(assignment=>moment(assignment.startDate).isBefore(now.startOf("day"))));
      setCurrent(assignments.filter(assignment=>
        moment(assignment.startDate).isSameOrAfter(now.startOf("day"))
              &&
              moment(assignment.startDate).isSameOrBefore(now.endOf("day"))
      )
      );
      setUpcomming(assignments.filter(assignment=>moment(assignment.startDate).isAfter(now.endOf("day"))));
    };
    fetchAssignments();
  },[startDate,dueDate,selectedClass]);
  return (
    <React.Fragment>
      <div className="px-4 py-5 main-section top-zero">
        <div className="">
          <Row className="mx-0">
            <Col sm={ 12 }>
              <h2 className="card-heading mb-4 d-flex">
                <img
                  className="pr-2"
                  height="24px"
                  src={ assignments_icon }
                  alt=""
                />
                All Assignments
              </h2>
            </Col>
            <Col md={ tabKey === "manage" ? "9" : "12" }>
              <div className="card border-0 br-12 assign-outer teach-tab-outer mb-4 px-3 py-4 mx-0">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={ tabKey }
                  className="teach-tabs assign-tabs"
                  onSelect={ setTabKey }
                >
                  <Tab eventKey="home" title="Current & Upcoming Assignments">
                    <div className="row">
                      <Col sm={ 12 } className="mb-4">
                        <Row>
                          <Col xs={ 3 }>
                            <ReactSelect
                              className="lit-react-select mt-4"
                              isClearable
                              onChange={ setSelectedClass }
                              options={ selectClassOptions }
                              value={ selectedClass }
                            />
                          </Col>
                          <Col xs={ 3 }>
                            { " " }
                            <input
                              type="date"
                              id="startDate"
                              name="startDate"
                              className="date-input w-100 mt-4"
                              data-date-inline-picker="true"
                              value={ startDate||"" }
                              onChange={ e=>setStartDate(e.target.value) }
                            ></input>
                          </Col>
                          <Col xs={ 3 }>
                            <input
                              type="date"
                              id="endDate"
                              name="endDate"
                              className="date-input w-100 mt-4"
                              data-date-inline-picker="true"
                              value={ dueDate||"" }
                              onChange={ e=>setDueDate(e.target.value) }
                            ></input>
                          </Col>
                          {
                            (startDate || dueDate) && 
                              <Col xs={ 3 }>
                                <Button
                                  variant="primary"
                                  className="primary-btn orange-btn btn btn-primary mt-4 px-5"
                                  style={ { height: "52px" } }
                                  onClick={ ()=>clearDates() }
                                >
                                  Clear Date Filter
                                </Button>
                              </Col>
                          }
                          <Col xs={ 3 }>
                            <Button
                              variant="primary"
                              className="primary-btn px-4 mt-4"
                              style={ { height: "52px" } }
                              onClick={ () =>
                                props.history.push(
                                  "/teacher/create-assignment"
                                )
                              }
                            >
                              Create Assignment
                            </Button>
                          </Col>
                            
                        </Row>
                      </Col>
                      <Col sm={ 12 }>
                        <Assignments
                          current={ current }
                          past={ past }
                          upcomming={ upcomming }
                          class_id={ selectedClass?.value }
                        />
                      </Col>
                    </div>
                  </Tab>
                  <Tab eventKey="manage" title="Manage Class">
                    <ManageClassComponent
                      setIsInviteDialog={ () =>setIsInviteDialog(true) }
                      setInviteClass={ (value) => setInviteClass( value) }
                      classId={ selectedClass?.value }
                      { ...props }
                    />
                  </Tab>
                </Tabs>
              </div>
            </Col>
            { tabKey === "manage" && (
              <Col md="3">
                <RightSideClassesAccordion
                  classes={ classes }
                  setIsInviteDialog={ () =>setIsInviteDialog(true) }
                  setInviteClass={ (value) => setInviteClass(value) }
                  { ...props }
                />
              </Col>
            ) }
          </Row>
        </div>
      </div>
      <DashFooter />
      <InviteStudent
        show={ isInviteDialog }
        handleClose={ () =>setIsInviteDialog(!isInviteDialog) }
        classData={ inviteClass }
      />
    </React.Fragment>
  );
};

const ManageClassComponent = (props) => {
  const { setIsInviteDialog, setInviteClass, classId } = props;
  const history = useHistory();
  const [edit, isEdit] = useState(false);
  const [className, setClassName] = useState("");
  const [classDetails, setClassDetails] = useState({});
  const [grade, setGrade] = React.useState("");
  const updateClasses = async () => {
    const name = className ? className : classDetails.name;
    const grad = grade ? grade : classDetails.grade;
    const result = await updateClass({
      class_id: classId,
      data: {
        name: name.toLowerCase(),
        grade: grad
      }
    });
    if (result) {
      history.push("/teacher/classes");
    }
  };
  React.useEffect(() => {
    if (classId) {
      (async () => {
        const res = await fetchClassDetails({
          class_id: classId
        });
        if (res) {
          setClassDetails(res);
          setInviteClass(res);
        }
      })();
    }
  }, [classId]);
  return (
    <ManageClass
      setIsInviteDialog={ setIsInviteDialog }
      setInviteClass={ setInviteClass }
      classDetails={ classDetails }
      setClassName={ setClassName }
      setGrade={ setGrade }
      edit={ edit }
      updateClasses={ updateClasses }
      isEdit={ isEdit }
    />
  );
};


export default Index;

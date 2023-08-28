import Congrats from "common/src/components/dialogs/congrats";
import StudentDialog from "common/src/components/dialogs/studentDialog";
import { showErrorMessages } from "common/src/components/helpers/notifications";
import { createPostwork } from "common/src/old-api/postworksActions";
import { fetchVideoDetails } from "common/src/old-api/videosActions";
import moment from "moment";
import React from "react";
import { Row } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";
import SelectStudents from "./selectStudents";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
export default function AssignmentStepper(props) {
  const [step, setStep] = React.useState(props.assignVideo != "" ? 1 : 0);
  const [data, setData] = React.useState({});
  const [isPreviousClick, setIsPreviousClick] = React.useState(false);

  const [attempts, setAttempts] = React.useState(1);
  const [classes, setClasses] = React.useState(0);
  const [classesList, setClassesList] = React.useState([]);
  const [student, setStudent] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  const [studentDialog, setStudentDialog] = React.useState(false);
  const [exercises, setExercises] = React.useState([]);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [subtitle, setSubtitle] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [congo, setCongo] = React.useState(false);
  const [allData, setAllData] = React.useState([]);
  const [currentClass, setCurrentClass] = React.useState("");
  const [classesData, setClassesData] = React.useState([]);

  React.useEffect(() => {
    if (props.assignVideo && !isPreviousClick) {
      videoDetailsData();
    }
  }, [props.assignVideo, isPreviousClick]);

  const videoDetailsData = async () => {
    const response = await fetchVideoDetails({
      video_id: props.assignVideo,
      isStats: false,
      params: {}
    });
    if (response) {
      setData(response);
    }
  };
  const handleStepforStep1 = (step, item) => {
    setStep(step);
    setData(item);
  };
  const showDialog = async (data, classId) => {
    setStudent(data);
    setCurrentClass(classId);
    setStudentDialog(true);
  };

  const handleStep = (step, classListData = [], forPervious = false) => {

    if (step == 3 && !forPervious) {

      const tempAll = allData.filter((item) =>
        classListData.some((id) => id == item._id)
      );

      const temp = tempAll?.map((item) => {
        return item?.students?.length;
      });

      if (temp.length > 0 && temp.filter((item) => item > 0).length == temp.length) {
        setStep(step);
      } else {
        showErrorMessages(["Please select at least one student from every selected class to do the assignment."], "Error");
      }
    } else {
      setStep(step);
    }
  };
  const handleSelectionStudents = (list, attempts) => {
    setStudent([]);
    setCurrentClass("");
    const tempAllData = JSON.parse(JSON.stringify(allData));
    const current = allData?.filter((item) => item._id === currentClass)[0];
    if (allData?.map((item) => item._id === currentClass)?.length > 0) {
      const temp = tempAllData.filter((item) => item._id !== currentClass);
      temp.push({
        _id: currentClass,
        students: list,
        allStudents: current.allStudents,
        attempts: attempts
      });
      setAllData(temp);
    } else {
      tempAllData.push({
        _id: currentClass,
        students: list,
        allStudents: current.allStudents,
        attempts: attempts
      });
      setAllData(tempAllData);
    }
  };
  const handleAll = (e) => {
    const current = allData?.filter((item) => item._id === currentClass)[0];
    if (current) {
      const remaining = allData?.filter((item) => item._id !== currentClass);
      remaining.push({
        _id: current._id,
        students: current.students,
        allStudents: e,
        attempts: current.attempts
      });
      setAllData(remaining);
    } else {
      const temp = JSON.parse(JSON.stringify(allData));
      temp.push({
        _id: currentClass,
        students: [],
        allStudents: e,
        attempts: current.attempts
      });
      setAllData(temp);
    }
  };
  const handleAttempts = (attempts) => {
    setAttempts(attempts);
  };
  const handleClasses = (val) => {
    setClasses(val);
  };
  const handleSetTitle = (val) => {
    setTitle(val);
  };
  const handleSetSubTitle = (val) => {
    setSubtitle(val);
  };
  const handleAllData = (checked, id) => {
    const tempAllData = JSON.parse(JSON.stringify(allData));
    if (checked) {
      tempAllData.push({
        _id: id,
        students: [],
        allStudents: true,
        attempts: attempts
      });
      setAllData(tempAllData);
    } else {
      if (!tempAllData.some((item) => item._id == id)) {
        tempAllData.push({
          _id: id,
          students: [],
          allStudents: true,
          attempts: attempts
        });
        setAllData(tempAllData);
      } else {
        const temp = tempAllData.filter((item) => item._id !== id);
        setAllData(temp);
      }
    }
  };
  const createAssignments = async () => {
    exercises.sort(function (a, b) {
      return a.id - b.id;
    });
    const tempAll = allData.filter((item) =>
      classesList.some((id) => id == item._id)
    );
    const res = await createPostwork({
      postwork: {
        title: title,
        video_id: data._id,
        class_ids: classesList,
        classes: tempAll,
        videoCaption: subtitle,
        dueDate: moment(endDate).format(),
        startDate: moment(startDate).format(),
        exercises: exercises,
        attempts: attempts
      }
    });
    if (res) {
      setCongo(true);
    }
  };
  const setStudentfromClass = (id, student) => {
    if (typeof student !== undefined) {
      let temp = JSON.parse(JSON.stringify(allData));
      const arr = temp.filter((item) => item._id == id);
      if (arr[0]) {
        temp = temp.filter((item) => item._id != id);
        temp.push({
          _id: id,
          students:
            student?.map((item) => ({
              _id: item._id,
              attempts: 1,
              firstName: item.firstName,
              lastName: item.lastName
            })) || [],
          allStudents: true,
          attempts: 1
        });
        setAllData(temp);
      } else {
        temp.push({
          _id: id,
          students:
            student?.map((item) => ({
              _id: item._id,
              attempts: 1,
              firstName: item.firstName,
              lastName: item.lastName
            })) || [],
          allStudents: true,
          attempts: 1
        });
        setAllData(temp);
      }
    } else {
      let temp = JSON.parse(JSON.stringify(allData));
      temp = temp.filter((item) => item._id != id);
      setAllData(temp);
    }
  };
  return (
    <div className="px-4 py-5 main-section top-zero">
      <Row className="card shadow-none border-0 px-3 py-4 mx-0 mb-5">
        <h2 className="card-heading mb-4 text-center">Create Assignments</h2>
        <div className="assign-stepper">
          <Stepper
            activeColor="#13BBED"
            completeColor="#13BBED"
            completeTitleColor="#13BBED"
            activeTitleColor="#13BBED"
            activeBorderColor="#13BBED"
            completeBorderColor="#13BBED"
            completeBarColor="#13BBED"
            steps={ [
              { title: "Select Assignment" },
              { title: "Select Classes" },
              { title: "Select Students" },
              { title: "Select Postwork Activities and Date" }
            ] }
            activeStep={ step }
          />
        </div>
      </Row>
      <div className="col-sm-12">
        { {
          0: <Step1 setStep={ handleStepforStep1 } />,
          1: (
            <Step2
              student={ student }
              attempts={ attempts }
              saved_class_id={ classes }
              classesList={ classesList }
              selectedStudent={ selectedStudent }
              classesData={ classesData }
              setStep={ handleStep }
              setClassesData={ setClassesData }
              setIsPreviousClick={ setIsPreviousClick }
              showDialog={ showDialog }
              handleClasses={ handleClasses }
              handleAllData={ handleAllData }
              setClassesList={ setClassesList }
              setStudentfromClass={ setStudentfromClass }
              { ...props }
            />
          ),
          2: (
            <SelectStudents
              allData={ allData }
              classesData={ classesData }
              selectedClasses={ classesList }
              attempts={ attempts }
              setStep={ handleStep }
              showDialog={ showDialog }
              { ...props }
            />
          ),
          3: (
            <Step3
              data={ data }
              setStep={ handleStep }
              exercises={ exercises }
              setExercises={ setExercises }
              setStartDate={ setStartDate }
              setEndDate={ setEndDate }
              handleSetTitle={ handleSetTitle }
              handleSetSubTitle={ handleSetSubTitle }
              title={ title }
              subtitle={ subtitle }
              startDate={ startDate }
              endDate={ endDate }
              createAssignments={ createAssignments }
            />
          )
        }[step] || <div>No step Selected</div> }
      </div>
      <StudentDialog
        show={ studentDialog }
        student={ student }
        _all={ allData?.filter((item) => item._id === currentClass)[0] }
        _setAll={ handleAll }
        list={ allData?.filter((item) => item._id === currentClass)[0]?.students }
        attempt={
          allData?.filter((item) => item._id === currentClass)[0]?.attempts || 0
        }
        handleAttempts={ handleAttempts }
        handleSelectionStudents={ handleSelectionStudents }
        handleClose={ () => {
          setStudentDialog(false);
        } }
      />
      <Congrats
        show={ congo }
        handleClose={ () => {
        } }
      />
    </div>
  );
}

import Congrats from "common/src/components/dialogs/congrats";
import StudentDialog from "common/src/components/dialogs/studentDialog";
import { showErrorMessages } from "common/src/components/helpers/notifications";
import VideoPlayer from "common/src/components/videoPlayer/videoPlayer";
import { fetchClasses } from "common/src/old-api/classesActions";
import { createPostwork } from "common/src/old-api/postworksActions";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Home from "./home";
import SelectClassAndStudent from "../components/teachers/video/selectClassandStudent";
import VideoStats from "../components/teachers/video/videoStats";
/**
 * Summary.(Creating Assignment from video)
 * @returns
 */
export default function AssignVideo(props) {
  const [page, setPage] = React.useState(1);
  const [video, setVideo] = React.useState({});
  const [title, handleSetTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [exercises, setExercises] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [selectClass, setSelectClass] = React.useState("");
  const [studentDialog, setStudentDialog] = React.useState(false);
  const [student, setStudent] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  const [attempts, setAttempts] = React.useState(1);
  const [congo, setCongo] = React.useState(false);
  const [allData, setAllData] = React.useState([]);
  const [currentClass, setCurrentClass] = React.useState("");
  const [classesList, setClassesList] = React.useState([]);
  const [classId, setClassId] = React.useState([]);

  React.useEffect(() => {
    if (page === 3) {
      (async () => {
        const res = await fetchClasses({ });
        if (res) {
          setClasses(res);
        }
      })();
    }
  }, [page]);
  const handlePage = (data) => {
    setVideo(data);
    setPage(3);
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

    // setSelectedStudent(list);
  };

  const handleAttempts = (attempts) => {
    setAttempts(attempts);
  };
  const showDialog = async (data, classId) => {
    setStudent(data);
    setCurrentClass(classId);
    setStudentDialog(true);
  };
  const handleAllData = (e, id) => {
    const tempAllData = JSON.parse(JSON.stringify(allData));
    if (e && e.target && e.target.checked) {
      tempAllData.push({
        _id: id,
        students: [],
        allStudents: false,
        attempts: attempts
      });
      setAllData(tempAllData);
    } else {
      if (!tempAllData.some((item) => item._id == id)) {
        tempAllData.push({
          _id: id,
          students: [],
          allStudents: false,
          attempts: attempts
        });
        setAllData(tempAllData);
      } else {
        const temp = tempAllData.filter((item) => item._id !== id);
        setAllData(temp);
      }
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

  const setStudentfromClass = (id, student) => {
    // setCurrentClass(id);
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
  const handleSubmit = async (list, start, end, classId, titleFor) => {


    list.sort(function (a, b) {
      return a.id - b.id;
    });

    const ids = classId.map((item) => item._id);

    const tempAll = allData.filter((item) => ids.some((id) => id == item._id));


    const temp = tempAll?.map((item) => {
      return item?.students?.length;
    });


    if (temp.filter((item) => item > 0).length == temp.length) {
      const res = await createPostwork({
        postwork: {
          title: titleFor,
          video_id: video._id,
          class_ids: ids,
          classes: tempAll,
          videoCaption: true,
          dueDate: moment(end).format(),
          startDate: moment(start).format(),
          exercises: list
        }
      });
      if (res) {
        setCongo(true);
      }
    } else {
      showErrorMessages(["Please select at least one student from every selected class to do the assignment."], "Error");
    }

  };

  return (
    <div className="p-4 main-section top-zero">
      <div className="card px-3 py-4 mx-0">
        { {
          1: <Home from="stepper" handleEvents={ { handleStep: handlePage } } />,
          2: (
            <VideoStats
              video={ video }
              VideoPlayer={ VideoPlayer }
              handleEvents={ {
                handleStep: (id) => {
                  setPage(id);
                }
              } }
            />
          ),
          3: (
            <SelectClassAndStudent
              data={ video }
              setStep={ (id) => {
                setPage(id);
              } }
              setStudentfromClass={ setStudentfromClass }
              setExercises={ setExercises }
              exercises={ exercises }
              setStartDate={ setStartDate }
              startDate={ startDate }
              setEndDate={ setEndDate }
              endDate={ endDate }
              handleSetTitle={ handleSetTitle }
              classes={ classes }
              setSelectClass={ setSelectClass }
              title={ title }
              showDialog={ showDialog }
              allData={ allData }
              selectedStudent={ selectedStudent }
              handleSelectionStudents={ handleSelectionStudents }
              handleSubmit={ handleSubmit }
              handleAllData={ handleAllData }
              setClassesList={ setClassesList }
              classId={ classId }
              setClassId={ setClassId }
            />
          )
        }[page] || <div>Page Not Found</div> }
      </div>
      <StudentDialog
        show={ studentDialog }
        student={ student }
        st
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
          // setCongo(false);
        } }
      />
    </div>
  );
}

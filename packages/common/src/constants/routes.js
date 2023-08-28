import store from "main/src/store";

export const TEACHER_ROUTES = {
  PAGES: {
    VIDEOS: {
      MONTHS: "/teacher/months"
    },
    STUDENTS: {
      PROFILE: (studentId) => `/teacher/student/${studentId}`,
      INVITE: "/teacher/invite"
    }
  }
};

export const STUDENT_ROUTES = {
  PAGES: {
    VIDEOS: {
      MONTHS: "/student/months"
    }
  }
};

export const SHARED_ROUTES = {
  PAGES: () => {
    const state=store.getState();
    const { role=null }= state?.user||{};

    return (
      {
        VIDEOS: {
          MONTHS:`/${role}/months`
        }
      });
  }
};
const ROUTES = {
  TEACHER: TEACHER_ROUTES,
  STUDENT: STUDENT_ROUTES,
  SHARED:SHARED_ROUTES
};

export default ROUTES;

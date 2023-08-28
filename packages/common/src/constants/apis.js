const API = "/api";
const STUDENT={
  V0:{
    VIDEOS:{
      LIST:`${API}/student/videos`
    }
  }
};
const TEACHER={
  V0:{
    VIDEOS:{
      LIST:`${API}/teacher/videos`,
      SEARCH : `${API}/teacher/videos`
    },
    STUDENTS:{
      LIST:`${API}/teacher/students`
    },
    CLASSES:{
      LIST:`${API}/teacher/classes`
    }
  }
};

const V0={
  TEACHER:{
    VIDEOS:{
      LIST:`${API}/teacher/videos`,
      SEARCH:`${API}/teacher/videos/search`
    },
    STUDENTS:{
      LIST:`${API}/teacher/students`
    },
    CLASSES:{
      LIST:`${API}/teacher/classes`
    },
    DASHBOARD:{
      COUNT:"accounts/dashboard"
    }
  },
  STUDENT:{
    VIDEOS:{
      LIST:`${API}/student/videos`
    }
  },
  SHARED:{
    VIDEOS:{
      LIST:"videos"
    }
  }
};

const V1={
  TEACHER:{
    VIDEOS:{
      LIST:`${API}/v1/teacher/videos`
    }
  }
};

const apis = { STUDENT,TEACHER,V0,V1 };
export default apis;

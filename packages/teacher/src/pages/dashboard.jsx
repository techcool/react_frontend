/* eslint-disable eqeqeq */
import NotHaveAccess from "common/src/components/dialogs/notHaveAccess";
import { Card } from "common/src/components/shared/card";
import { Monthly } from "common/src/components/videos/monthly";
import  Panel from "common/src/components/videos/panel";
import { SliderComponent } from "common/src/components/videos/sliderComponent";
import all from "common/src/images/all.svg";
import biography from "common/src/images/biography.svg";
import cultural from "common/src/images/cultural.svg";
import intermediate from "common/src/images/intermediate.svg";
import novice from "common/src/images/novice.svg";
import {
  fetchVideoCategories,
  fetchVideos
} from "common/src/old-api/videosActions";
import React, { Fragment, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import SearchSection from "./searchSection";

export function Dashboard(props) {
  const limit = 16;
  const { dashboard, refetch, searchKeywords } = props;
  // const [data:searchResults=[],isLoading:isSearchLoading]=
  const {
    role,
    packId,
    freeTrialExpired,
    packExpired
  } = useSelector((state) => state.user);
  const [key, setKey] = useState("home");
  const [favorites, setFavorite] = useState([]);
  const [category, setCategory] = useState("");
  const [videoCategories, setVideoCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isFilter, setFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabData, settabData] = useState([]);
  const [notAuthorized, setnotAuthorized] = useState(false);
  const [requestData, setRequestData] = useState({
    category: "",
    level: {},
    type: {},
    structure: {},
    authenticTasks: {}
  });

  const svgArray = [novice, intermediate, biography, cultural];

  React.useEffect(() => {
    if (freeTrialExpired && packExpired && role !== "student") {
      setnotAuthorized(true);
    } else {
      setnotAuthorized(false);
    }
    if (dashboard.userFavourites) {
      const fav = dashboard.userFavourites.map((item) => {
        return item._id;
      });
      setFavorite(fav);
    }
  }, [dashboard.userFavourites]);
  React.useEffect(() => {
    (async function () {
      const videoCategories = await fetchVideoCategories({});
      if (videoCategories) {
        setVideoCategories(videoCategories);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async function () {
      const getAllData = await fetchVideos({
        isStats: props.isStats
      });
      if (getAllData) {
        setAllData(getAllData);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (props.from === "stepper" || props.from === "videos") {
      handleSelectChange(undefined, undefined, 1, limit, null);
    }
  }, [props.from]);
  /**
   * This useEffect is for creating selection data for categories
   */
  React.useEffect(() => {
    if (videoCategories.length > 0) {
      let level = [];
      let type = [];
      let structure = [];
      let authenticTasks = [];

      videoCategories.forEach((item) => {
        if (item.details) {
          item.details.forEach((i) => {
            switch (i.label) {
            case "Level":
              i.values.forEach((val) =>
                level.push({
                  value: val.id,
                  label: val.label,
                  category: item.id,
                  subcategory: 0,
                  categoryLabel: item.label
                })
              );
              break;
            case "Type":
              i.values.forEach((val) =>
                type.push({
                  value: val.id,
                  label: val.label,
                  category: item.id,
                  subcategory: 1,
                  categoryLabel: item.label
                })
              );
              break;
            case "Structure":
              i.values.forEach((val) =>
                structure.push({
                  value: val.id,
                  label: `${val.label}`,
                  category: item.id,
                  subcategory: 2,
                  categoryLabel: item.label
                })
              );
              break;
            case "Authentic Tasks":
              i.values.forEach((val) =>
                authenticTasks.push({
                  value: val.id,
                  label: `${val.label}`,
                  category: item.id,
                  subcategory: 3,
                  categoryLabel: item.label
                })
              );
              break;
            default:
            }
          });
        }
      });

      setAllCategories([
        { data: level, name: "Level", id: 0 },
        { data: type, name: "Type", id: 1 },
        { data: structure, name: "Structure", id: 2 },
        { data: authenticTasks, name: "Authentic Tasks", id: 3 }
      ]);
    }
  }, [videoCategories]);

  // React.useEffect(() => {
  //   if (props.searchKeywords) {
  //     search(props.searchKeywords);
  //   }
  // }, [props.searchKeywords]);


  const setRequestvalues = (val, category) => {
    setCategory(val?.category);

    let conditaionalCat = val?.hasOwnProperty("subcategory") ? val.subcategory : category;

    switch (conditaionalCat) {
    case 0:
      requestData.level = val;
      break;
    case 1:
      requestData.type = val;
      break;
    case 2:
      requestData.structure = val;
      break;
    case 3:
      requestData.authenticTasks = val;
      break;

    default:
    }
    setRequestData(requestData);
  };
  const handleSelectChange = async (val, category, page, limit) => {

    let showContent = false;
    if (val && (val.category == 2 || val.category == 3)) {
      const allowedPacks = videoCategories.find(
        (category) => category.id == val.category
      )?.packIds;

      if (allowedPacks?.indexOf(packId) >= 0 || role == "student") {
        showContent = true;
      } else {
        showContent = false;
      }
    } else {
      showContent = true;
    }

    if (showContent) {
      setLoading(true);
      setRequestvalues(val, category);
      let skip = (page - 1) * limit;
      let filter = {
        category: val?.category,
        level: requestData.level?.value,
        type: requestData.type.value,
        structure: requestData.structure.value,
        authenticTasks: requestData.authenticTasks.value,
        page,
        skip: skip || undefined,
        limit
      };
      if (val === null) {
        setFilter(false);
      } else {
        setFilter(true);
      }
      const data = await fetchVideos({
        filter,
        isStats: props.isStats
      });
      if (typeof data === "object") {
        setLoading(false);
        setFilterData(data);
      }
    } else {
      setnotAuthorized(true);
    }
  };
  const getValue = (id) => {
    switch (id) {
    case 0:
      return requestData.level;
    case 1:
      return requestData.type;
    case 2:
      return requestData.structure;
    case 3:
      return requestData.authenticTasks;
    default:
      return {};
    }
  };

  const handleTabChangeSelect = async (
    val,
    category,
    page,
    limit,
    categoryId,
    isTab
  ) => {

    if (categoryId != "home") {
      //show loader

      const allowedPacks = videoCategories.find(
        (category) => category.id == categoryId
      )?.packIds;

      if (allowedPacks?.indexOf(packId) >= 0 || role == "student") {
        setLoading(true);
        setnotAuthorized(false);
        setKey(categoryId);

        setRequestvalues(val, category);

        let skip = (page - 1) * limit;
        let filter = isTab
          ? {
            category: categoryId,
            page,
            skip: skip,
            limit
          }
          : {
            category: categoryId,
            level: requestData.level?.value,
            type: requestData.type.value,
            structure: requestData.structure.value,
            authenticTasks: requestData.authenticTasks.value,
            page,
            skip: skip,
            limit
          };
        const data = await fetchVideos({
          filter,
          isStats: props.isStats
        });
        if (typeof data === "object") {
          settabData(data);
          setLoading(false);
          //hide loader
        }
      } else {
        // settabData({});
        if (role !== "student") {
          setnotAuthorized(true);
        }
      }
    } else {
      setKey(categoryId);
      if (props.from === "stepper" || props.from === "videos") {
        handleSelectChange(val, category, page, limit, undefined);
      }
    }
  };

  const onTabSelect = async (key) => {
    await setRequestData({
      category: "",
      level: {},
      type: {},
      structure: {},
      authenticTasks: {}
    });
    handleTabChangeSelect(undefined, undefined, 1, limit, key, true);
  };

  return (
    <div>
      <NotHaveAccess
        role="teacher"
        packId={ packId }
        notAuthorized={ notAuthorized }
        freeTrialExpired={ freeTrialExpired }
        setnotAuthorized={ () => {
          setnotAuthorized(false);
          setLoading(false);
        } }
      />
      <div className="card custom-card teach-tab-outer mb-4">
        <Tabs
          id="controlled-tab-example"
          activeKey={ key }
          className="teach-tabs"
          onSelect={ (k) => {
            onTabSelect(k);
          } }
        >
          { props.from === "stepper" || props.from === "videos" ? (
            <Tab
              eventKey="home"
              title={
                <span>
                  <img className="pr-2" height="20px" src={ all } alt="" /> All
                </span>
              }
            >
              <Panel
                videoCategories={ videoCategories }
                allCategories={ allCategories }
                handleSelectChange={ handleSelectChange }
                getValue={ getValue }
                data={ filterData }
                favorites={ favorites }
                category={ category }
                refetch={ refetch }
                icon={ all }
                isTrue={ true }
                title={ "All" }
                from={ props.from }
                loader={ loading }
                limit={ limit }
                handleEvents={ props.handleEvents }
                { ...props }
              />
            </Tab>
          ) : (
            <Tab
              eventKey="home"
              title={
                <span>
                  <img className="pr-2" src={ all } alt="" /> All
                </span>
              }
            >
              <div className="row px-4">
                <div className="col">
                  { /* <label htmlFor={"posttype"}>Type</label> */ }
                  <ReactSelect
                    id={ "posttype" }
                    className="lit-react-select grey pt-3"
                    placeholder="Videos"
                    isClearable
                    isDisabled={ true }
                    // onChange={(val) => this.handleChange(val)}
                    options={ [
                      {
                        label: "Videos",
                        value: "videos"
                      },
                      {
                        label: "News",
                        value: "news"
                      }
                    ] }
                  />
                </div>
                <div className="col">
                  <ReactSelect
                    id={ "posttype" }
                    className="lit-react-select grey pt-3"
                    placeholder="Category"
                    isClearable
                    // isDisabled={true}
                    onChange={ (val) => handleSelectChange(val, val?.id) }
                    options={
                      videoCategories?.map((item, i) => {
                        return {
                          value: item.id,
                          label: item.label,
                          category: item.id,
                          categoryLabel: item.label
                        };
                      })
                    }
                  />
                </div>
                {
                  allCategories?.map((item, i) => {
                    return (
                      <div className="col" key={ item.name + i }>
                        { /* <label htmlFor={item.name + i}>{item.name}</label> */ }
                        <ReactSelect
                          id={ item.name + i }
                          className="lit-react-select grey pt-3"
                          isClearable
                          placeholder={ item.name }
                          onChange={ (val) => handleSelectChange(val, item.id) }
                          options={ item.data.filter(
                            (i) => i.category === category
                          ) }
                        // defaultValue={getValue(item.id)}
                        />
                      </div>
                    );
                  }) }
              </div>
              { isFilter ? (
                <div className="row mt-4" style={ { minHeight: "400px" } }>
                  { loading ?
                    <div className="col-sm-12 text-center p-5">
                      <h2>Loading...</h2>
                    </div>
                    : filterData?.map((item) =>
                      <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
                        <Card
                          data={ item }
                          refetch={ refetch }
                        />
                      </div>)
                  }
                  { !loading && filterData?.length == 0 && (
                    <div className="col-sm-12 text-center pt-4">
                      <h2>No Result Found</h2>
                    </div>
                  ) }
                </div>
              ) :
                <>
                  <SearchSection searchKeywords={ searchKeywords } { ...props } />
                  {
                    dashboard?.featured?.length > 0 && (
                      <>
                        <SliderComponent
                          data={ dashboard.featured }
                          title={ "New and Featured" }
                          buttonName={ "View New and Featured" }
                          favorites={ favorites }
                          refetch={ refetch }
                          { ...props }
                          link={ "" }
                        />
                        <hr className="speration-line" />
                      </>
                    )
                  }
                  { allData?.length > 0 && (
                    <>
                      <SliderComponent
                        data={ allData }
                        title={ "All" }
                        buttonName={ "View All" }
                        favorites={ favorites }
                        refetch={ refetch }
                        { ...props }
                        link={ `/${role}/videos/all` }
                      />
                      <hr className="speration-line" />
                    </>
                  ) }
                  { dashboard?.recommended?.length > 0 && (
                    <>
                      <SliderComponent
                        data={ dashboard.recommended }
                        title={ "Recommended" }
                        buttonName={ "View All Recommended" }
                        favorites={ favorites }
                        refetch={ refetch }
                        { ...props }
                        link={ `/${role}/video/recommended` }
                      />
                      <hr className="speration-line" />
                    </>
                  ) }
                  { dashboard?.watchedVideos?.length > 0 && (
                    <>
                      <SliderComponent
                        data={ dashboard.watchedVideos }
                        title={ "Recently Watched" }
                        buttonName={ "Recently Watched" }
                        favorites={ favorites }
                        refetch={ refetch }
                        { ...props }
                        link={ `/${role}/video/watched` }
                      />
                      <hr className="speration-line" />
                    </>
                  ) }
                  { dashboard?.favouriteVideos?.length > 0 && (
                    <>
                      <SliderComponent
                        data={ dashboard.favouriteVideos }
                        title={ "Favorites" }
                        buttonName={ "View Favorites" }
                        favorites={ favorites }
                        refetch={ refetch }
                        { ...props }
                        link={ `/${role}/video/favorites` }
                      />
                      <hr className="speration-line" />
                    </>
                  ) }
                  <Monthly
                    { ...props }
                    favorites={ favorites }
                    allData={ allData }
                    refetch={ refetch }
                    { ...props }
                  />
                </>
              }
            </Tab>
          ) }{ " " }
          {
            videoCategories?.map((item, i) => {
              const svgIcon = svgArray[item.id];
              return (
                <Tab
                  key={ "category" + i }
                  eventKey={ item.id }
                  title={
                    <span>
                      <img
                        className="pr-2"
                        height="20px"
                        src={ svgIcon }
                        alt=""
                      />{ " " }
                      { item.label }
                    </span>
                  }
                >
                  <Panel
                    videoCategories={ videoCategories }
                    allCategories={ allCategories }
                    handleSelectChange={ handleTabChangeSelect }
                    getValue={ getValue }
                    data={ tabData }
                    loader={ loading }
                    category={ item.id }
                    refetch={ refetch }
                    icon={ svgIcon }
                    title={ item.label }
                    from={ props.from }
                    limit={ limit }
                    { ...props }
                    handleEvents={ props.handleEvents }
                  />
                </Tab>
              );
            }) }
        </Tabs>
      </div>
    </div>
  );
}

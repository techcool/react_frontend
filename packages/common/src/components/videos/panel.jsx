import { Card } from "common/src/components/shared/card";
import ListPagination from "common/src/components/shared/pagination";
import React from "react";
// import { Pagination } from "react-bootstrap";
import ReactSelect from "react-select";
export default function Novice(props) {
  const {
    allCategories,
    videoCategories,
    handleSelectChange,
    getValue,
    loader,
    data,
    refetch,
    category,
    icon,
    title,
    limit
  } = props;
  const [Data, setData] = React.useState([]);
  const [metaData, setMetaData] = React.useState({});
  React.useEffect(() => {
    if (allCategories) {
      // handleSelectChange(undefined, undefined, 1, 4, "home");
    }
  }, [allCategories]);

  React.useEffect(() => {
    if (data[0]) {
      setData(data[0].data);
      setMetaData(data[0].paginationData);
      // setMetaData(
      //   data[0].paginationData && data[0].paginationData[0]
      //     ? data[0].paginationData[0]
      //     : []
      // );
    } else {
      setData([]);
    }
  }, [data]);

  return (
    <>
      <div>
        <div
          className="card custom-card px-4 py-4"
          style={ { minHeight: "400px" } }
        >
          <h4 className="dash-card-heading mb-4 d-flex">
            <img className="pr-2" height="24px" src={ icon } alt="" />
            { title }
          </h4>
          <div className="row">
            <div className="col">
              { /* <label htmlFor={"posttype"}>Type</label> */ }
              <ReactSelect
                id={ "posttype" }
                isDisabled={ true }
                className="lit-react-select grey"
                placeholder="Videos"
                isClearable
                // onChange={(val) => this.handleChange(val)}
                options={ [
                  {
                    label: "Videos",
                    value: "videos"
                  },
                  {
                    label: "Storybook",
                    value: "s"
                  }
                ] }
              />
            </div>
            { title === "All" && (
              <div className="col">
                <ReactSelect
                  id={ "posttype" }
                  className="lit-react-select grey"
                  placeholder="Category"
                  isClearable
                  // isDisabled={true}
                  onChange={ (val) =>
                    handleSelectChange(val, val?.id, 1, limit, val?.id)
                  }
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
            ) }
            { 
              allCategories?.map((item, i) => {
                return (
                  <div className="col" key={ i + item }>
                    { /* <label htmlFor={item.name + i}>{item.name}</label> */ }
                    <ReactSelect
                      id={ item.name + i }
                      className="lit-react-select grey"
                      isClearable
                      placeholder={ item.name }
                      onChange={ (val) => handleSelectChange(val, category, 1, limit, category)
                      }
                      options={
                        props.isTrue === true
                          ? item.data.filter((i) => i.category === category)
                          : item.data.filter((i) => i.category === category)
                      }
                      //   defaultValue={getValue(item.id)}
                    />
                  </div>
                );
              }) }
          </div>
          { loader ? (
            <div className="col-sm-12 text-center p-5">
              <h2>Loading...</h2>
            </div>
          ) : (
            <div className="row mt-4">
              { Data && Data.length > 0 ? (
                Data?.map((item, i) => {
                  return (
                    <div
                      className="col-sm-12 col-md-4 col-xxl-3 mb-4"
                      key={ i + "card" }
                    >
                      <Card
                        data={ item }
                        refetch={ refetch }
                        from={ props.from }
                        handleEvents={ props.handleEvents }
                        isStats={ props.isStats }
                      />
                    </div>
                  );
                })
              ) : (
                <h3 className="mt-4" style={ { margin:"0 auto" } }> No { title } Data Found</h3>
              ) }
            </div>
          ) }
          { metaData?.page && !loader && (
            <ListPagination
              list={ metaData }
              prev={ (page) => {
                handleSelectChange(undefined, undefined, page, limit, category);
              } }
              next={ (page) => {
                handleSelectChange(undefined, undefined, page, limit, category);
              } }
            />
          ) }
          { /* <Button variant="dark" className="recommended-btn mt-5">View All Favorites</Button> */ }
        </div>
      </div>
    </>
  );
}

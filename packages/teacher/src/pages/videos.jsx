import { Card } from "common/src/components/shared/card";
import { DashFooter } from "common/src/components/shared/dashFooter";
import { fetchMyVideos } from "common/src/old-api/videosActions";
import React from "react";
import { Pagination } from "react-bootstrap";
import SearchSection from "./searchSection";
import Count from "../components/dashbordCount/index";

class TeachersClassesNew extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      data: {},
      type: "",
      page: 1,
      metadata: {},
      searchKeywords: ""
    };
  }
  componentDidMount() {
    let tempType = this.props.match.url.split("/");
    const type = tempType[tempType.length - 1];

    const apiType =
      {
        favorites: "favouriteVideos",
        recommended: "recommendedVideos",
        watched: "watchedVideos"
      }[type] || "default";
    this.setState({ type: apiType }, () => {
      this.fetchVideos(1);
    });
    const title =
      {
        favorites: "Favorites",
        recommended: "Recommended",
        watched: "Recently Watched"
      }[type] || "default";
    this.setState({ title: title });

  }

  fetchVideos = async (page) => {
    if (page !== this.state.page) {
      this.setState({ page: page });
    }
    const limit = 5;
    const skip = limit * (page - 1);
    const type = this.state.type;
    const data = await fetchMyVideos({
      params: {
        limit: limit,
        page: page,
        skip: skip,
        videoType: type
      }
    });
    if (data) {
      this.setState({ data: data, metadata: data.paginationData });
    }
  };

  render() {
    const { data, metadata, page } = this.state;
    return (
      <div className="p-4 main-section top-zero">
        { " " }
        <Count
          searchKeywords={ this.state.searchKeywords }
          onUpdatesearchKeywords={ searchKeywords => this.setState({ searchKeywords }) }
        />
        <div
          className="card custom-card px-4 py-4 mt-4"
          style={ { minHeight: "400px" } }
        >
          <h4 className="dash-card-heading mb-4 d-flex">
            <img className="pr-2" height="24px" src="" alt="" />
            { this.state.title }
          </h4>

          { this.state.searchKeywords && 
            <SearchSection searchKeywords={ this.state.searchKeywords } 
              { ...{ [this.state.type]:true } } /> }

          { !this.state.searchKeywords && (
            <React.Fragment>
              <div className="row">
                {
                  data?.data?.map((item,index) => {
                    return (
                      <div key={ index } className="col-sm-12 col-md-4 col-xxl-3  mb-4">
                        <Card
                          data={ item }
                          refetch={ async () => {
                            await this.fetchVideos(page);
                            return true;
                          } }
                        />
                      </div>
                    );
                  })
                }
              </div>
              <div className="m-auto">

                { data?.data && data?.data?.length > 0 && metadata.page && (
                  <Pagination className="my-4">
                    <Pagination.Prev
                      disabled={ metadata.skip === 0 ? true : false }
                      onClick={ () => {
                        this.fetchVideos(metadata.page - 1);
                      } }
                    >
                      Prev
                    </Pagination.Prev>
                    { metadata.skip !== 0 && (
                      <Pagination.Item
                        onClick={ () => {
                          this.fetchVideos(metadata.page - 1);
                        } }
                      >
                        { metadata.page - 1 }
                      </Pagination.Item>
                    ) }
                    <Pagination.Item active> { metadata.page }</Pagination.Item>
                    { metadata.totalDocs - metadata.skip - metadata.limit > 0 && (
                      <Pagination.Item
                        onClick={ () => {
                          this.fetchVideos(metadata.page + 1);
                        } }
                      >
                        { metadata.page + 1 }
                      </Pagination.Item>
                    ) }
                    <Pagination.Next
                      disabled={
                        metadata.totalDocs - metadata.skip - metadata.limit < 1
                          ? true
                          : false
                      }
                      onClick={ () => {
                        this.fetchVideos(metadata.page + 1);
                      } }
                    >
                      Next
                    </Pagination.Next>
                  </Pagination>
                ) }
              </div>
              { data?.data?.length == 0 && (
                <h2> No { this.state.title } Video Found</h2>
              ) }
            </React.Fragment>
          )
          }
        </div>
        <DashFooter />
      </div>
    );
  }
}

export default TeachersClassesNew;

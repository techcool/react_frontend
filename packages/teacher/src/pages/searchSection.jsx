import { Card } from "common/src/components/shared/card";
import video_icon from "common/src/images/videos_blue.svg";
import swr from "common/src/swr";
import React from "react";
import { Pagination } from "react-bootstrap";

const SectionContainer = ({ children })=>
  <div>
    <div className="card custom-card px-4 py-4 mt-4">
      <h4 className="dash-card-heading mb-4 d-flex 12">
        <img className="pr-2" src={ video_icon } alt="video icon" />
        Search Results
      </h4>
      { children }
    </div>
  </div>;


export default function searchSection(props) {

  const { searchKeywords, limit, ...type } = props;

  const {
    data: searchData = [],
    isLoading: searchLoading
  } = searchKeywords && swr.TEACHER.V1.VIDEOS.useVideoList({
    keywords: searchKeywords,
    limit: 0,
    [type]:true
  });


  if (!searchKeywords) {
    return <></>;
  }

  if (searchLoading)
    return (
      <div className="col-sm-12 text-center p-5">
        <h2>Loading...</h2>
      </div>
    );
  if(searchData?.data?.length == 0)
    return(
      <SectionContainer>
        <h2>No Result Found</h2>
      </SectionContainer>
    );
  if(limit !== 0)
    return(
      <SectionContainer>
        <React.Fragment>
          <div className="row">
            {
              searchData?.data?.map((item,index) => {
                return (
                  <div key={ index } className="col-sm-12 col-md-4 col-xl-3  mb-4 mt-4 px-4">
                    <Card
                      data={ item }
                      // refetch={ async () => {
                      //   await this.fetchVideos(page);
                      //   return true;
                      // } }
                    />
                  </div>
                );
              })
            }
          </div>
          <div className="m-auto">
            { searchData?.data && searchData?.data?.length > 0 && searchData.metadata.page && (
              <Pagination className="my-4">
                <Pagination.Prev
                  disabled={ searchData.metadata.skip === 0 ? true : false }
                  onClick={ () => {
                    // this.fetchVideos(searchData.metadata.page - 1);
                  } }
                >
                  Prev
                </Pagination.Prev>
                { searchData.metadata.skip !== 0 && (
                  <Pagination.Item
                    onClick={ () => {
                      // this.fetchVideos(metadata.page - 1);
                    } }
                  >
                    { searchData.metadata.page - 1 }
                  </Pagination.Item>
                ) }
                <Pagination.Item active> { searchData.metadata.page }</Pagination.Item>
                { searchData.metadata.totalDocs - searchData.metadata.skip - searchData.metadata.limit > 0 && (
                  <Pagination.Item
                    onClick={ () => {
                      // this.fetchVideos(searchData.metadata.page + 1);
                    } }
                  >
                    { searchData.metadata.page + 1 }
                  </Pagination.Item>
                ) }
                <Pagination.Next
                  disabled={
                    searchData.metadata.totalDocs - searchData.metadata.skip - searchData.metadata.limit < 1
                      ? true
                      : false
                  }
                  onClick={ () => {
                    // this.fetchVideos(searchData.metadata.page + 1);
                  } }
                >
                  Next
                </Pagination.Next>
              </Pagination>
            ) }
          </div>
        </React.Fragment>      

      </SectionContainer>);
}

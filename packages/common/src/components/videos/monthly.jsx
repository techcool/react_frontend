import { Card } from "common/src/components/shared/card";
import Pagination from "common/src/components/shared/pagination";
import ShouldRender from "common/src/components/shared/ShouldRender";
import WrapperSwitcher from "common/src/components/shared/WrapperSwitcher";
import routes from "common/src/constants/routes";
import month_icon from "common/src/images/month_icon.svg";
import swr from "common/src/swr/index"; 
import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import Slider from "react-slick";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const pageSize = 10;
export function Monthly(props) {
  const {  refetch, show } = props;
  const history = useHistory();
  const [active, setActive] = React.useState("-2");
  const [preferredMonth, setPreferredMonth] = useState(null);
  const [page, setPage] = useState(show?1:null);
  const { data = [], isLoading } = swr.SHARED.V0.VIDOES.useVideoList({ 
    preferredMonth, 
    page,
    limit:show?pageSize:null
  });
  React.useEffect(() => setPage(show?1:null), [preferredMonth]);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data?.length > 4 ? 4 : 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: data?.length > 4 ? 4 : 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: data?.length > 3 ? 3 : 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: data?.length > 2 ? 2 : 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: data?.length > 1 ? 1 : 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div>
      <div className="card custom-card px-4 py-4 mt-4">
        <h4 className="dash-card-heading mb-4 d-flex">
          <img className="pr-2" src={ month_icon } height="24px" alt="" />
          Month By Month
        </h4>
        <div className="row">
          <div className="col-sm-12 row mb-4">
            <Button
              variant={ active == -2 ? "primary" : "info" }
              className="monthly-btn mb-3 ml-3"
              onClick={ () => {
                setPreferredMonth(null);
              } }
            >
              All
            </Button>
            { months.map((item, i) => {
              return (
                <div className="px-2" key={ "month" + i }>
                  <Button
                    variant={ active === i ? "primary" : "info" }
                    className="monthly-btn mb-3"
                    onClick={ () => {
                      setPreferredMonth(i + 1);
                      setActive(i);
                    } }
                  >
                    { item }
                  </Button>
                </div>
              );
            }) }
          </div>
          <div className="col-sm-12">
            { isLoading && (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={ 100 }
                width={ 100 }
              />
            ) }
            <ShouldRender
              condition={ !isLoading && !show }
            >
              { data?.length === 0 && (
                <div className="text-center">
                  <h2>No Record Found</h2>
                </div>
              ) }
              <WrapperSwitcher
                condition={ data?.length < 5 }
                wrapper1={ (children)=><div className="row">{ children }</div> }
                wrapper2={ (children)=><Slider { ...settings }>{ children }</Slider> }
              >
                { data.map((item, i) => {
                  return (
                    <div 
                      className={ data?.length < 5?"col-sm-12 col-md-4 col-lg-3":"col" } 
                      key={ item._id + i }
                    >
                      <Card
                        data={ item }
                        refetch={ refetch }
                      />
                    </div>
                  );
                }) }
              </WrapperSwitcher>
            </ShouldRender>
            <ShouldRender condition={ !isLoading && show }>
              { data[0]?.data?.length === 0 && (
                <div className="text-center">
                  <h2>No Record Found</h2>
                </div>
              ) }
              <div className="row">
                { data[0]?.data?.map((item, i) => {
                  return (
                    <div
                      className="col-sm-12 col-md-4 col-lg-3"
                      key={ item._id + i }
                    >
                      <Card
                        data={ item }
                        refetch={ refetch }
                      />
                    </div>
                  );
                }) }
                <Col sm={ 12 }>
                  { " " }
                  <Pagination
                    list={ data[0]?.paginationData }
                    prev={ setPage }
                    next={ setPage }
                  />
                </Col>
              </div>
            </ShouldRender>
          </div>
        </div>
        { !show && (
          <Button
            variant="dark"
            className="recommended-btn mt-5"
            onClick={ () => {
              history.push(routes.SHARED.PAGES().VIDEOS.MONTHS);
            } }
          >
            View All{ " " }
          </Button>
        ) }
      </div>
    </div>
  );
}

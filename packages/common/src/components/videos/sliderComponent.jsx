import { Card } from "common/src/components/shared/card";
import video_icon from "common/src/images/videos_blue.svg";
import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";

export function SliderComponent({
  data,
  title,
  buttonName,
  refetch,
  link
}) {
  const history = useHistory();
  if (data) {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: data && data.length > 4 ? 4 : data.length,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: data && data.length > 4 ? 4 : data.length,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: data && data.length > 3 ? 3 : data.length,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: data && data.length > 2 ? 2 : data.length,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: data && data.length > 1 ? 1 : data.length,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div>
        <div className="card custom-card px-4 py-4 mt-4">
          <h4 className="dash-card-heading mb-4 d-flex 12">
            <img className="pr-2" src={ video_icon } alt="" />
            { title }
          </h4>
          <div>
            { data?.length > 4 ? (
              <Slider { ...settings }>
                { data.map((item) => {
                  return (
                    <div className="col" key={ item._id }>
                      <Card
                        data={ item }
                        refetch={ refetch }
                      />
                    </div>
                  );
                }) }
              </Slider>
            ) : data?.length < 5 ? (
              <div className={ "row" }>
                { " " }
                { data?.map((item) => {
                  return (
                    <div className="col-sm-12 col-md-3" key={ item._id }>
                      <Card
                        data={ item }
                        refetch={ refetch }
                      />
                    </div>
                  );
                }) }
              </div>
            ) : (
              <h3>No { title } Found</h3>
            ) }
          </div>
          { data?.length > 0 && link && (
            <Button
              variant="dark"
              className="recommended-btn mt-5"
              onClick={ () => {
                history.push(link);
              } }
            >
              { /* View News and Featured */ }
              { buttonName }
            </Button>
          ) }
        </div>
      </div>
    );
  }
  return null;
}

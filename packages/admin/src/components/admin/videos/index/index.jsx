import Container from "common/src/components/shared/container";
import React from "react";
import VideoSearchForm from "./VideoSearchForm";
import VideosTable from "./videosTable";

const VideosIndex = ({
  title,
  description,
  category,
  categories,
  subCategories,
  handleChanges,
  handleSubmit,
  deleteVideo,
  videos
}) =>
  <Container>
    <VideoSearchForm
      { ...{
        title,
        description,
        category,
        categories,
        subCategories,
        handleChanges,
        handleSubmit
      } }
    />
    <Container>
      <VideosTable
        { ...{
          videos,
          deleteVideo
        } }
      />
    </Container>
  </Container>;

export default VideosIndex;

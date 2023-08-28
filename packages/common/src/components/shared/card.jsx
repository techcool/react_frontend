import { durationTime } from "common/src/components/helpers/utils";
import Dialog from "common/src/components/shared/dialog";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
import heart from "common/src/images/heart.svg";
import heartRed from "common/src/images/heart_red.svg";
import video_white from "common/src/images/video_white.svg";
import { fetchCount } from "common/src/old-api/reportsAction";
import { fetchMyAccountDetails, setRedux } from "common/src/old-api/usersActions";
import { createFavorite, deleteFavorite } from "common/src/old-api/videosActions";
import {
  createVideoNotes
} from "common/src/old-api/videosActions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import VideoStatsCard from "./videoStatsCard";

export function Card({
  data,
  refetch,
  from,
  handleEvents,
  isStats
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { role } = useSelector(state => state.user);
  const { favorites: Favour } = useSelector((state) => state.user);
  const [isFavorite, setFavorite] = useState(false);
  const [dialog, setDialog] = useState(false);
  React.useEffect(() => {
    if (Array.isArray(Favour)) {
      let tempFavorite = Favour.includes(data._id);
      setFavorite(tempFavorite);
    }
  }, [Favour]);

  const handleCreate = async (id) => {
    let val = await createFavorite({ video_id: id });
    if (val) {
      refetchFavorites();
    }
  };
  const refetchFavorites = async () => {
    if (role === "student") {
      const res = await fetchMyAccountDetails({});
      if (res) {
        try {
          refetch(accessToken, role);
        } catch (e) {
        }
        dispatch(setRedux({ favorites: res.favouriteVideos }));
      }
    } else {
      const res = await fetchCount({});
      if (res) {
        try {
          refetch(accessToken, role);
        } catch (e) {
        }

        dispatch(
          setRedux({ favorites: res.favouriteVideos.map((item) => item._id) })
        );
      }
    }
  };
  const handleDelete = async (id) => {
    let val = await deleteFavorite({ video_id: id });
    if (val) {
      refetchFavorites();
    }
  };
  if (!data) return <div className="vid-card"></div>;

  if (isStats) {
    return (
      <VideoStatsCard
        data={ data }
        handleDelete={ handleDelete }
        durationTime={ durationTime }
        handleCreate={ handleCreate }
        isFavorite={ isFavorite }
      />
    );
  }
  return (
    <div className="vid-card" >
      <div className="card-img">
        <img
          src={ data.thumbnail }
          alt={ data.title }
          onClick={ () => {
            from !== "videos" && from
              ? handleEvents && handleEvents.handleStep(data)
              : setDialog(true);
          } }
        />
        <span className="heart-span">
          <img
            src={ isFavorite ? heartRed : heart }
            alt=""
            style={ { cursor: "pointer" } }
            onClick={ () => {
              if (isFavorite)
                handleDelete(data._id);
              else
                handleCreate(data._id);
            } }
          />
        </span>

        { data.isNewVideo && (
          <span className="badge new-release">New Release</span>
        ) }
        <span className="vid-time">
          <img src={ video_white } className="pr-2" alt="" />{ " " }
          { durationTime(parseInt(data.duration)) }
        </span>
      </div>
      <div
        className="vid-footer"
        onClick={ () => {
          from !== "videos" && from && !isStats
            ? handleEvents && handleEvents.handleStep(data)
            : history.push(`/${role}/videos/${data._id}/practice`);
        } }
      >
        <span className="vid-badge">{ data.category }</span>
        <h3>{ data.title }</h3>
        <h6>
          { Array.isArray(data.level)
            ? data.level.map((item) => `${item}${" "}`)
            : data.level }
        </h6>
        <p className="vid-footer-desc">{ data.description }</p>
      </div>
      <Dialog
        show={ dialog }
        handleClose={ () => setDialog(false) }
        title={ data.title }
        size={ "lg" }
      >
        <VideoScreenWithButtons
          { ...{
            url: data.url,
            grammar: data.grammar,
            vocabulary: data.vocabulary,
            notes: data.notes,
            captionUrl: data.captionUrl,
            language: data.language,
            video_id: data._id,
            level: data.level,
            title: data.title,
            description: data.description,
            category: data.category
          } }
          saveNotes={ async ({ notes }) => {

            await createVideoNotes({
              video_id: data._id,
              notes
            });

          } }
          links={ [
            {
              title:
                from !== "videos" && from && !isStats
                  ? "Postwork"
                  : "Postwork",
              href: `/${role}/videos/${data._id}/practice`
            }
          ] }
          close={ true }
          handleCloseD={ () => {
            setDialog(false);
            // from !== "videos" &&
            //   from &&
            //   !isStats &&
            //   handleEvents &&
            //   handleEvents.handleStep(data);
          } }
          hideNotes={ true }
          assignButton={ role == "teacher" ? true : false }
          status={ from !== "videos" && from && !isStats }
          handleEvents={ handleEvents }
        />
      </Dialog>
    </div>
  );
}

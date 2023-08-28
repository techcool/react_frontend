import { Monthly } from "common/src/components/videos/monthly";
import React from "react";
import { useSelector } from "react-redux";
export default function MonthByMonth() {
  const {  favorites } = useSelector((state) => state.user);
  return (
    <div>
      <Monthly { ...{ favorites } } show={ true } />
    </div>
  );
}

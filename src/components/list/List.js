import React, { useRef, useState } from "react";
import "./List.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "../listitem/ListItem";

const List = ({ data }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const listRef = useRef();
  const handleClick = (dir) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (dir === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (dir === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{data.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {data.content.map((item, index) => (
            <ListItem key={index} index={index} movieId={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;

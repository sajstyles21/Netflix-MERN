import React, { useState, useCallback, useEffect } from "react";
import "./Featured.scss";
import { PlayArrow, InfoOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { lists } from "../../redux/slices/listsSlice";

const Featured = ({ type }) => {
  const [genre, setGenre] = useState("");
  const dispatch = useDispatch();

  const init = useCallback(() => {
    dispatch(lists({ type, genre }));
  }, [dispatch, type, genre]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src="https://wallpaperaccess.com/full/3640117.jpg" alt="random" />
      <div className="info">
        <img
          src="https://occ-0-2590-2186.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABWb8PzD83K9acBIHmjGrL8EiSuDQ158jAuJK3Sommbu4Ovl-QrdfLDeICSV7ztb3T1jqDNNtjU76IrYyRntfJi27g0MZ-JXYGWtvi-Zq9CIc79ncJkI6JRT1olkXSMg7n_dVUJO7YwLj8dPOYX2kCOHYw_oAaGz5D16dic07U2IMVjlI5ZBTDQ.png?r=fe4"
          alt="random"
        />
        <span className="desc">
          They've weathered good times and bad. But for four tight-knit teens, a
          hunt for millions in lost gold means rough seas ahead. Watch trailers
          & learn more.
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

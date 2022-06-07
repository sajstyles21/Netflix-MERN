import React, { useEffect, useState } from "react";
import "./ListItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const Listitem = ({ index, movieId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getMovie = async () => {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        const aToken = user?.accessToken;
        const res = await userRequest.get(`api/movies/find/${movieId}`, {
          headers: {
            token: "Bearer " + aToken,
          },
        });
        setMovie(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    <Link to="/watch" state={{ trailer: movie.trailer }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoading === false ? (
          <>
            <img src={movie.img} alt="" />
            {isHovered && (
              <div className="hoverDiv">
                <video src={movie.trailer} autoPlay loop></video>
                <div className="itemInfo">
                  <div className="icons">
                    <PlayArrow className="icon" />
                    <Add className="icon" />
                    <ThumbUpAltOutlined className="icon" />
                    <ThumbDownOutlined className="icon" />
                  </div>
                  <div className="itemInfoTop">
                    <span>
                      {movie?.duration ? movie?.duration : `1 hour 14 minutes`}
                    </span>
                    <span className="limit">+{movie.limit}</span>
                    <span>{movie.year}</span>
                  </div>
                  <div className="desc">{movie.desc}</div>
                  <div className="genre">{movie.genre}</div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "35px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </Link>
  );
};

export default Listitem;

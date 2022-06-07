import React, { useCallback, useEffect } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { lists } from "../../redux/slices/listsSlice";

const Home = ({ type }) => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.lists?.lists);

  const init = useCallback(() => {
    dispatch(lists({ type, genre: "" }))
      .then((res) => {
        /*if (res.error) {
          if (res.payload.err.response.status === 403) {
            dispatch(logout({}));
          }
        }*/
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, type]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {data.map((item) => (
        <List key={item._id} data={item} />
      ))}
    </div>
  );
};

export default Home;

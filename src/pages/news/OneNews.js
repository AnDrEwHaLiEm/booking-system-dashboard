// import avatar from "../../assets/avatar.jpg";
// import imageCover from "../../assets/news.jpg";
import { useParams } from "react-router-dom";
import NewsArticle from "../../components/articles/NewsArticle";
import { useState, useEffect } from "react";
import { authorizedAPIs } from "../../API/axiosSetup";
import { showAlert } from "../../Redux/actions/viewAlert";
import { useDispatch } from "react-redux";

export default function OneNews() {
  const [oneNews, setOneNews] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    authorizedAPIs
      .get(`/news/showOne/${id}`)
      .then((res) => {
        console.log({res});
        setOneNews(res.data.selectedNews);
        //console.log(res.data.selectedNews);
      })
      .catch((err) => {
        console.log("r");
        console.log(err.message);
      });
  }, [id]);

  const handleDelete = async () => {
    
    await authorizedAPIs
      .delete(`/news/delete/${[id]}`)
      .then((res) => {
        setOneNews(null);
        dispatch(showAlert("deleted successfully ", "success"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return oneNews? (
 
      <NewsArticle {...oneNews} handleDelete={handleDelete} />
   
  ):
  <>Loading...</>
  ;
  

}

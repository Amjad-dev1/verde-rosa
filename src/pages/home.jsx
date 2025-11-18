import "../styles/home.css";
import VideoBackground from "../components/videobackground.jsx";
import back5 from "../assets/back5.mp4";

export default function Home(){
    return(
<>
      <VideoBackground src={back5} />
              <div className="panels">
                <div className="outer outline">
                </div>
              </div>
              <div className="panels">
                
              </div>
        </>
    );
};
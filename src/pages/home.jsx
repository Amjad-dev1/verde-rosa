import "../styles/home.css";
import VideoBackground from "../components/videobackground.jsx";
import back from "../assets/back.mp4";
import Footer from "../components/Footer.jsx";
import Vase3D from "../components/vase3d.jsx";
import FeaturedBouquets from "../components/featuredbouquet.jsx";
import ServiceFeatures from "../components/servicefeatures.jsx";
import Subscription from "../components/subscription.jsx";
export default function Home() {
  return (
    <>
    <VideoBackground src={back} />
    
    <div className="panels">
        <div className="fontface">
          <span>PETAL ARTISTRY<Vase3D /></span>
          <div class="blurred-circle"></div>
        </div>
        <div className="fadein"></div>
        <a href="#featured" className="cta glass">Discover Featured</a>
        <div className="line one"></div>
        <div className="line two"></div>
      </div>
      <div className="panels" id="featured">
        <FeaturedBouquets />
      </div>
      <div className="panelstwo">
        <ServiceFeatures/>
      </div>
      <div className="panels">
        <Subscription/>
      </div>
      <Footer/>
    </>
  );
}

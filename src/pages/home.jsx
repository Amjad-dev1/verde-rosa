import "../styles/home.css";
import VideoBackground from "../components/videobackground.jsx";
import back from "../assets/back.mp4";
import Footer from "../components/Footer.jsx";
import Vase3D from "../components/vase3d.jsx";
import FeaturedBouquets from "../components/featuredbouquet.jsx";
import BabiesNewborn from "../components/BabiesNewborn.jsx";
import Plants from "../components/Plants.jsx";
import Roses from "../components/Roses.jsx";
import ServiceFeatures from "../components/servicefeatures.jsx";
import Subscription from "../components/subscription.jsx";
export default function Home() {
  return (
    <>
    <VideoBackground src={back} />

    <div className="panels">
        <div className="fontface">
          <span>PETAL ARTISTRY<Vase3D /></span>
          <div className="blurred-circle"></div>
        </div>
        <div className="fadein"></div>
        <div className="line one"></div>
        <div className="line two"></div>
        <a href="#featured" className="cta glass">Discover Featured</a>
      </div>
      
      <div className="panels" id="featured">
        <FeaturedBouquets />
      </div>
      <div className="panels">
        <BabiesNewborn />
      </div>
      <div className="panels">
        <Plants />
      </div>
      <div className="panels">
        <Roses />
      </div>
      <div className="panels legacy-section12">
        <div className="legacy-content12">
          <div className="left12">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_9" data-name="Layer 2" viewBox="0 0 412.8 412.8"><defs/><g id="Layer_1-2" data-name="Layer 1"><path d="M343 137c-75 0-137-62-137-137 0 75-61 137-136 137 75 0 136 61 136 136 0-75 62-136 137-136M0 206c0 114 92 207 206 207 0-114-92-207-206-207M413 206c-114 0-207 93-207 207 114 0 207-93 207-207" className="cls-"/></g></svg>
            <span>Verde Rosa</span>
          </div>
          <div className="right12">
            <h2>Verde Rosa: The Legacy</h2>
            <p>For over 20 years, Verde Rosa has been a family-run flower shop rooted in the heart of Beirut, bringing beauty and creativity to clients across Lebanon. Guided by a passion for artistic floral design and a commitment to sustainability, we craft arrangements that blend elegance with environmental care. <br/>Our legacy is one of dedication, creativity, and connection, continuing to flourish while celebrating the art of flowers and the joy they bring to every occasion.</p>
          </div>
        </div>
      </div>
      <div class="ticker">
        <div class="ticker__move">
            <span>Shop now — New arrivals — Discounts —</span>
            <span>Shop now — New arrivals — Discounts —</span>
            <span>Shop now — New arrivals — Discounts —</span>
            <span>Shop now — New arrivals — Discounts —</span>
        </div>
      </div>

      <div className="panelstwo">
        <ServiceFeatures/>
      </div>
      <div className="panels location12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d585.4348655448987!2d35.48578425650759!3d33.896871927471345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f16d629ad80b1%3A0x383cce9944645ba5!2sRas%20Beirut%20Evangelical%20Baptist%20Church!5e0!3m2!1sen!2slb!4v1764797174819!5m2!1sen!2slb"
          width="500"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="words"><span>Find</span><span>Us</span></div>
      </div>
      <div className="panels">
        <Subscription/>
      </div>
      <Footer/>
    </>
  );
}

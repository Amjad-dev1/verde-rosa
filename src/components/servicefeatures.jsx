import "../styles/ServiceFeatures.css";
import expertimg from "../assets/SVG/expert.svg";
import representimg from "../assets/SVG/represent.svg";
import deliveryimg from "../assets/SVG/delivery.svg";
import chatimg from "../assets/SVG/chat.svg";


export default function ServiceFeatures() {
  const items = [
    {
      title: "Professional Service",
      subtitle: "Business in domain since 2005",
      icon: expertimg
    },
    {
      title: "Luxurious presentation",
      subtitle: "of Flowers, Plants & More",
      icon:  representimg
    },
    {
      title: "Delivery Across Lebanon",
      subtitle: "Express Delivery Available*",
      icon: deliveryimg
    },
    {
      title: "Live Chat",
      subtitle: "Get in touch with our Team",
      icon: chatimg
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        {items.map((item, i) => (
          <div className="service-item" key={i}>
            <img src={item.icon} alt={item.title} className="service-icon" />
            <h3 className="service-title">{item.title}</h3>
            <p className="service-subtitle">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

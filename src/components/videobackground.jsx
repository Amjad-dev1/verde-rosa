export default function VideoBackground({ src }) {
  return (
    <div className="video-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

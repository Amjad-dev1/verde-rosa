export default function Filters() {
  return (
    <svg style={{ display: "none" }}>
      <filter
        id="glass-morphism"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.01"
          numOctaves="1"
          seed="5"
          result="turbulence"
        />
        <feGaussianBlur in="turbulence" stdDeviation="0" result="softMap" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="fadedEdges"
          scale="150"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

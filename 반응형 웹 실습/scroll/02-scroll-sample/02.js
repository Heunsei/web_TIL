import "./scroll-timeline.js";

const gallery = document.querySelector(".gallery");
const galleryTimeline = document.querySelector(".gallery-timeline");

// 움직일 갤러리가 animate 호출
gallery.animate(
  [
    { transform: "translateX(0)" },
    { transform: "translateX(calc(-100% + 100vw))" },
  ],
  {
    fill: "both",
    timeline: new ScrollTimeline({
      scrollOffsets: [
        { target: galleryTimeline, edge: "start", threshold: 1 },
        { target: galleryTimeline, edge: "end", threshold: 1 },
      ],
    }),
  }
);

import "./scroll-timeline";

const airplane = document.querySelector(".airplane");
const airplaneScrollTimeLine = document.querySelector(
  ".airplane-scroll-timeline"
);

airplane.animate([{ offsetDistance: "100%" }, { offsetDistance: "0%" }], {
  fill: "both",
  timeline: new ScrollTimeLine({
    scrollOffsets: [
      { target: airplaneScrollTimeLine, edge: "start", threshold: 1 },
      { target: airplaneScrollTimeLine, edge: "end", threshold: 1 },
    ],
  }),
});

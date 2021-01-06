const svg = d3.select("svg");
svg.attr("width", window.innerWidth);
svg.attr("height", window.innerHeight);

const g = svg.append("g");
g.attr(
  "transform",
  `translate(${window.innerWidth / 2}, ${window.innerHeight / 2})`
);

const circle = g.append("circle");
circle.attr("r", 200).attr("fill", "#f1c40f").attr("stroke", "black");

const eyeSpacing = 70;
const eyeYOffset = -70;
const eyeRadius = 25;
const eyebrowWidth = 50;
const eyebrowHeight = 20;
const eyebrowYOffset = -70;

const eyesG = g.append("g");
eyesG.attr("transform", `translate(0, ${eyeYOffset})`);

const leftEye = eyesG.append("circle");
leftEye.attr("r", eyeRadius).attr("cx", -eyeSpacing);

const rightEye = eyesG.append("circle");
rightEye.attr("r", eyeRadius).attr("cx", eyeSpacing);

const eyebrowsG = eyesG.append("g");
eyebrowsG
  .attr("transform", `translate(0, ${eyebrowYOffset})`)
  .transition()
  .duration(2000)
  .attr("transform", `translate(0, ${eyebrowYOffset - 30})`)
  .transition()
  .duration(2000)
  .attr("transform", `translate(0, ${eyebrowYOffset})`);

const leftEyebrow = eyebrowsG.append("rect");
leftEyebrow
  .attr("x", -eyeSpacing - 30)
  .attr("width", eyebrowWidth)
  .attr("height", eyebrowHeight);

const rightEyebrow = eyebrowsG.append("rect");
rightEyebrow
  .attr("x", eyeSpacing - 30)
  .attr("width", eyebrowWidth)
  .attr("height", eyebrowHeight);

const mouth = g.append("path");
mouth.attr(
  "d",
  d3.arc()({
    innerRadius: 130,
    outerRadius: 150,
    startAngle: Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
  })
);

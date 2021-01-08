const svg = d3.select("svg");

svg.attr("width", innerWidth);
svg.attr("height", innerHeight);

const width = parseInt(svg.attr("width"));
const height = parseInt(svg.attr("height"));

const csvFile = d3.csv("auto-mpg.csv");

// d.mpg = parseInt(d.mpg);
// d.cylinders = parseInt(d.cylinders);
// d.displacement = parseInt(d.displacement);
// d.horsepower = parseInt(d.horsepower);
// d.weight = parseInt(d.weight);
// d.acceleration = parseInt(d.acceleration);
// d.year = parseInt(d.year);

const render = (data) => {
  // x 변수 및 x축 이름 설정
  const xValue = (d) => d.acceleration;
  const xAxisLabel = "Acceleration";

  // y 변수 및 y축 이름 설정
  const yValue = (d) => d.weight;
  const yAxisLabel = "Weight";

  const circleRadius = 6;
  const margin = {
    left: 160,
    right: 60,
    top: 100,
    bottom: 150,
  };
  // 그래프의 width, height
  const graphWidth = width - margin.right - margin.left;
  const graphHeight = height - margin.top - margin.bottom;

  // x축 길이를 그래프에 표시하기 위해서 변환
  const xScale = d3.scaleLinear();
  xScale.domain(d3.extent(data, xValue)).range([0, graphWidth]).nice();
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.format(".3s"))
    .tickSize(-graphHeight)
    .tickPadding(20);

  // y축 길이를 그래프에 표시하기 위해서 변환
  const yScale = d3.scaleLinear();
  yScale.domain(d3.extent(data, yValue)).range([0, graphHeight]).nice();
  const yAxis = d3.axisLeft(yScale).tickSize(-graphWidth);

  const g = svg.append("g");
  g.attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g").call(yAxis).selectAll(".domain").remove();

  const xAxisG = g.append("g");
  xAxisG
    .call(xAxis)
    .attr("transform", `translate(0, ${graphHeight})`)
    .selectAll(".domain")
    .remove();

  xAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("fill", "black")
    .attr("y", 100)
    .attr("x", graphWidth / 2)
    .text(xAxisLabel);

  const yAxisG = g.append("g");
  yAxisG.call(yAxis).selectAll(".domain").remove();
  yAxisG
    .append("text")
    .attr("class", "axis-label")
    .attr("fill", "black")
    .attr("y", -100)
    .attr("x", -graphHeight / 2)
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", "middle")
    .text(yAxisLabel);

  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", circleRadius);

  g.append("text")
    .attr("class", "title")
    .attr("y", -45)
    .text(`Cars: ${xAxisLabel} vs ${yAxisLabel}`);
};

csvFile.then((data) => {
  data.forEach((d) => {
    d.mpg = parseInt(d.mpg);
    d.cylinders = parseInt(d.cylinders);
    d.displacement = parseInt(d.displacement);
    d.horsepower = parseInt(d.horsepower);
    d.weight = parseInt(d.weight);
    d.acceleration = parseFloat(d.acceleration);
    d.year = parseInt(d.year);
  });
  render(data);
});

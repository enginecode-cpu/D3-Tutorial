const svg = d3.select("svg");

svg.attr("width", innerWidth);
svg.attr("height", innerHeight);

const width = parseInt(svg.attr("width"));
const height = parseInt(svg.attr("height"));

const csvFile = d3.csv("../temperature-in-san-francisco.csv");

const render = (data) => {
  // x 변수 및 x축 이름 설정
  const xValue = (d) => d.timestamp;
  const xAxisLabel = "Time";

  // y 변수 및 y축 이름 설정
  const yValue = (d) => d.temperature;
  const yAxisLabel = "Temperature";

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
  const xScale = d3.scaleTime();
  xScale.domain(d3.extent(data, xValue)).range([0, graphWidth]);

  const xAxis = d3
    .axisBottom(xScale)
    .ticks(10)
    .tickSize(-graphHeight)
    .tickPadding(20);

  // y축 길이를 그래프에 표시하기 위해서 변환
  const yScale = d3.scaleLinear();
  yScale.domain(d3.extent(data, yValue)).range([graphHeight, 0]).nice();

  const yAxis = d3.axisLeft(yScale).tickSize(-graphWidth);

  const g = svg.append("g");
  g.attr("transform", `translate(${margin.left}, ${margin.top})`);

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

  const areaGenerator = d3
    .area((d) => xScale(xValue(d)))
    .y0(graphHeight)
    .y1((d) => yScale(yValue(d)))
    .curve(d3.curveBasis);

  g.append("path").attr("class", "line-path").attr("d", areaGenerator(data));

  g.append("text")
    .attr("class", "title")
    .attr("y", -45)
    .text(`A week in Sans Francisco`);
};

csvFile.then((data) => {
  data.forEach((d) => {
    d.temperature = parseFloat(d.temperature);
    d.timestamp = new Date(d.timestamp);
  });
  render(data);
});

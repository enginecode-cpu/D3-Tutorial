const svg = d3.select("svg");

svg.attr("width", innerWidth);
svg.attr("height", innerHeight);

const width = parseInt(svg.attr("width"));
const height = parseInt(svg.attr("height"));

const csvFile = d3.csv("data.csv");

const render = (data) => {
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const margin = {
    left: 160,
    right: 60,
    top: 100,
    bottom: 100,
  };
  const graphWidth = width - margin.right - margin.left;
  const graphHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear();
  xScale
    .domain([0, d3.max(data, (d) => d.population)])
    .range([0, graphWidth])
    .nice();
  const xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.format(".3s"))
    .tickSize(-graphHeight);

  const yScale = d3.scalePoint();
  yScale.domain(data.map(yValue)).range([0, graphHeight]).padding(0.7);
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
    .attr("y", 70)
    .attr("x", graphWidth / 2)
    .text("Population");

  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", 10);

  g.append("text")
    .attr("class", "title")
    .attr("y", -45)
    .text("Top 10 Most Populous Countries");
};

csvFile.then((data) => {
  data.forEach((d) => {
    d.population = parseInt(d.population);
  });
  render(data);
});

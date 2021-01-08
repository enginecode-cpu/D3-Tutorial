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
    top: 20,
    bottom: 40,
  };
  const graphWidth = width - margin.right - margin.left;
  const graphHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear();
  xScale.domain([0, d3.max(data, (d) => d.population)]).range([0, graphWidth]);
  const xAxis = d3.axisBottom(xScale);

  const yScale = d3.scaleBand();
  yScale.domain(data.map(yValue)).range([0, graphHeight]).padding(0.1);
  const yAxis = d3.axisLeft(yScale);

  const g = svg.append("g");
  g.attr("transform", `translate(${margin.left}, ${margin.top})`);

  g.append("g").call(yAxis);
  g.append("g").call(xAxis).attr("transform", `translate(0, ${graphHeight})`);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(yValue(d)))
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", yScale.bandwidth());
};

csvFile.then((data) => {
  data.forEach((d) => {
    d.population = parseInt(d.population);
  });
  render(data);
});

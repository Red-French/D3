var models = [
  {
    "coName":"ABC Co",
    "totalBooks":19,
    "totalPolicies":83
  },
  {
    "coName":"DEF Co",
    "totalBooks":67,
    "totalPolicies":93
  },
  {
    "coName":"XYZ Co",
    "totalBooks":10,
    "totalPolicies":56
  },
];

var container = d3.select('#viz'),
      width = 520,
      height = 220,
      margin = {top: 30, right: 20, bottom: 30, left: 50},
      barPadding = .2,
      axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

var svg = container
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);

var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
var xScale1 = d3.scaleBand()
var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

xScale0.domain(models.map(d => d.coName))
xScale1.domain(['totalBooks', 'totalPolicies']).range([0, xScale0.bandwidth()])
yScale.domain([0, d3.max(models, d => d.totalBooks > d.totalPolicies ? d.totalBooks : d.totalPolicies)])

var coName = svg.selectAll(".coName")
  .data(models)
  .enter().append("g")
  .attr("class", "coName")
  .attr("transform", d => `translate(${xScale0(d.coName)},0)`);

/* Add totalBooks bars */
coName.selectAll(".bar.totalBooks")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar totalBooks")
.style("fill","blue")
  .attr("x", d => xScale1('totalBooks'))
  .attr("y", d => yScale(d.totalBooks))
  .attr("width", xScale1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.totalBooks)
  });
  
/* Add totalPolicies bars */
coName.selectAll(".bar.totalPolicies")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar totalPolicies")
.style("fill","red")
  .attr("x", d => xScale1('totalPolicies'))
  .attr("y", d => yScale(d.totalPolicies))
  .attr("width", xScale1.bandwidth())
  .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.totalPolicies)
  });

  // X Axis
svg.append("g")
.attr("class", "x axis")
.attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
.call(xAxis);
// Y Axis
svg.append("g")
.attr("class", "y axis")
.call(yAxis);

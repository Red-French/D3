var width = 420,
    barHeight = 20;

// x-axis
var x = d3.scale.linear()
    .range([0, width]);  // set chart to be horizontal; range method receives 'd.unitsSold' as 'width' param
                         // first number is x-axis starting position of each bar

var chart = d3.select(".chart")
    .attr("width", width);


d3.tsv("data.tsv", type, function(error, data) {
  x.domain([0, d3.max(data, function(d) { return d.unitsSold; })]);

  chart.attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) {return x(d.unitsSold); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d.unitsSold) - 3; }) // text position offset by 3 pixels from end of bar
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.unitsSold; });
});

function type(d) {
  d.unitsSold = +d.unitsSold; // coerce to number (By default, all columns in TSV and CSV files are strings)
  return d;
}

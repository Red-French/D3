// d3 methods take primitve values OR callbacks
d3.select("#page-title")
  .style("color", "blue");  // taking a primitive

d3.selectAll("li")
    .style("background-color", function(_, index) {  // taking a callback
        return index %2 === 0 ? "lightgrey" : "white";
});

// chain methods to add style to multiple D3 selections in sequence
d3.select(".outer")
    .style("color", "purple")
  .select("div")  // inner div (nested)
    .style("font-size", "30px")
    .style("background-color", "orange")
  .select("div")  // last div (deepest nested div)
    .style("background-color", "gray")
    .style("color", "black")
    .style("border", "8px solid blue");

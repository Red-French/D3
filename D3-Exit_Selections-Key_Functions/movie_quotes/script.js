const quotes = [
  {
    quote: "Say hello to my little friend!",
    movie: "Scarface",
    year: 1983,
    rating: "R"
  }, {
    quote: "I can see you right now in the kitchen, bending over a hot stove... but I can't see the stove.",
    movie: "Duck Soup",
    year: 1933,
    rating: "G"
  }, {
    quote: "God, how I hate the twentieth century.",
    movie: "Patton",
    year: 1970,
    rating: "PG"
  }, {
    quote: "A man's got to know his limitations",
    movie: "Magnum Force",
    year: 1973,
    rating: "R"
  },
  {
    quote: "Big mouth don't make a big man.",
    movie: "The Cowboys",
    year: 1972,
    rating: "PG"
  }, {
    quote: "Hey you bastards, I'm still here!",
    movie: "Papillon",
    year: 1973,
    rating: "PG"
  }
];

const ratingColors = {
  "G": "green",
  "PG": "yellow",
  "R": "pink"
};

d3.select("#quotes")
    .style("list-style", "none")
  .selectAll("li")  // since there are no li elements yet, this returns a selection with no nodes
  .data(quotes)  // returns slection with enter & exit properties; enter is an array of EnterNodes (placehoder nodes), each bound to the data
  .enter()  // creates a D3 selection with the EnterNodes
  .append("li")  // place each Enternode into the DOM as an li element
    .text((d) => {  // set the text of each li with a callback
      return '"' + d.quote + '" - ' + d.movie + ', ' + d.year
    })
    .style("padding", "10px")
    .style("font-size", "1.5rem")
    .style("color", (d) => {
      return d.movie === "The Cowboys"
        ? "blue"
        : "black"
      })
    .style("background-color", (d) => {
      return ratingColors[d.rating]})
    .style("border-radius", "8px");

// remove R-rated movies on button click
d3.select(".nonRBtn").on("click", () => {
  const nonRMovies = quotes.filter((movie) => {
    return movie.rating !== "R";
  });

  d3.selectAll("li")
    .data(nonRMovies, (d) => {
      return d.quote;  // using the quote as the key in the key function
    })
    .exit()
    .remove();

});

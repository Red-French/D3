let quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG-13"
  }, {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rating: "PG"
  }, {
    quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R"
  }, {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1996,
    rating: "R"
  }, {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }
];

const newQuotes = [
  {
    quote: "Houston, we have a problem.",
    movie: "Apollo 13",
    year: 1995,
    rating: "PG-13"
  }, {
    quote: "Gentlemen, you can't fight in here! This is the war room!",
    movie: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
    rating: "PG"
  }
];

const colors = {
  "G": "#3cff00",
  "PG": "#f9ff00",
  "PG-13": "#ff9000",
  "R": "#ff0000"
};


d3.select("#quotes")
    .style("list-style", "none")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
    .text(d => '"' + d.quote + '" - ' + d.movie + ' (' + d.year + ')')
    .style("margin", "20px")
    .style("padding", "20px")
    .style("font-size", d => d.quote.length < 25 ? "2em" : "1em")
    .style("background-color", d => colors[d.rating])
    .style("border-radius", "8px");


// click listener to add quotes
let add = d3.select("#add");
add.on("click", () => {
  quotes = quotes.concat((newQuotes));


// ~~~~~~~~~~~~~~~ GENERAL UPDATE PATTERN ~~~~~~~~~~~~~~~ //
  // 1. UPDATE SELECTION: Bind existing items to new data and store the 'update' selection
  const listItems =
    d3.select("#quotes")
      .selectAll("li")
      .data(quotes)

  // 2. ENTER SELECTION: Append new data and style them
    listItems
      .enter()
      .append("li")
      .text(d => '"' + d.quote + '" - ' + d.movie + ' (' + d.year + ')')
      .style("margin", "20px")
      .style("padding", "20px")
      .style("font-size", d => d.quote.length < 25 ? "2em" : "1em")
      .style("background-color", d => colors[d.rating])
      .style("border-radius", "8px")

    // 3. MERGE ENTER & UPDATE SELECTIONS AND ADD STYLE TO ALL ITEMS
      .merge(listItems)  // merge the 2 selections
        .style("color", "#7700CC");

  add.remove();  // prevent adding the quotes multiple times
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


// removes R rated movies quotes
const removeBtn = d3.select("#remove");
removeBtn.on('click', function() {
  const nonRQuotes = quotes.filter(function(movie) {
    return movie.rating !== 'R';
  });

  d3.selectAll("li")
    .data(nonRQuotes, function(d) {
      return d.quote;
    })
    .exit()
    .remove();

  removeBtn.remove();
});

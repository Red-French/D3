const color = ["red", "green", "blue", "orange", "black", "yellow", "pink"];
let previousInput = 0;
let inputLength;

// new text
d3.select("h1").on("click", () => {
    let temp = d3.select("p").text("New Text!");
});

// temp paragraph when entering note
d3.select(".addTextInput").on("keyup", () => {
  let inputText = d3.select(".addTextInput").property("value");
  if (previousInput === 0 && inputText.length === 1) {  // show temp paragraph on note entry
    d3.select("#notes")
      .append("p")
      .classed("tempNote", true)
      .text(inputText)
  } else if (inputText.length > 0) {  // enter text into temp paragraph
    d3.select(".tempNote")
      .text(inputText)
  } else {  // remove temp paragraph on backspace to no text remaining
    d3.select(".tempNote")
      .remove();
  }
  previousInput = inputText.length;
})

// clear list
d3.select(".clearListBtn").on("click", () => {
  d3.selectAll(".note").remove();
});

// surprise style (random style for each note)
d3.select(".surpriseBtn").on("click", () => {
  d3.selectAll(".note")
    .style("background-color", function() {
      let thisColor = Math.floor(Math.random() * (6 + 1));
      return color[thisColor];
    })
    .style("color", function() {
      let thisColor = Math.random() * 6;
      thisColor = Math.floor(thisColor);
      return color[thisColor];
    })
    .style("font-size", function() {
        return Math.random() * 40 + "px";
    })
});

// new note
d3.select("#new-note").on("submit", function() {
  console.log('click');
    d3.event.preventDefault();
    d3.select(".tempNote").remove();

    let userInput = d3.select("input").property("value");  // use as getter

    d3.select("#notes")  // add new note
      .append("p")
      .classed("note", true)
      .text(userInput);

    d3.select("input").property("value", "");  // use as setter
    previousInput = 0;  // reset so temp paragraph shows again on input entry
});

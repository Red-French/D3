document.addEventListener('DOMContentLoaded', () => {  // there is no D3 pattern to wait for the DOM content to load
  const wordCount = 10;
  let guessCount = 4;
  let password = '';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // let start = document.getElementById('start');
  // start.addEventListener('click', () => {
  //   toggleClasses(document.getElementById('start-screen'), 'hide', 'show');
  //   toggleClasses(document.getElementById('game-screen'), 'hide', 'show');
  //   startGame();
  // });

  // ~ D3 REFACTOR ~
  let start = d3.select('#start').on('click', () => {
    toggleClasses(d3.select('#start-screen'), 'hide', 'show');
    toggleClasses(d3.select('#game-screen'), 'hide', 'show');
    startGame();
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // function toggleClasses(element, ...classNames) {
  //   classNames.forEach(name => element.classList.toggle(name));
  // }

    // ~ D3 REFACTOR ~
  function toggleClasses(selection, ...classNames) {
    for (let i = 1; i < arguments.length; i++) {
      let classIsSet = selection.classed(arguments[i]);
      selection.classed(arguments[i], !classIsSet);
    }
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    // get random words and append them to the DOM
  function startGame() {
    // var wordList = document.getElementById("word-list");
    let wordList = d3.select("#word-list");  // ~ D3 REFACTOR ~~~~~~~~~~

    let randomWords = getRandomValues(words);
    randomWords.forEach(word => {
      let li = document.createElement("li");

      // li.innerText = word;
      // wordList.appendChild(li);
      li.innterText = word;  // ~ D3 REFACTOR ~~~~~~~~~~
      wordList.append("li")
        .text(word);

    });

    // set a secret password and the guess count display
    password = getRandomValues(randomWords, 1)[0];
    setGuessCount(guessCount);


    // add update listener for clicking on a word
    // wordList.addEventListener('click', updateGame);
    wordList.on('click', updateGame);  // ~ D3 REFACTOR ~~~~~~~~~~
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // does not involve DOM, so NO OPPORTUNITY for D3 here
  let getRandomValues = (array, numVals=wordCount) => shuffle(array).slice(0,numVals);
  function shuffle(array) {
    let arrayCopy = array.slice();
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
      // generate a random index between 0 and idx1 (inclusive)
      let idx2 = Math.floor(Math.random() * (idx1 + 1));

      // swap elements at idx1 and idx2
      [arrayCopy[idx1], arrayCopy[idx2]] = [arrayCopy[idx2], arrayCopy[idx1]];
    }
    return arrayCopy;
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // function setGuessCount(newCount) {
  //     guessCount = newCount;
  //     document.getElementById("guesses-remaining").innerText = "Guesses remaining: " + guessCount + ".";
  //   }

  // ~ D3 REFACTOR ~
  function setGuessCount(newCount) {
    guessCount = newCount;
    // document.getElementById("guesses-remaining").innerText = `Guesses remaining: ${guessCount}.`;
    d3.select("guesses-remaining")
      .text(`Guesses remaining: ${guessCount}.`);
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // function updateGame(e) {
  //   if (e.target.tagName === "LI" && !e.target.classList.contains("disabled")) {
  //     // grab guessed word, check it against password, update view
  //     let guess = e.target.innerText;
  //     let similarityScore = compareWords(guess, password);
  //     e.target.classList.add("disabled");
  //     e.target.innerText = `${e.target.innerText} --> Matching Letters: ${similarityScore}`;
  //     setGuessCount(guessCount - 1);
  //
  //     // check whether the game is over
  //     if (similarityScore === password.length) {
  //       toggleClasses(document.getElementById("winner"), 'hide', 'show');
  //       this.removeEventListener('click', updateGame);
  //     } else if (guessCount === 0) {
  //       toggleClasses(document.getElementById("loser"), 'hide', 'show');
  //       this.removeEventListener('click', updateGame);
  //     }
  //   }
  // }

  // ~ D3 REFACTOR ~
  function updateGame() {
    let tgt = d3.select(d3.event.target);
    if (tgt.node().tagName === "LI" && !tgt.classed("disabled")) {
      // grab guessed word, check it against password, update view
      let guess = tgt.text();

      let similarityScore = compareWords(guess, password);
      tgt.classed("disabled", true)
        .text(guess + `Matching Letters: ${similarityScore}`);
      setGuessCount(guessCount - 1);

      // check whether the game is over
      if (similarityScore === password.length) {
        toggleClasses(d3.select("#winner"), 'hide', 'show');
        d3.select(this).on('click', null);
      } else if (guessCount === 0) {
        toggleClasses(d3.select("#loser"), 'hide', 'show');
        d3.select(this).on('click', null);
      }
    }
  }
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  function compareWords(word1, word2) {
    if (word1.length !== word2.length) throw "Words must have the same length";
    let count = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] === word2[i]) count++;
    }
    return count;
  }


});

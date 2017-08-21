const express = require("express"); //only need these two on this page
const router  = express.Router();
const fs = require("fs");

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

  // console.log(numOfLetters);
 // When you render it's a mustache, WE RENDER VIEWS

let hiddenWord;
let remaining;
let newWord = [];
let guessArray = []; // to keep track of the guesses
// let game = {
//   word: hiddenWord,
//   guesses: guessArray,
//   left:8,
//   placeholder: createUnderScores(hiddenWord)
// };
// newWord.push(game);


// function createUnderScores (word){
//   let underscores = "";
//   for (var i = 0; i < word.length; i++) {
//     underscores = underscores + '_';
//   }
//   return underscores;
// }


router.get("/", function(req, res) {
  if (req.session.newWord) {
    res.render('start_game', {newWord: newWord});
  } else { // if there isnt a game session yet, then create one and render the page.
    // req.session.game = game;
    remaining = {remainingGuesses: 8}
    hiddenWord = words[Math.floor(Math.random() * words.length)]
    // console.log(hiddenWord);
    res.render('start_game', {newWord: newWord});

    for (var i = 0; i < hiddenWord.length; i++) {
      let singleLetter = { letter: hiddenWord[i],
        guessed: false,
        placeholder: "_"
      }
      newWord.push(singleLetter);
  }
  newWord.push(remaining);
  req.session.newWord = newWord;
  req.session.token = "sdte46tyhft6"
  console.log(newWord);
}
});

// let errors = req.getValidationResult();

router.post("/guess", function(req,res) {
  let guess = req.body.guess;
  index = newWord.findIndex(x => x.remainingGuesses);//got this on google, it gets the index of a word

  if (hiddenWord.includes(guess)) {
    newWord.forEach(function(single) {
      if (single.letter === req.body.guess) {
        single.guessed = true;
        res.render("start_game", {newWord: newWord});
      }
    })
  } else if (newWord[index].remainingGuesses === 1) { //when someone enters an incorrect guess, and the remaining guesses is one, we want to create an empty object!
    newWord[index].remainingGuesses = "";
    let clientGuess = {
      singleGuess: req.body.guess
    }
    newWord.push(clientGuess);
    res.redirect("/");

  } else if (!hiddenWord.includes(guess)) {
newWord[index].remainingGuesses = newWord[index].remainingGuesses - 1;
// can also write this as:
// newWord[index].remainingGuesses -= 1;
let clientGuess = {
  singleGuess: req.body.guess
}
newWord.push(clientGuess);


res.redirect("/"); ////you absolutely need res.redirect or a render on each GET,POST and/or if statements.
  };
  ////////////////////wrong letters:


});



////this is my reset buttom that is referenced in end_Game.mustache!
router.post("/reset", function(req, res){
  newWord = [];
  messages = [];
  req.session.destroy(function(err){
    console.log("Error: ", err);
  });
  res.redirect("/");
})




module.exports = router;

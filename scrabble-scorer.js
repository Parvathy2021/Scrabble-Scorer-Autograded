// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
 console.log(oldScrabbleScorer(initialPrompt()));

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");

   let word = input.question("Enter a word to score: ");
   return word;
};

let newPointStructure = transform(oldPointStructure);

console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure.a);
console.log("letter j: ", newPointStructure.j);
console.log("letter z: ", newPointStructure["z"]);

function simpleScorer(word){
   let simpleScorer = word.length;
   return simpleScorer;
}

const vowels =["A","E","I","O","U"];
function vowelBonusScorer(word){
   word = word.toUpperCase();
   
   let point =0;
   for(let i=0; i < word.length; i++){
      if(vowels.includes(word[i])){
         point += 3;
      }
       else{
            point +=1;
         
      };
   };
return point;
}
console.log(vowelBonusScorer(initialPrompt()));

function scrabbleScorer(word){
   word = word.toLowerCase();
   let score =0;
   for(let i=0; i <word.length; i++){
      score += newPointStructure[word[i]];
   }
   return score;
};

const scoringAlgorithms = [{
   name: "Simple Scorer",
   description: "each letter is worth 1 point",
   scoreFunction: simpleScorer,
},
{
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoreFunction: vowelBonusScorer,
},
{
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoreFunction: scrabbleScorer,
}];

function scorerPrompt(word) {
   
   let scorerPrompt = input.question(
      
   `Which scoring algorithm would you like to use?

   0 - Simple: Each letter is worth 1 point.
   1 - Vowel Bonus: Vowels are 3 points, constants are 1 point.
   2 - Scrabble: The traditional scoring algorithm.
   Enter 0, 1, or 2 : 
   `
   );

   word = word.toUpperCase();
   if(scorerPrompt ==='0'){
      console.log(`Algorithm name: ${scoringAlgorithms[0].name}\n Score the word ${word} : ${scoringAlgorithms[0].scoreFunction(word)}`);
   } else if(scorerPrompt === '1'){
      console.log(`Algorithm name: ${scoringAlgorithms[1].name}\n Score the word ${word} : ${scoringAlgorithms[1].scoreFunction(word)}`);
   }else if(scorerPrompt === '2'){
      console.log(`Algorithm name: ${scoringAlgorithms[2].name}\n Score the word ${word} : ${scoringAlgorithms[2].scoreFunction(word)}`);
   }else{
      console.log("Not a valid number, Try Again");
   }
   return scorerPrompt;
}

function transform(oldPointStructure) {
   // the oldPointStructure must iterate through each key and check if it contains the letter in the word

   let newPointStructure= {}; // here we're converting the old format to new where each alphabet is a key
   for(let points in oldPointStructure){
      let score = Number(points);
      for(let letter of oldPointStructure[points]){
         newPointStructure[letter.toLowerCase()] = score;

      }
   }
   return newPointStructure;
};


function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

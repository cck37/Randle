var categories = require("../data/data");

function getGuessResponse(guess) {
  // Get answer for today
  const currCategory = getCategory();
  const currDay = new Date().getDate();
  const currAnswerIndex = currDay % currCategory.items.length;
  const currAnswer = currCategory.items[currAnswerIndex];

  // Compare answer to guess
  const guessItem = currCategory.items.find((i) => i.name === guess);

  if (guessItem)
    return {
      name: guess,
      data: guessItem.attributes.map((guessAttributes) => ({
        name: guessAttributes.name,
        value: guessAttributes.value,
        isCorrect:
          guessAttributes.value ===
          currAnswer.attributes.find((g) => g.name === guessAttributes.name)
            .value, //FIX: Not great; nested loops
      })),
    };
  else {
    console.error(`Guess: ${guess} was not found in the current category`);
    return;
  }
}

function getCategory() {
  // Get category for today
  const currDay = new Date().getDate();
  const currCategoryIndex = currDay % categories.length;
  const currCategory = categories[currCategoryIndex];
  return currCategory;
}

module.exports = {
  getCategory: getCategory,
  getGuessResponse: getGuessResponse,
};

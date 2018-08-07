/* global document */
import _ from 'lodash';
import { getIdCocktail, getRandomCocktail } from './api';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  const allDrinksBlocks = document.createElement('div');
  allDrinksBlocks.setAttribute('class', 'all-drinks-block');
  root.appendChild(allDrinksBlocks);

  const titleIngredients = document.createElement('p');
  const titleText = document.createTextNode('Cocktails card ');
  titleIngredients.setAttribute('class', 'title-ingredients');
  titleIngredients.appendChild(titleText);
  allDrinksBlocks.appendChild(titleIngredients);

  const additionalInfo = document.createElement('div');
  additionalInfo.setAttribute('class', 'additional-info all-drinks-block__additional-info');
  root.appendChild(additionalInfo);

  _.times(8).forEach(async () => {
    const { body: { drinks } } = await getRandomCocktail();

    drinks.forEach(({ idDrink, strDrink, strDrinkThumb }) => {
      const drinkBlock = document.createElement('div');
      drinkBlock.setAttribute('class', 'drinks-block');

      const imageBlock = document.createElement('div');
      const drinksImages = document.createElement('img');
      imageBlock.setAttribute('class', 'image-block drinks-block__image-block');
      drinksImages.setAttribute('class', 'drink-image image-block__drink-image');
      drinksImages.setAttribute('src', strDrinkThumb);
      imageBlock.appendChild(drinksImages);

      const drinkInfo = document.createElement('div');
      drinkInfo.setAttribute('class', 'info-block drinks-block__info-block');

      const drinksNames = document.createElement('div');
      drinksNames.setAttribute('class', 'drinks-names info-block__drinks-names');
      const drinkText = document.createTextNode(strDrink);
      const drinkText2 = document.createTextNode(` (${idDrink})`);
      drinksNames.appendChild(drinkText);
      drinksNames.appendChild(drinkText2);

      const IdCocktail = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;

      function backInfo() {
        additionalInfo.style.display = 'none';
        allDrinksBlocks.style.display = 'block';
        additionalInfo.innerHTML = '';
      }
      function viewInfo() {
        _.times(1).forEach(async () => {
          const { body: { drinks } } = await getIdCocktail(IdCocktail);

          drinks.forEach(({
            strInstructions, strCategory,
            strAlcoholic, strGlass, ...ingredients
          }) => {
            additionalInfo.style.display = 'block';
            allDrinksBlocks.style.display = 'none';

            const leftBlock = document.createElement('div');
            leftBlock.setAttribute('class', 'left-block additional-info__left-block');

            const detailImageBlock = document.createElement('div');
            const detailImages = document.createElement('img');
            detailImageBlock.setAttribute('class', 'detail-image-block left-block__detail-image-block');
            detailImages.setAttribute('class', 'detail-drink-image detail-image-block__detail-drink-image');
            detailImages.setAttribute('src', strDrinkThumb);
            detailImageBlock.appendChild(detailImages);
            leftBlock.appendChild(detailImageBlock);
            additionalInfo.appendChild(leftBlock);

            const buttonBack = document.createElement('button');
            buttonBack.setAttribute('class', 'back-button left-block__back-button');
            buttonBack.appendChild(document.createTextNode('back'));
            buttonBack.addEventListener('click', backInfo);
            leftBlock.appendChild(buttonBack);

            const drinksTitle = document.createElement('div');
            drinksTitle.setAttribute('class', 'detail-drinks-names detail-image-block__drinks-names');
            const detailName = document.createTextNode(strDrink);
            drinksTitle.appendChild(detailName);
            detailImageBlock.appendChild(drinksTitle);

            const detailInfo = document.createElement('div');
            detailInfo.setAttribute('class', 'detail-info-block additional-info__detail-info-block');
            additionalInfo.appendChild(detailInfo);

            const ingredientsList = document.createElement('ul');
            ingredientsList.setAttribute('class', 'drink-ingredient list-block__drink-ingredient');
            const listBlock = document.createElement('div');
            listBlock.setAttribute('class', 'list-block detail-info-block__list-block');

            const textIngredients = document.createElement('p');
            const text1 = document.createTextNode('Ingredients: ');
            textIngredients.setAttribute('class', 'titles short-block__titles');
            textIngredients.appendChild(text1);

            const filteredArray = Object.keys(ingredients).filter(ingredienttsFilter => ingredienttsFilter.match(/^strIngredient\w*$/));
            filteredArray.forEach((keyIngredient) => {
              if (ingredients[keyIngredient]) {
                const li = document.createElement('li');
                li.setAttribute('class', 'list-ingredient drink-ingredient__list-ingredient');
                const listItem = document.createTextNode(ingredients[keyIngredient]);
                li.appendChild(listItem);
                ingredientsList.appendChild(li);
              }
            });

            detailInfo.appendChild(textIngredients);
            listBlock.appendChild(ingredientsList);
            detailInfo.appendChild(listBlock);

            const textInstruction = document.createElement('p');
            const text2 = document.createTextNode('Instruction: ');
            textInstruction.setAttribute('class', 'titles short-block__titles');
            textInstruction.appendChild(text2);

            const instructionBlock = document.createElement('div');
            const drinkInstruction = document.createTextNode(strInstructions);
            instructionBlock.setAttribute('class', 'detail-instruction-block detail-info-block__detail-instruction-block');
            instructionBlock.appendChild(textInstruction);
            instructionBlock.appendChild(drinkInstruction);
            detailInfo.appendChild(instructionBlock);

            const textCategory = document.createElement('p');
            const text3 = document.createTextNode('Category: ');
            textCategory.setAttribute('class', 'titles short-block__titles');
            textCategory.appendChild(text3);

            const categoryBlock = document.createElement('div');
            const drinkCategory = document.createTextNode(strCategory);
            categoryBlock.setAttribute('class', 'short-block detail-info-block__short-block');
            categoryBlock.appendChild(textCategory);
            categoryBlock.appendChild(drinkCategory);
            detailInfo.appendChild(categoryBlock);

            const textAlkoholic = document.createElement('p');
            const text4 = document.createTextNode('Alcohol: ');
            textAlkoholic.setAttribute('class', 'titles short-block__titles');
            textAlkoholic.appendChild(text4);

            const alcoholBlock = document.createElement('div');
            const drinkAlcoholic = document.createTextNode(strAlcoholic);
            alcoholBlock.setAttribute('class', 'short-block detail-info-block__short-block');
            alcoholBlock.appendChild(textAlkoholic);
            alcoholBlock.appendChild(drinkAlcoholic);
            detailInfo.appendChild(alcoholBlock);

            const textGlass = document.createElement('p');
            const text5 = document.createTextNode('Glass: ');
            textGlass.setAttribute('class', 'titles short-block__titles');
            textGlass.appendChild(text5);

            const glassBlock = document.createElement('div');
            const drinkGlass = document.createTextNode(strGlass);
            glassBlock.setAttribute('class', 'short-block detail-info-block__short-block');
            glassBlock.appendChild(textGlass);
            glassBlock.appendChild(drinkGlass);
            detailInfo.appendChild(glassBlock);
          });
        });
      }
      const buttonDrink = document.createElement('button');
      buttonDrink.setAttribute('class', 'more-button');
      buttonDrink.appendChild(document.createTextNode('more'));
      buttonDrink.addEventListener('click', viewInfo);

      allDrinksBlocks.appendChild(drinkBlock);
      drinkBlock.appendChild(imageBlock);
      drinkBlock.appendChild(drinkInfo);
      drinkInfo.appendChild(drinksNames);
      drinkInfo.appendChild(buttonDrink);
    });
  });
});

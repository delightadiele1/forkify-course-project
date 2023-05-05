import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    // Render loading spinner
    recipeView.renderSpinner();

    // Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // Update result view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    // Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();

    console.error(err);
  }
};

const showSearchRecipe = async function() {
  try {
    // get search query
    const query = searchView.getQuery();

    if (!query) return;

    resultsView.renderSpinner();
    // load search result
    await model.loadSearchRecipe(query);

    // render result

    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function(gotoPage) {
  // Render appropriate result
  resultsView.render(model.getSearchResultPage(gotoPage));
  // Render appropriate page buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function() {
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarkOnLoad = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // this would allow us to change the url without loading the page
    //1 state, 2 title, 3 url
    // close form window
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

// showSearchRecipe();
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarkOnLoad);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(showSearchRecipe);
  paginationView.addHandlerPages(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome! to git');
};
init();

// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

"use strict";
import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import view from "./view.js";

const controlStartup = function () {
  model.loadFromLocalStorage();
  controlLoadHomeScreen();
};

const controlLoadHomeScreen = function () {
  view.housekeeping();
  if (model.state.userMoviesList.length === 0)
    view.renderEmptyUserListMessage();
  if (model.state.userMoviesList.length > 0) {
    model.orderUserList();
    view.renderUserMoviesList(model.state.userMoviesList);
  }
  view.unhideUserMoviesList();
};

const controlSearchResults = async function (userInput) {
  view.housekeeping();
  view.renderSpinner();
  try {
    await model.loadSearchResults(userInput);
    const { searchResults } = model.state;
    if (searchResults.length === 0) {
      view.renderNoResultsMessage();
      view.unhideErrorMessage();
    }
    if (searchResults.length > 0) {
      view.renderSearchResults(searchResults);
      view.unhideSearchResults();
    }
  } catch (err) {
    view.renderErrorMessage(err);
    view.unhideErrorMessage();
  }
  view.clearSpinner();
};

const controlSearchMovieSelect = async function (id) {
  view.housekeeping();
  view.renderSpinner();
  const movieFromUserList = model.loadMovieFromUserList(id);
  if (movieFromUserList.length === 0) {
    try {
      await model.loadMovie(id);
      const { movieData } = model.state;
      view.renderMovieData(movieData);
      view.clearSpinner();
      view.unhideMovieData();
    } catch (err) {
      view.clearSpinner();
      view.renderErrorMessage(err);
      view.unhideErrorMessage();
    }
  }
  if (movieFromUserList.length > 0) {
    view.renderMovieData(...movieFromUserList);
    view.clearSpinner();
    view.unhideMovieData();
  }
};

const controlOpenModal = function () {
  view.openModalWindow();
};

const controlCloseModal = function () {
  view.closeModalWindow();
};

const controlSubmitUserScore = function (score, id) {
  model.addUserScore(score, id);
  const currentMovie = model.loadMovieFromUserList(id);
  view.closeModalWindow();
  view.housekeeping();
  view.renderMovieData(...currentMovie);
  view.unhideMovieData();
};

const controlUserMovieSelect = function (id) {
  const selectedMovie = model.loadMovieFromUserList(id);
  view.housekeeping();
  view.renderMovieData(...selectedMovie);
  view.unhideMovieData();
};

const controlDeleteFilm = function (id) {
  model.deleteFilm(id);
  controlLoadHomeScreen();
};

const controlClosePage = function () {
  model.saveToLocalStorage();
};

const init = () => {
  view.addHandlerClickHomeLogo(controlLoadHomeScreen);
  view.addHandlerSearchBtn(controlSearchResults);
  view.addHandlerEnterButtonSearch(controlSearchResults);
  view.addHandlerClickSearchListMovie(controlSearchMovieSelect);
  view.addHandlerAddScoreBtn(controlOpenModal);
  view.addHandlerClickOffModal(controlCloseModal);
  view.addHandlerSubmitUserScore(controlSubmitUserScore);
  view.addHandlerClickUserListMovie(controlUserMovieSelect);
  view.addHandlerClosePage(controlClosePage);
  view.addHandlerDeleteFilm(controlDeleteFilm);
  controlStartup();
};
init();

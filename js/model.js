"use strict";

export const state = {
  searchResults: {},
  movieData: {},
  userMoviesList: [],
};
/////
/////
// Normal API key - k_bkda3xra
// Second API key - k_e3i5u640
/////

export const loadSearchResults = async function (userInput) {
  try {
    const response = await fetch(
      `https://imdb-api.com/en/API/SearchMovie/k_bkda3xra/${userInput}`
    );
    const data = await response.json();
    state.searchResults = data.results;

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
  } catch (err) {
    throw err;
  }
};
//////
///////
//////
//////

export const loadMovie = async function (id) {
  try {
    const response1 = await fetch(
      `https://imdb-api.com/en/API/Ratings/k_bkda3xra/${id}`
    );
    const data1 = await response1.json();

    if (!response1.ok)
      throw new Error(`${data1.message} (${response1.status})`);

    const response2 = await fetch(
      `https://imdb-api.com/en/API/Title/k_bkda3xra/${id}`
    );
    const data2 = await response2.json();

    if (!response2.ok)
      throw new Error(`${data2.message} (${response2.status})`);

    state.movieData = {
      id: id,
      title: data1.fullTitle,
      imdb: data1.imDb,
      rottenTomatoes: data1.rottenTomatoes,
      metacritic: data1.metacritic,
      image: data2.image,
      director: data2.directors,
      starring: data2.stars,
      budget: data2.boxOffice.budget,
      boxOffice: data2.boxOffice.cumulativeWorldwideGross,
      runtime: data2.runtimeStr,
      synopsis: data2.plot,
      userScore: 0,
    };
  } catch (err) {
    throw err;
  }
};

export const addUserScore = function (userInputScore, id) {
  const result = state.userMoviesList.filter((obj) => {
    return obj.id === id;
  });
  if (result.length != 0) return;
  state.movieData.userScore = userInputScore;
  state.userMoviesList.push(state.movieData);
};

export const loadMovieFromUserList = function (id) {
  const result = state.userMoviesList.filter((obj) => {
    return obj.id === id;
  });

  return result;
};

export const loadFromLocalStorage = function () {
  if (localStorage.getItem("userMoviesList") !== null) {
    const response = localStorage.getItem("userMoviesList");
    const data = JSON.parse(response);
    state.userMoviesList = data;
  }
};

export const saveToLocalStorage = function () {
  localStorage.setItem("userMoviesList", JSON.stringify(state.userMoviesList));
};

export const orderUserList = function () {
  state.userMoviesList.sort((a, b) => {
    return b.userScore - a.userScore;
  });
};

export const deleteFilm = function (id) {
  const filmsToKeep = state.userMoviesList.filter((obj) => {
    return obj.id != id;
  });
  state.userMoviesList = filmsToKeep;
};

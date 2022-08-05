"use strict";

class View {
  #searchResultsContainer = document.querySelector(".search-results-wrapper");
  #movieDataContainer = document.querySelector(".single-movie-display-wrapper");
  #userMoviesListContainer = document.querySelector(".user-films-list-wrapper");
  #searchBtn = document.querySelector(".search-btn");
  #searchInput = document.querySelector(".search-field");
  #modalWindow = document.querySelector(".modal-window");
  #homeLogo = document.querySelector(".logo");
  #homeIcon = document.querySelector(".home-icon");
  #spinnerContainer = document.querySelector(".spinner-wrapper");
  #body = document.querySelector("body");
  #window = window;
  #errorMessageContainer = document.querySelector(".error-message-wrapper");

  // Housekeeping Methods
  #hideAllWrappers() {
    this.#searchResultsContainer.classList.add("hide");
    this.#movieDataContainer.classList.add("hide");
    this.#userMoviesListContainer.classList.add("hide");
    this.#errorMessageContainer.classList.add("hide");
  }
  unhideSearchResults() {
    this.#searchResultsContainer.classList.remove("hide");
    this.#movieDataContainer.classList.add("hide");
    this.#userMoviesListContainer.classList.add("hide");
  }

  unhideMovieData() {
    this.#movieDataContainer.classList.remove("hide");
    this.#searchResultsContainer.classList.add("hide");
    this.#userMoviesListContainer.classList.add("hide");
  }

  unhideUserMoviesList() {
    this.#userMoviesListContainer.classList.remove("hide");
    this.#movieDataContainer.classList.add("hide");
    this.#searchResultsContainer.classList.add("hide");
  }

  unhideErrorMessage() {
    this.#errorMessageContainer.classList.remove("hide");
    this.#userMoviesListContainer.classList.add("hide");
    this.#movieDataContainer.classList.add("hide");
    this.#searchResultsContainer.classList.add("hide");
  }

  #clearWrapperHTML() {
    this.#searchResultsContainer.innerHTML = " ";
    this.#movieDataContainer.innerHTML = " ";
    this.#userMoviesListContainer.innerHTML = " ";
    this.#errorMessageContainer.innerHTML = " ";
  }

  openModalWindow() {
    this.#modalWindow.classList.remove("hide");
  }

  closeModalWindow() {
    this.#modalWindow.classList.add("hide");
  }

  housekeeping() {
    this.#hideAllWrappers();
    this.#clearWrapperHTML();
  }

  //Render Methods
  renderSpinner() {
    const markup = ` <div class="svg-spinner-wrapper"><svg
    width="135"
    height="140"
    viewBox="0 0 135 140"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    class="svg-spinner"
  >
    <rect y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.5s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.5s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="30" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.25s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.25s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="60" width="15" height="140" rx="6">
      <animate
        attributeName="height"
        begin="0s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="90" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.25s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.25s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="120" y="10" width="15" height="120" rx="6">
      <animate
        attributeName="height"
        begin="0.5s"
        dur="1s"
        values="120;110;100;90;80;70;60;50;40;140;120"
        calcMode="linear"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        begin="0.5s"
        dur="1s"
        values="10;15;20;25;30;35;40;45;50;0;10"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </rect>
  </svg></div>`;

    this.#spinnerContainer.insertAdjacentHTML("afterbegin", markup);
    this.#spinnerContainer.classList.remove("hide");
  }

  clearSpinner() {
    this.#spinnerContainer.classList.add("hide");
    this.#spinnerContainer.innerHTML = " ";
  }

  renderSearchResults(data) {
    const markup = data
      .map((e) => {
        return `<div class="search-result-display" data-id="${e.id}">
          <img src="${
            e.image === "https://imdb-api.com/images/original/nopicture.jpg"
              ? "/poster-replacement.png"
              : e.image
          }" alt="Movie Poster">
          <h3>${e.title} ${e.description}</h3>
      </div>`;
      })
      .join("");

    this.#searchResultsContainer.insertAdjacentHTML("beforeend", markup);
  }

  renderNoResultsMessage() {
    const markup = `<div class="no-search-results-message">
    <h4>We found no results for movies matching your search. Please try again.</h4>
    </div>`;

    this.#errorMessageContainer.insertAdjacentHTML("beforeend", markup);
  }

  renderMovieData(data) {
    const markup = `<div class="single-movie-display" data-id="${data.id}">
     <div class="parent">
      <div class="movie-heading">
        <h1>${data.title}</h1>
      </div>
      <div class="movie-poster">
        <img src="${
          data.image === "https://imdb-api.com/images/original/nopicture.jpg"
            ? "/poster-replacement.png"
            : data.image
        }" alt="Movie Poster" />
      </div>
      <div class="imdb-logo">
        <img src="/imdb-logo.png" alt="IMDb Logo" />
        <h4>${data.imdb}</h4>
      </div>
      <div class="rotten-tomatoes-logo">
        <img
          src="/rotten-tomatoes-logo.png"
          alt="Rotten Tomatoes Logo"
        />
        <h4>${data.rottenTomatoes}%</h4>
      </div>
      <div class="metacritic-logo">
        <img src="/metacritic-logo.png" alt="Metacritic Logo" />
        <h4>${data.metacritic}</h4>
      </div>
      <div class="${
        data.userScore === 0 ? "add-score-logo" : "user-score-logo"
      }">
        <img src="${
          data.userScore === 0 ? "/add-score-logo.png" : "/user-score-logo.png"
        }" alt="User Score Logo" />
        <h4>${data.userScore === 0 ? `?` : data.userScore}</h4>
      </div>
      <div class="movie-info">
        <h4>Director(s):</h4>
        <p>${data.director}</p>
        <br />
        <h4>Starring:</h4>
        <p>${data.starring}</p>
        <br />
        <h4>Budget:</h4>
        <p>${data.budget}</p>
        <br />
        <h4>Box Office:</h4>
        <p>${data.boxOffice}</p>
        <br />
        <h4>Runtime:</h4>
        <p>${data.runtime}</p>
        <br />
        <h4>Synopsis:</h4>
        <p>${data.synopsis}</p>
      </div>
    </div>`;

    this.#movieDataContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderUserMoviesList(data) {
    const markup = `<div class="user-films-title">
    <h2>Your Movies</h2>
  </div>${data
    .map((e, i) => {
      return `<div class="user-films-list-entry" data-id="${e.id}">
        <span class="user-film-rank">${i + 1}</span>
        <div class="user-film-title">
        <span>${e.title}</span>
      </div>
      
        <img class="user-film-image" src="${e.image}" alt="Film Picture" />
      
      <div class="user-score rating-display">
        <img
          class="ratings-logo"
          src="/user-score-logo.png"
          alt="User Score Logo"
        />
        <h2>${e.userScore}</h2>
      </div>
      <div class="imdb-score rating-display">
        <img
          class="ratings-logo"
          src="/imdb-logo.png"
          alt="IMDb Logo"
        />
        <h2>${e.imdb}</h2>
      </div>
      <div class="rotten-tomatoes-score rating-display">
        <img
          class="ratings-logo"
          src="/rotten-tomatoes-logo.png"
          alt="IMDb Logo"
        />
        <h2>${e.rottenTomatoes}%</h2>
      </div>
      <div class="metacritic-score rating-display">
        <img
          class="ratings-logo"
          src="/metacritic-logo.png"
          alt="IMDb Logo"
        />
        <h2>${e.metacritic}</h2>
      </div>
      <div class="delete-film">
       <img class="delete-logo"
       src="/delete.png"
       alt="Delete Film"
       />
    </div>
    </div>
    `;
    })
    .join()}`;

    this.#userMoviesListContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderEmptyUserListMessage() {
    const markup = `<div class="user-films-title">
    <h2>Your Movies</h2>
  </div><div class="empty-list">
    <h4>You have no movies saved to your list. Search any movie, give it a rating, and add it to your list now!<h4>
    </div>`;

    this.#userMoviesListContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderErrorMessage(err) {
    const markup = `<h3>Oops, it seems like something went wrong! Please try again.</h3><br><h3>${err}</h3>`;
    this.#errorMessageContainer.insertAdjacentHTML("afterbegin", markup);
  }

  // Event Handler Methods

  addHandlerClickHomeLogo(handler) {
    const callbackFnct = function (e) {
      e.preventDefault();
      handler();
    };

    this.#homeLogo.addEventListener("click", callbackFnct);
    this.#homeIcon.addEventListener("click", callbackFnct);
  }

  addHandlerSearchBtn(handler) {
    this.#searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const search = e.target
        .closest("div")
        .querySelector(".search-field").value;
      if (!search) return;
      handler(search);

      e.target.closest("div").querySelector(".search-field").value = "";
    });
  }

  addHandlerEnterButtonSearch(handler) {
    this.#searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const search = e.target
          .closest("div")
          .querySelector(".search-field").value;
        if (!search) return;
        handler(search);

        e.target.closest("div").querySelector(".search-field").value = "";
      }
    });
  }

  addHandlerClickSearchListMovie(handler) {
    this.#searchResultsContainer.addEventListener("click", function (e) {
      e.preventDefault();
      if (!e.target.closest("div")?.classList.contains("search-result-display"))
        return;

      const { id } = e.target.closest("div").dataset;
      handler(id);
    });
  }

  addHandlerAddScoreBtn(handler) {
    this.#movieDataContainer.addEventListener("click", function (e) {
      e.preventDefault();
      if (!e.target.closest("div").classList.contains("add-score-logo")) return;
      handler();
    });
  }

  addHandlerClickOffModal(handler) {
    this.#modalWindow.addEventListener("click", function (e) {
      e.preventDefault();
      if (!e.target.closest("div").classList.contains("modal-window")) return;
      handler();
    });
  }

  addHandlerSubmitUserScore(handler) {
    this.#body.addEventListener("click", function (e) {
      e.preventDefault();

      if (!e.target.classList.contains("user-score-submit")) return;

      const score = +e.target.closest("div").querySelector(".user-score-input")
        .value;

      if (!score || score > 10 || score < 0.1) {
        alert("Rating's must be between 0.1 and 10");
        return;
      }

      const { id } = e.target
        .closest("body")
        .querySelector(".single-movie-display").dataset;

      handler(score, id);

      e.target.closest("div").querySelector(".user-score-input").value = "";
    });
  }

  addHandlerClickUserListMovie(handler) {
    this.#userMoviesListContainer.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        !e.target.closest(".user-films-list-entry") ||
        e.target?.classList.contains("delete-logo")
      )
        return;
      const { id } = e.target.closest(".user-films-list-entry").dataset;
      handler(id);
    });
  }

  addHandlerDeleteFilm(handler) {
    this.#userMoviesListContainer.addEventListener("click", function (e) {
      if (!e.target?.classList.contains("delete-logo")) return;

      const { id } = e.target.closest(".user-films-list-entry").dataset;
      handler(id);
    });
  }

  addHandlerClosePage(handler) {
    this.#window.addEventListener("unload", function (e) {
      handler();
    });
  }
}

export default new View();

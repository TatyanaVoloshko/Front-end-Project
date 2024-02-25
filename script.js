const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");


let query = "";
const perPage = 20;


$(document).ready(function () {

    searchForm.addEventListener("submit", function onSearchForm(e) {
      e.preventDefault();
      page = 1;
      query = e.currentTarget.elements.searchQuery.value.trim();
      gallery.innerHTML = "";

        if (query === "") {
            $(".gallery")
                .html(
                    "The search string cannot be empty. Please specify your search query!"
                )
                .css("color", "red");

            return;
        } else {
            renderGallery();
        }
    });
        

    function renderGallery() {
        const KEY = "35833245-87af2506e90926e341a869925";
        
  $.ajax({
    url: `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}`, // JSONPlaceholder URL
    method: "GET",
    dataType: "json",
  }).done(function (response) {
    if (!gallery) {
      return;
    }
    const markup = response.hits
      .map((image) => {
        const {
          id,
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        } = image;
        return `
        <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
      `;
      })
      .join("");

    gallery.insertAdjacentHTML("beforeend", markup);
  });

    }
});

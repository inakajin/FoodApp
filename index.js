
//Define URL to call as global variable
const RECIPE_SEARCH_URL = 'https://food2fork.com/api/search';


//This function calls the Recipe API
function getDataFromApi(searchTerm, callback) {
  const settings = {
      key: 'e97290b2e3d47f42045192359ee16f4e',
      q: searchTerm,
      /*part: 'recipes'*/
    };
  /*return  $.getJSON(RECIPE_SEARCH_URL, settings, callback);*/
  $.getJSON(RECIPE_SEARCH_URL, settings, callback);
}

/*http://food2fork.com/api/search?key=e97290b2e3d47f42045192359ee16f4e&q=duck*/

const template = {
  item: function(item) {
    return '<div class ="result">' +
              '<div class="publisher">' +
                '<p>' + item.recipes.publisher + '</p>' +
                  '<div class="thumbnail">' + 
                    '<a href='+item.recipes.source_url+'"target="_blank">' +
                      '<img src="' + item.recipes.image_url + '"alt="' + item.recipes.title + '">' +
                    '</a>' +
                    '<div class="recipetitle">' +
                      '<p>' + item.recipes.title + '</p>' +
                    '</div>' +
                  '</div>' +
              '</div>' +
            '</div>';
  }
};

//Listen for event and launch search
function searchSubmit() {
  $('.js-search-form').submit(event=> {
    event.preventDefault();
    const searchTarget = $(event.currentTarget).find('.js-query').val().trim();
    console.log(searchTarget);
    getDataFromApi(searchTarget,displayRecipeSearchData);
  });
}

//render results
function displayRecipeSearchData(data) {
  console.log(data.items);
  var results = ' ';
  if (data.items) {
    data.items.forEach(function(item) {
      results += template.item(item);
    });
  }
  else {
    results += '<p>No results</p>';
  }
  $('.js-search-results').html(results);
}

$(searchSubmit);

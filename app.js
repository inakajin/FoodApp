
//Define URL to call as global variable
const RECIPE_SEARCH_URL = 'https://api.edamam.com/search';

//This function calls the Recipe API
function getDataFromApi(searchTerm, callback) {
  const settings = {
      q: searchTerm,
      from: '0',
      to: '12',
      app_id: 'cc3ee280',
      app_key: 'e93e9043178ce874680226c6ce8acc49',
    };
  $.getJSON(RECIPE_SEARCH_URL, settings, callback);
}


//This is a template used to push html to the DOM
const template = {
  item: function(item) {
    return '<div class ="col-4">' +
              '<div class ="result">' +
                '<div class="recipelabel">' +
                  '<div class="reclist">' + renderList(item.recipe.ingredientLines) + '</div><!-- end reclist -->' +
                    '<p class="label">' + item.recipe.label + '</p>' +
                    '<div class="thumbnail">' + 
                      '<a href="'+ httpsTransform(item.recipe.url) + '" target="_blank">' +
                      '<img src="' + item.recipe.image + '"alt="' + item.recipe.label + '">' +
                      '</a>' +
                    '<div class="recipesource">' +
                      '<p class="source">' + item.recipe.source + '</p>' +
                    '</div><!-- end recipesource -->' +
                  '</div><!-- end thumbnail -->' +
                '</div><!-- end recipelabel -->' +
              '</div><!-- end result -->' + 
            '</div><!-- end col-4 -->';
  }
};

//Listen for event and launch search
function searchSubmit() {
  $('.js-search-form').submit(event=> {
    event.preventDefault();
    const searchTarget = $(event.currentTarget).find('.js-query').val().trim();
    getDataFromApi(searchTarget,displayRecipeSearchData);
  });
}


//Convert the array of ingredientLines into a bulleted list
function renderList(ingredientLines) { 
  var returnList="<ul>";
  ingredientLines.forEach(function(ingredient){
  returnList += "<li>"+ingredient+"</li>";
  })
  returnList += "</ul>";
  return returnList;
}

//Render display
function displayRecipeSearchData(data) {
  var results = ' ', row = '';
  if (data.hits.length) {
    data.hits.forEach(function(item, i) {
      row += template.item(item);
      if (i % 3 == 2) { // wrap row and add to result
        results += '<div class="row">' + row + '</div>';
        row = '';
      }
    });
    if (row.length) { // flush remainder into a row
      results += '<div class="row">' + row + '</div>';
    }
  }
  else {
    results += '<p> No results </p>';
  }
  $('#js-search-results').html(results);
}

//Cleans the url by changing http to https where applicable
function httpsTransform(url) {
  return url.replace(/^http:\/\//i, 'https://');
}

//Hover behavior for ingredients pop-up and readies the document
$(function() {
  searchSubmit();
  $('body').on('mouseenter','p.label',function(e) {
    $(this).siblings('div.reclist').show();
  }).on('mouseleave','p.label',function(e){
    $(this).siblings('div.reclist').hide();
  });
});


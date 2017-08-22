
//Define URL to call as global variable
/*const RECIPE_SEARCH_URL = 'https://food2fork.com/api/search';*/
const RECIPE_SEARCH_URL = 'https://api.edamam.com/search';

//This function calls the Recipe API
function getDataFromApi(searchTerm, callback) {
  const settings = {
      q: searchTerm,
      app_id: 'cc3ee280',
      app_key: 'e93e9043178ce874680226c6ce8acc49',
      /*part: 'recipes'*/
    };
  $.getJSON(RECIPE_SEARCH_URL, settings, callback);
}

const template = {
  item: function(item) {
    /*console.log(item.recipe.ingredientLines);*/
   /* var htmlOutput = "";
    $.each(item); {
      htmlOutput += 
      '<div class="inredients">' +
      '<p>' + item.recipe.ingredientLines + '</p>' +
      '</div>';
    }*/
    /*item.recipe.url = url.replace(/^http:\/\//i, 'https://');*/
    return '<div class ="col-4">' +
              '<div class ="result">' +
                '<div class="recipelabel">' +
                  '<div class="reclist">' + item.recipe.ingredientLines + '</div><!-- end reclist -->' +
                  '<p class="label">' + item.recipe.label + '</p>' +
                    '<div class="thumbnail">' + 
                      '<a href='+ item.recipe.url +'"target="_blank">' +
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
    console.log('search:'+searchTarget);
    getDataFromApi(searchTarget,displayRecipeSearchData);
  });
}

//render results
function displayRecipeSearchData(data) {
//  console.log('myitems:'+data);
//  console.dir(data);
  var results = ' ';
  if (data.hits) {
    data.hits.forEach(function(item) {
      /*item.recipe.url = url.replace(/^http:\/\//i, 'https://');*/
      console.log('singleitem:'+item);
 //   console.log('template',template.item);
      results += template.item(item);
//      var div = "<div>test</div>";
//      results += div;
    });
  }
  else {
    results += '<p>No results</p>';
  }
  $('#js-search-results').html(results);
}

//Cleans the url

//hover behavior for ingredients pop-up
$(function(event) {
  var moveLeft = 20;
  var moveDown = 10;

  $('div.recipelabel').hover(function(e) {
  console.log("*****");
    $('div.reclist').show();
  }, function() {
    $('div.reclist').hide();
  });

  $('div.recipelabel').mousemove(function(e) {
    $("div.reclist").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
  });

});


$(searchSubmit);

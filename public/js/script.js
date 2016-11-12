$(document).ready(function(){
  var api_key = ('5u44i6oyib0d4fmpwwl56q8k');
  var terms = $('#etsy-terms').val();
  // console.log(terms)
  var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=baby%20"+terms+"&limit=12&includes=Images:1&api_key="+api_key;
  $("#search-etsy").click(function(){
    $.ajax({
      url: etsyURL,
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        // var searchResults = $('<div>');
        data.results.forEach(function (result) {
          var newDiv = $('<div>');
          newDiv.append($('<a href="'+result.url+'"><img class="esty_results_image" src='+result.Images[0].url_75x75+'></a>'));
          newDiv.append($('<li>').text(result.title));
          newDiv.append($('<li>').text('$'+result.price));
          newDiv.append($('<button>').text('Add ♥').addClass('saved'));
          $('#etsy_results').append(newDiv);
        }); // ends for each
      } // ends success fucntion
    }); // ends ajax call
  }); // closes search etsy click function

// Click event listener for all images
  $("body").on('click', '.saved', function(ev) {
    console.log($(this).parent().children())
    var itemData = {
      image: $(this).parent().children()[0].children[0].src,
      title: $(this).parent().children()[1].textContent,
      price: $(this).parent().children()[2].textContent,
      email: $(".email").val()
    }


    console.log(itemData);
         $.ajax({
             method: "post",
             url: "items/new",
             data: itemData,
             success: function(data){
              //location.reload();
              console.log(data)
            } //ends success calls
          });//ends ajax calls
  });//end click event


}); // end doc .ready

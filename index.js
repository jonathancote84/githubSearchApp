'use strict';

//username 
// const searchURL = "jonathancote84";

//personal Oath token 561f03244bd6224168c820fe30b33df60ed6a428
//not necessary for this test app
//
function getUserInfo(name) {
    console.log();
    const url = `https://api.github.com/users/${name}/repos`;
    //fetch api GET calls github api
    fetch(url)
    .then( response => {
      //check for errors before returning response.json  
      if (response.ok) {
          return response.json() ;
      }
      //send eror status text to .catch
      throw new Error(response.statusText) ;
    })
      //do something 
      .then(responseJson => displayResults(responseJson))
      .catch( err => {$( '#js-error-message' ).text(`something went wrong: ${err.message}`);
    });
}
//display results
function displayResults(responseJson) {
  console.log(responseJson);
  //empty results-list html before displaying new results
  $('#results-list').empty();
  //iterate through the items array data 
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson[i].full_name}</h3>
      <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>`
    )};
    //test
    // console.log(responseJson[i])
  $('#results').removeClass('hidden');
  
}
//event listner 
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $("#js-search-term").val();
    // console.log(userName);
    getUserInfo(userName);
  });
}


$(watchForm)
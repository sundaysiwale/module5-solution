// Created by user on 4/28/2026, 11:20:05 PM
// Last modified by user on 4/28/2026, 11:53:45 PM
(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://davids-restaurant.herokuapp.com/categories.json";

  // Insert HTML into page
  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  // Show loading icon
  function showLoading(selector) {
    var html = "<div style='text-align:center;'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  }

  // Replace {{property}} in HTML
  function insertProperty(string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    return string.replace(new RegExp(propToReplace, "g"), propValue);
  }

  
  //  STEP 1: Random Category
  
  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  
  //  STEP 2: Load Home Page

  dc.loadHomePage = function () {
    showLoading("#main-content");

    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML
    );
  };

 
  // STEP 3: Build Home HTML
 
  function buildAndShowHomeHTML(categories) {

    // Pick random category
    var randomCategory = chooseRandomCategory(categories);


    // IMPORTANT: must include quotes
    var randomCategoryShortName = "'" + randomCategory.short_name + "'";

    // Load home snippet
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {

        var finalHtml = insertProperty(
          homeHtml,
          "randomCategoryShortName",
          randomCategoryShortName
        );

        insertHtml("#main-content", finalHtml);
      },
      false
    );
  }

 
  // INITIAL LOAD
 
  document.addEventListener("DOMContentLoaded", function () {
    dc.loadHomePage();
  });

  // Export to global
  global.$dc = dc;

})(window);
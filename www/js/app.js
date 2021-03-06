// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
"use strict";
var fb = new Firebase("https://fiery-fire-5815.firebaseio.com/");

angular.module('starter', ['ionic', 'starter.controllers','starter.services','starter.directives','uiGmapgoogle-maps', 'ngCordova','btford.socket-io','ngSanitize','firebase', 'pascalprecht.translate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider,uiGmapGoogleMapApiProvider,$translateProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
   .state('app.tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })

    .state('app.docProfile', {
      url: "/search/:Doctor_Id/:ashortname/:Latitude/:Longitude",
      views: {
        'menuContent': {
          templateUrl: "templates/docProfile.html",
          controller: 'ProfileCtrl'
        }
      }
    })

   /* .state('app.docProfile', {
    url: '/search/:Doctor_Id/:ashortname/:Latitude/:Longitude',
    views: {
      'menuContent': {
        templateUrl: 'templates/docProfile.html',
        controller : 'ProfileCtrl'
      }
    }
  })*/
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "about.html",
          controller: 'AboutCtrl'
        }
      }
    })

    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

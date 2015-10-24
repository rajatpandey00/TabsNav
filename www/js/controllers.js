angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('HomeCtrl',function($scope){
  $scope.Name="Love";
})
.controller('SearchCtrl',['$scope', '$http', '$state', '$timeout','$cordovaGeolocation','$ionicLoading',

  function($scope,$http,$state,$timeout,$cordovaGeolocation,$ionicLoading) {
   
  $scope.show=function(){
    $ionicLoading.show({
    content: 'Loading....',
    animation: 'ion-refreshing',
    maxWidth: 200,
    showDelay: 0
  
  })
  };

  $scope.show();

    $http.get('https://fiery-fire-5815.firebaseio.com/doctors.json').success(function(data){

    $scope.doctors = data.doctors;
    
    $scope.Doctor_Id = $state.params.Doctor_Id;

    $scope.Doctors_Name= $state.params.ashortname;

    $scope.latitude = $state.params.Latitude;

    $scope.longitude = $state.params.Longitude;

   // alert('Latitude '+$state.params.Longitude);
   
    $ionicLoading.hide();

    var site,newSite,destination,map,marker,markerFirst,watch,magneticHeading,oc,directionService;

     var g_PI2      = Math.PI*2; // 2 x Pi
    var g_toRAD     = 360/g_PI2; // Divide degrees by this to get radians
    var g_watchH    = null;      // the current watchHeading (compass) callback identifier
    var g_watchG    = null;      // the current watchPosition (GPS) callback identifier
    var g_ArrHeight = 18; 
    var oc = null;
           // Height of drawn arrow




   $cordovaGeolocation.getCurrentPosition().then(function(pos) {

   // var oc = document.getElementById('arrow');
    directionService = new google.maps.DirectionsService();
   
    /*oc.width  = g_ArrHeight * 4;
    oc.height = g_ArrHeight * 4;     */   
   
      site = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
       
         destination = new google.maps.LatLng($scope.latitude,$scope.longitude);

           var mapOptions = {
                     streetViewControl:true,
                     center: destination,
                     zoom: 16,
                     mapTypeId: google.maps.MapTypeId.TERRAIN
                             };

  
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
       
        var infowindow = new google.maps.InfoWindow();

        markerFirst = new google.maps.Marker({
          position: site,
          map: map,
          title: 'My Location'
        });

               
       var destinationRoute = new google.maps.Marker({
          position: destination,
          map: map,
          title: $scope.doctors.Doctors_Name
        });
        
        var infowindow = new google.maps.InfoWindow({
             content:markerFirst.title
        });

        infowindow.open(map,markerFirst);
        
       var destinationwindow = new google.maps.InfoWindow({
             content:$scope.doctor
        });

        destinationwindow.open(map,destinationRoute);
       
        google.maps.event.addListener(markerFirst, 'click', function() {
          infowindow.open(map,markerFirst);
        });
       
        $scope.map = map;

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
               origin : site,
               destination : destination,
                travelMode : google.maps.TravelMode.DRIVING
                      };

        directionsService.route(request, function(response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {

                directionsDisplay.setDirections(response);
            }
        });



  directionsDisplay.setMap(map); 
  directionsDisplay.setPanel(document.getElementById('directions-panel'));


   var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

$ionicLoading.hide();
  

   /*function drawArrow(r)
   {
  //  alert(r);
    var ctx = document.getElementById('arrow').getContext('2d');
   
    ctx.clearRect(0, 0, g_ArrHeight*4, g_ArrHeight*4);
    var state = ctx.save();
    var fulld3 = g_ArrHeight/5;
    var fulld2 = g_ArrHeight/5;
    ctx.translate(g_ArrHeight*2, g_ArrHeight*2);
    ctx.rotate(r);

    ctx.beginPath();
    ctx.strokeStyle = '#14108B';
    ctx.lineWidth = 5;

    ctx.moveTo(0, -g_ArrHeight);
    ctx.lineTo(g_ArrHeight, fulld3);
    ctx.lineTo(fulld2, fulld3);
    ctx.lineTo(fulld2, g_ArrHeight);
    ctx.lineTo(-fulld2, g_ArrHeight);
    ctx.lineTo(-fulld2, fulld3);
    ctx.lineTo(-g_ArrHeight, fulld3);

    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle="blue";
    ctx.fill();

    ctx.restore(state);
   };*/

 

$scope.doRefresh = function(){

        $http.get('https://fiery-fire-5815.firebaseio.com/doctors.json').success(function(data){

            $scope.doctors = data.doctors;
    
   
           $scope.$broadcast('scroll.refreshComplete');

        });

     };

$scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {

        $scope.artists.splice($scope.artists.indexOf(item), 1);

      };
   
   
     $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
           
     ginit();

 });

function ginit() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    
    var myOptions = {
      zoom:16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: site
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    directionsDisplay.setMap(map);
    calcRoute();
  }  

function calcRoute() {
    var start = site;
    var end = destination;
    var request = {
        origin:start, 
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        fx(response.routes[0]);
      }
    });
  }


function fx(o)
  {
    if(o && o.legs)
    {
      for(l=0;l<o.legs.length;++l)
      {
        var leg=o.legs[l];
        for(var s=0;s<leg.steps.length;++s)
        {
          var step=leg.steps[s],
              a=(step.lat_lngs.length)?step.lat_lngs[0]:step.start_point,
              z=(step.lat_lngs.length)?step.lat_lngs[1]:step.end_point,
              dir=((Math.atan2(z.lng()-a.lng(),z.lat()-a.lat())*180)/Math.PI)+360,
              ico=((dir-(dir%3))%120);
              new google.maps.Marker({
                position: a,
                icon: new google.maps.MarkerImage('http://maps.google.com/mapfiles/dir_'+ico+'.png',
                                            new google.maps.Size(24,24),
                                            new google.maps.Point(0,0),
                                            new google.maps.Point(12,12)
                                           ),
          map: map,
          title: Math.round((dir>360)?dir-360:dir)+'°'
        });

        }
      }
    }
  }


function onDeviceReady() {

   //alert('Inside DeviceReady');
   var optionsG = { frequency: 2500 };

      var watchID = navigator.compass.watchHeading(onSuccessG, onErrorG, optionsG);

      //alert('watchID'+watchID);

    var optionsH = { maximumAge: 30000, timeout: 50000, enableHighAccuracy: false };
    var g_watchH = navigator.geolocation.watchPosition(onSuccessH, null, optionsH);

  }

        
    
    function onSuccessH(position){
      var element = document.getElementById('geolocation');
      //aler(element);
            element.innerHTML = 'Latitude: '  + position.coords.latitude  + '<br />' +
                        'Longitude: ' + position.coords.longitude;
                                      
   
            drawArrow(g_PI2-heading.magneticHeading/g_toRAD);
                    }



    function onSuccessG(position) {
    var element = document.getElementById('heading');
    element.innerHTML = 'Heading: ' + heading.magneticHeading;
      }



    function onErrorG(compassError) {
    //alert('Compass error: ' + compassError.code);

     }

document.addEventListener("deviceready", onDeviceReady, false);
});


   }])


.controller('SearchCtrlH',['$scope', '$http', '$state', '$timeout','$cordovaGeolocation',

  function($scope,$http,$state,$timeout,$cordovaGeolocation) {

  
    $http.get('js/hospitals.json').success(function(data){

    $scope.hospitals = data.hospitals;

   
  
   });

    
   }])

.controller('ProfileCtrl',['$scope', '$http' ,'$state', '$ionicLoading' ,'$ionicSideMenuDelegate',

  function($scope,$http,$state, $ionicLoading,$ionicSideMenuDelegate){

    /*$ionicLoading.show({
    template: 'loading..'
     });*/

      $scope.openMenu=function(){
          $ionicSideMenuDelegate.toggleRight();
      };
      
    $scope.Doctor_Id = $state.params.Doctor_Id;
       //alert('Doc ID--> '+ $state.params.Doctor_Id);

    $http.get('https://fiery-fire-5815.firebaseio.com/doctors/doctors/'+$state.params.Doctor_Id+'.json').success(function(data){


   $scope.doctorname = data.Doctors_Name;
   $scope.whichArtist = $state.Doctors_Name;
   $scope.clinic= data.clinic;
   $scope.address= data.Address;
   $scope.city= data.City;
   $scope.Accolade = data.Accolade;
   $scope.state= data.State;
   $scope.phonenumber= data.Contact_Number;
   $scope.email= data.Email;
   $scope.img = data.IUrl;
   //alert($scope.img);
   $scope.Working_Schedule= data.Working_Schedule;
   $scope.speciality= data.Speciality;

 // alert('Name==>'+$scope.whichArtist);
//$scope.myData = data.Working_Schedule[0].Timings;
//alert($scope.Working_Schedule);
var days =["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

       $scope.groups = [];
       
      // alert('Work Length-->'+Working_Schedule.length);
  for (var i=0; i< $scope.Working_Schedule.length; i++) {
    $scope.groups[i] = {
      name: $scope.Working_Schedule[i].Place_Name,
      items: []
    };
    //alert(Working_Schedule[i].Timings);
    for (var j=0; j<days.length-1; j++) {
      if($scope.Working_Schedule[i].Timings[days[j]] != null)
      $scope.groups[i].items.push(days[j]+'-'+$scope.Working_Schedule[i].Timings[days[j]]);
      //alert(Working_Schedule[i].Timings[j]);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  

});

 //$ionicLoading.hide();

  }])

.controller('AboutCtrl', function($scope){
  $scope.Name =  "About Love Great";
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});

(function(){
	"use strict";

    var app = angular.module('twitterapp');

    app.controller('DefaultController', [
        '$scope',
        '$http',
        '$filter',
        function($scope,$http,$filter){
        	$('#myModal').modal({backdrop: 'static', keyboard: false});
        	var hours = [];
        	var created_hour = [];

        	$scope.gettweets = function(){
        		$('.btn-primary').hide();
        		$('.loading-container').show();
        		$http({
			        method : "GET",
			        url : "http://codedemo.rcjworks.com/twitterapi/twitter/viewtweets/"+$scope.screenname+".json"
			    }).then(
				    function mySucces(response) {
				    	$scope.userprofpic = response.data[0].Tweets.profile_image
				    	$scope.screennameurl = 'https://twitter.com/'+response.data[0].Tweets.screen_name;
				    	$scope.totaltweet = 0;
				    	console.log(response);
				    	for(var i = 0; i < response.data.length; i++){
				    		hours.push(parseInt(response.data[i][0].tweetcount));
				    		created_hour.push(response.data[i].Tweets.created_hour+":00");
				    		$scope.totaltweet += parseInt(response.data[i][0].tweetcount);
				    	}
				    	$('.loading-container').hide();
				    	$('.btn-primary').show();
				    	$('#myModal').modal('hide');
				    }, 
				    function myError(response) {
				        console.log(response);
				    }
			    );
        	};

			$scope.labels = created_hour;
			$scope.series = ['Tweets'];
			$scope.data = [
				hours
			];

			$scope.onClick = function (points, evt) {
				console.log(points, evt);
			};

			$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
			$scope.options = {
				scales: {
					yAxes: [
						{
						  id: 'y-axis-1',
						  type: 'linear',
						  scaleLabel: {display:true,labelString:"Number of tweets",fontSize: 20},
						  display: true,
						  position: 'left',
						  tick: { fixedStepSize:2 }
						},
					]
				}
			};

			$scope.showmodal = function(){
				$('#myModal').modal('show');
			}
        }
    ]);
    
    console.log('Default Controller Initialized!');

})();
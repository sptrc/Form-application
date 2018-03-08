var myApp = /**
* todoApp Module
*
* Description
*/
angular.module('newApp', ['firebase','ngAnimate'])
.service('personData', function($firebaseArray,$firebaseObject){
	var ref = firebase.database().ref('person');
	this.data =  $firebaseArray(ref);
	this.add = function(obj){
		var ref = firebase.database().ref('person');
		$firebaseArray(ref).$add(obj)
		.then(
			function(){
				obj.name = '';
				obj.email = '';
				obj.phone = '';
			}
			);
	}
	this.del = function(info){
		this.data.$remove(info)
		.then(
			function(){})
	}
	this.edit = function(id){
		var ref = firebase.database().ref('person/'+id);
		return $firebaseObject(ref);
	}
	this.update = function(obj){
		var ref = firebase.database().ref('person/'+this.id);
		ref.update({
			name:obj.name,
			email:obj.email,
			phone:obj.phone
		})
		.then(
			function(){	
				obj.name='';
				obj.email='';
				obj.phone='';
			})
	}
})
.controller('newCon',function($scope,personData){
	$scope.added = false;
	$scope.deleted = false;
	$scope.updated = false;
	$scope.add = true;
	$scope.addPerson = function(){
		personData.add($scope.person);
		$scope.added = true;
		window.setTimeout(function() {
			$scope.$apply(function(){
				$scope.added = false;
			})
		}, 2000);
	}
	$scope.data = personData.data;
	$scope.delPerson = function(info){
		personData.del(info);
		$scope.deleted = true;
		window.setTimeout(function() {
			$scope.$apply(function(){
				$scope.deleted = false;
			})
		}, 2000);
	}
	$scope.editPerson = function(id){
		$scope.add = false;
		$scope.person = personData.edit(id);
	}
	$scope.updatePerson = function(){
		personData.update($scope.person);
		$scope.updated = true;
		$scope.add = true;
		window.setTimeout(function(){$scope.$apply(function(){})},100);
		window.setTimeout(function() {
			$scope.$apply(function(){
				$scope.updated = false;
			})
		}, 2000);
	}
	$scope.sorder = true;
	$scope.sort = function(arg){
		$scope.sortx = arg;
		$scope.sorder = !$scope.sorder;
	}
	$scope.inc = 2;
	$scope.load = function(){
		$scope.inc+=2;
	}
})

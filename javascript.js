var app = angular.module('myApp',['ngSanitize']);

app.controller('personController', ['$scope','$compile','$interpolate','Persons', function($scope,$compile ,$interpolate,Persons){
	$scope.persons =Persons.getPersons();
	$scope.greyout = false;
	$scope.add = function(person){
		
		$scope.persons = Persons.addPerson(person);
		console.log(person);
		$scope.greyout = false;
	}
	$scope.delete =function(){
		$scope.persons = Persons.deletePerson();
	}
	$scope.update =function(){
		$scope.persons = Persons.updatePerson();
	}
	$scope.showAddForm = function(){
		$scope.greyout = true;
	}
}])
.factory('Persons', function(){
	var persons = [{
		name:"ranjan",
		email:"ranjan@gmail.com",
		age:28,
		city:"Bangalore",
		state:"Karnataka",
		country:"India"
	},{
		name:"harsha",
		email:"harsha@gmail.com",
		age:27,
		city:"Bangalore",
		state:"Karnataka",
		country:"India"
	},{
		name:"vivek",
		email:"vivek@gmail.com",
		age:17,
		city:"Bangalore",
		state:"Karnataka",
		country:"India"
	}];
	var getPersons = function(){
		return persons
	}

	var addPerson =function(person){
		if(person){
			var person ={name:person.name,
			email:person.email,
			age:person.age,
			city:person.city,
			state:person.state,
			country:person.country}

			persons.push(person);

		}
		

		return persons;
	}

	var deletePerson = function(){
		 persons.splice(1, 1);
		 return persons;
	}

	var updatePerson = function(){
		persons[0].name='BABY';
		persons[0].email='BABY@gmail.com';
		persons[0].age='33';

		 return persons;
	}
	return {
		getPersons:getPersons,
		addPerson :addPerson,
		deletePerson :deletePerson,
		updatePerson:updatePerson
	}
})
.directive('myDirective',function($interpolate){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		compile: function(tElement, tAttrs){ 
			var interpolation = $interpolate('<td>{{$index}}</td><td>{{person.name}}</td><td>{{person.email}}</td><td>{{person.age}}</td><td>{{person.city}}</td><td>{{person.state}}</td><td>{{person.country}}</td><td><span class="glyphicons glyphicons-pencil"></span></td>');
			
			function link( scope, element, attributes ) {
				scope.html = interpolation( scope );
				scope.$watch("person",function(o,n){
					if(o!=n){
						scope.html = interpolation( scope );
					}
					
				},true)
				
				
			}
			return link;
		}
		
	};
});


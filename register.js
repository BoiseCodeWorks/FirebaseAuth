(function () {
	let app = angular.module('firebaseAuth');

	app.component('register', {
		controller: RegisterController,
		controllerAs: 'rc',
		templateUrl: 'register.html'
	});

	RegisterController.$inject = [];

	function RegisterController() {

		let rc = this;
		
		rc.email = '';
		rc.password = '';
		
		rc.register = function () {
			
			firebase.auth().createUserWithEmailAndPassword(rc.email, rc.password)
				.then((newUser) => {

					firebase.database().ref('/users/' + newUser.uid).set({
						id: newUser.uid,
						email: newUser.email
					});

					console.log(newUser);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
})();
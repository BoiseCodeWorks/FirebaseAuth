(function () {
	let app = angular.module('firebaseAuth');

	app.component('login', {
		controller: LoginController,
		controllerAs: 'lc',
		templateUrl: 'login.html'
	});

	LoginController.$inject = [];

	function LoginController() {

		let lc = this;

		lc.email = '';
		lc.password = '';

		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {

				firebase.database().ref('/users/' + user.uid).once('value', (snapshot) => {
					console.log('Logged In: ', snapshot.val());
				});

				firebase.database().ref('/users/YHQAVgNuUeUbIro4ee5eXOxXdaj1').once('value', (snapshot) => {
					console.log('Other User: ', snapshot.val());
				});

				let newRef = firebase.database().ref('/users/').push();

				newRef.key
				
			} else {
				console.log('Logged Out');
			}
		});

		//firebase.auth().signOut();

		lc.login = function () {


			firebase.auth().signInWithEmailAndPassword(lc.email, lc.password)
				.catch((error) => {
					console.log(error);
				});
		}
	}
})();
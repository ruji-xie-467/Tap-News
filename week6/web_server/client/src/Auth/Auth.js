class Auth {
	//this is a helper class to do things with localStorage
	static authenticateUser(token, email) {
		localStorage.setItem('token', token);
		localStorage.setItem('email', email);
	}

	static isUserAuthenticated() {
		console.log('Token in localStorage:')
		console.log(localStorage.getItem('token'))
		return localStorage.getItem('token') !== null;
	}

	static deauthenticateUser() {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
	}

	static getToken() {
		return localStorage.getItem('token');
	}

	static getEmail() {
		return localStorage.getItem('email');
	}
}

export default Auth;

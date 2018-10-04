// Calling an api with HTTPRequest:
// var a = new XMLHttpRequest();

// a.addEventListener('readystatechange', function(r) {
// 	if (r.target.status === 200) {
// 		console.log(r.target.response)
// 	}
// });

// a.open('GET', 'https://api.github.com/users/J0ssue', true);
// a.send()

// The Promises method:
fetch('https://api.github.com/users/J0ssue')
.then(function(r) {
	console.log(r.status);
	console.log(r)
	return r.json();
})
.then(function(j) {
	console.log(j);

	// adds github name 
	addLoginName(j.login);
	// adds name
	addName(j.name);
	// add bio
	addBio(j.bio);
	// creates github image
	addImg(j.avatar_url);
	addFollowers(j.followers);
	// creates folowers 
	getFollowers(j.followers_url);

})

// Adds github name
function addLoginName(login) {
	document.querySelector('#login').innerText = login;
}

// adds real name
function addName(name) {
	document.querySelector('#name').textContent = name;
}

// add bio
function addBio(bio) {
	document.querySelector('#bio').textContent = bio;
}

// renders image to the DOM
function addImg(url) {
	let img = document.querySelector('#img');	
	img.src = url;
}

function addFollowers(followers) {
	document.querySelector('#n_followers').textContent = followers;
}

// Fetching Followers
function getFollowers(url) {
	fetch(url)
	.then(function(response) {
		return response.json();
	})
	.then(function(response) {
		console.log(response);	
		renderFollowers(response);
	})
}



function renderFollowers(followers) {
	let container = document.querySelector('div.row');

	followers.map(function(f) {
		let item = document.createElement('div');
		item.className = 'column';
		item.innerHTML = `
				<h4 class="login">${f.login}</h4>
				<img class="followerImg" src="${f.avatar_url}">
		`;
		container.appendChild(item); 	
	});
	console.log(container)
}
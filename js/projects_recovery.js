function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function sortMax(tab) {
	for (var ind01 = tab.length-1; ind01 >= 0;ind01--) {
		var temp;
		for (var ind02 = tab.length-1; ind02 >= 0;ind02--) {
			if (tab[ind02].updated_date < tab[ind01].updated_date) {
				temp = tab[ind02];
				tab[ind02] = tab[ind01];
				tab[ind01] = temp;
			}
		}
	}
}

var contributors = httpGetAsync('https://api.github.com/users/sqli-nantes/repos?per_page=100', function(response) {

	json = JSON.parse(response);

	var array = new Array ({
	});

	json.forEach(function(entry){

		var titre = entry.name;
		var description = entry.description;

		if(description == null) {
			description = '';
		}

		var langage = entry.language;
		var image_project = {};

		if (langage != null) {
			image_project["titre"] = 'images/' + langage + '.png';
		}
		else if (langage == null) {
			image_project['default_image'] = 'images/default_image.jpg';
		}

		var date = entry.pushed_at;
		var updated_date = Date.parse(date);

		array.push({titre, description, image_project, updated_date});
		
	});

	array.splice(0,1);
	sortMax(array);
	array.reverse();

	array.forEach( function(element) {

		var block_project = '<li><span class="image"><img src="';
		var button = '';

		var url_project = 'pages/' + element.titre + '/index.html';

		console.log("titre projet : " + element.titre);

		if(UrlExists(url_project)) {
		    button = '<footer><a href="pages/' + element.titre + '/index.html" class="button alt">En savoir plus</a></footer></section></div>';												
		}				  

		block_project += (element.image_project.titre !== undefined?element.image_project.titre:element.image_project['default_image']);

		block_project += '" id="logo" alt=""/></span><h3 id="' + element.titre + '">' + element.titre + '</h3><p id="' + element.titre + '_desc">' + element.description + '</p>' + button + '</li>';
		
		$('#container_projects').append(block_project);

	});

});

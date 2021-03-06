function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function sortByUpdatedDateDESC(a, b) {
  if (a.updated_date < b.updated_date)
     return 1;
  if (a.updated_date > b.updated_date)
     return -1;
  return 0;
}

var contributors = httpGetAsync('https://api.github.com/users/sqli-nantes/repos?per_page=100', function(response) {

	json = JSON.parse(response);

	var result = json.filter(entry => {
		var dontKeep = entry.fork
			|| entry.name === "sqli-nantes.github.io"
		    || entry.name.includes("deprecated");
		return !dontKeep;
	}).map(entry => {

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
		
		// image_project['titre'] = 'images/*.ext';
		
		var date = entry.pushed_at;
		var updated_date = Date.parse(date);

		return {
			titre, description, image_project, updated_date
		};
		
	}).sort(sortByUpdatedDateDESC);

	result.forEach( function(element) {

		var block_project = '<li><span class="image"><img src="';
		var button = '';

		var url_project = 'pages/' + element.titre + '/index.html';

		if(UrlExists(url_project)) {
		    button = '<footer><a href="pages/' + element.titre + '/index.html" class="button alt">En savoir plus</a></footer></section></div>';												
		}				  

		block_project += (element.image_project.titre !== undefined?element.image_project.titre:element.image_project['default_image']);

		block_project += '" id="logo" alt=""/></span><h3 id="' + element.titre + '">' + element.titre + '</h3><p id="' + element.titre + '_desc">' + element.description + '</p>' + button + '</li>';
		
		$('#container_projects').append(block_project);

	});

});

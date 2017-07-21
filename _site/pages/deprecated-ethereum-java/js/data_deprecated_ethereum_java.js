var contributors1 = httpGetAsync('https://api.github.com/users/sqli-nantes/repos?per_page=100', function(response) {

	var index_project=-1;

	json = JSON.parse(response);

	json.forEach(function(entry, index){
		if(entry.name == 'deprecated-ethereum-java')
			index_project = index;
	});

	var init_project = json[index_project].created_at;

	var d = new Date(init_project);
	var create_date = d.toDateString();

	$('#init_date').html('Created ' + create_date);

	var contributors2 = httpGetAsync('https://api.github.com/repos/sqli-nantes/deprecated-ethereum-java/commits', function(response) {

		json = JSON.parse(response);

		var last_commit = json[0].commit.author.date;

		var t = new Date(last_commit);
		var update_date = t.toDateString();

		$('#last_update').html('Updated ' + update_date);
	});

	var contributors3 = httpGetAsync('https://api.github.com/repos/sqli-nantes/deprecated-ethereum-java/stats/contributors', function(response) {
		
		json = JSON.parse(response);

		var nb_contributors = json.length;
		var nb_commits = 0;
		
		json.forEach(function(entry){
			nb_commits += entry.total;
		})

		$('#nb_contributors').html(nb_contributors + ' contributors');
		$('#nb_commits').html(nb_commits + ' commits');
	});
});
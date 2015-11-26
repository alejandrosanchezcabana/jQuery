var API_BASE_URL = "http://localhost:8080/myapp";
var USERNAME = "";
var PASSWORD = "";

$.ajaxSetup({
    headers: { 'Authorization': "Basic " + btoa(USERNAME + ':' + PASSWORD) }
});

//List
$("#button_list").click(function(e) {
	e.preventDefault();
    //getprueba(); para utilizar el get de TEST descomentar esta Línea y comentar la siguiente.
	getList();
});

//post
$("#button_post").click(function(e){
    e.preventDefault();
    $("#result").text('');
 if($("#id").val() == "" || $("#url").val() == ""){
   $('<div class="alert alert-success">  Algún campo requerido <strong>no está rellenado como la ID, la URL o el USERLIST</strong></div>').appendTo($("#result"));	
 }
    
    else {
    var newResource = new Object();
	newResource.id = $("#id").val();
	newResource.url = $("#url").val();
    newResource.description = $("#descripcion").val();
 	newResource.userlist = $("#jugador1").val() + ',' + $("#jugador2").val() + ',' + $("#jugador3").val() + ',' + $("#jugador4").val();
 	newResource.creationdate = $("#fecha").val();

	createnewGame(newResource);
}
});

//get
$("#button_get").click(function(e){
    e.preventDefault();
    getGamebyid($("#id").val());
//}
});

//put
$("#button_put").click(function(e){
     e.preventDefault();
    $("#result").text('');
 if($("#id").val() == "")
 {
      $('<div class="alert alert-success">  El campo <strong>ID</strong> no se ha rellenado</div>').appendTo($("#result"));
 }

    else{
    var newResource = new Object();
	newResource.id = $("#id").val();
	newResource.url = $("#url").val();
    newResource.description = $("#descripcion").val();
 	newResource.userlist =  $("#jugador1").val() + ',' + $("#jugador2").val() + ',' + $("#jugador3").val() + ',' + $("#jugador4").val();
 	newResource.creationdate = $("#fecha").val();
	
	updateResourcegame(newResource);
    }

});

//delete
$("#button_delete").click(function(e) {
    e.preventDefault();
      $("#result").text('');
    if($("#id").val() == "")
 {
      $('<div class="alert alert-success"><strong>NO se puede borrar un juego sin identificador!</strong></div>').appendTo($("#result"));
 }
    else{
	deleteResource($("#id").val());
    }
});

 //paginationde 
$("#button_pagination").click(function(e) {
    e.preventDefault();
    var url = API_BASE_URL + '/game/pagination?page=2';
	getPagination(url);
});

//fichero prueba
function getprueba() {
	var url = API_BASE_URL + '/game';
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var game = data;

				$('<br><strong> ID: ' + game.id + '</strong><br>').appendTo($('#result'));
				$('<strong> URL: </strong> ' + game.url + '<br>').appendTo($('#result'));
				$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));
                $('<strong>Creation Date: </strong>' + game.creationdate + '<br>').appendTo($('#result'));
                $('<strong>Userlist: </strong>' + game.userlist + '<br>').appendTo($('#result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($('#result'));
	});

}

//List
function getList() {
	var url = API_BASE_URL + '/game/list';
	$("#result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var games = data.games;
				
				$.each(games, function(i, v) {
					var game = v;

					$('<br><strong> ID: ' + game.id + '</strong><br>').appendTo($('#result'));
					$('<strong> URL: </strong> ' + game.url + '<br>').appendTo($('#result'));
                    $('<strong> Users: </strong> ' + game.userlist + '<br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));
					$('<strong> Creation date: </strong> ' + game.creationdate + '<br>').appendTo($('#result'));
				});
				

	}).fail(function() {
		$("#repos_result").text("No repositories.");
	});

}

//Get 
function getGamebyid(gameid) {
	var url = API_BASE_URL + '/game/' + gameid;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var game = data;

				$("#result").text('');
				$('<strong> UserList:</strong> ' + game.userlist+ '<br>').appendTo($('#result'));
				$('<strong> ID: </strong> ' + game.id + '<br>').appendTo($('#result'));
				$('<strong> URL: </strong> ' + game.url + '<br>').appendTo($('#result'));
                $('<strong> Creation date: </strong> ' + game.creationdate + '<br>').appendTo($('#result'));
				$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Game not found </div>').appendTo($("#get_repo_result"));
	});
}

//Delete
function deleteResource(gameid) {
	var url = API_BASE_URL + '/game/'+gameid;

	$("#result").text('');

	$.ajax({
		url : url,
		type : 'DELETE',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-warning"> <strong>Ok!</strong> Game Deleted</div>').appendTo($("#result"));
        
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});


}

//Create
function createnewGame(game) {
	var url = API_BASE_URL + '/game';
	var data = JSON.stringify(game);

	$("#result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
        contentType : "application/json; charset=utf-8",
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Game Created</div>').appendTo($("#result"));
				$('<strong> UserList:</strong> ' + game.userlist+ '<br>').appendTo($('#result'));
				$('<strong> ID: </strong> ' + game.id + '<br>').appendTo($('#result'));
				$('<strong> URL: </strong> ' + game.url + '<br>').appendTo($('#result'));
                $('<strong> Creation date: </strong> ' + game.creationdate + '<br>').appendTo($('#result'));
				$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));
        
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});

}

//Update
function updateResourcegame(game) {
var url = API_BASE_URL + '/game/' + gameid;
var data = JSON.stringify(game);

	$("#result").text('');

	$.ajax({
		url : url,
		type : 'PUT',
		crossDomain : true,
		dataType : 'json',
		data : data,
        contentType : "application/json; charset=utf-8",
		statusCode: {
    		404: function() {$('<div class="alert alert-danger"> <strong>Oh!</strong> Page not found </div>').appendTo($("#result"));}
    	}
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#result"));
        $('<br><strong> ID: ' + game.id + '</strong><br>').appendTo($('#result'));
        $('<strong> URL: </strong> ' + game.url + '<br>').appendTo($('#result'));
		$('<strong> Description: </strong> ' + game.description + '<br>').appendTo($('#result'));
        $('<strong>Creation Date: </strong>' + game.creationdate + '<br>').appendTo($('#result'));
                $('<strong>Userlist: </strong>' + game.userlist + '<br>').appendTo($('#result'));
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error con algun campo </div>').appendTo($("#result"));
	});


}

//Paginacion
function GameCollection(gameCollection){
	this.games = gameCollection;
        var href = {};

	var instance = this;

	this.buildLinks = function(header){
		this.links = weblinking.parseHeader(header);
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}

	this.toHTML = function(){
		var html = '';
		$.each(this.games, function(i, v) {
			var game = v;
			console.log(game);
			html = html.concat('<br><strong> ID: ' + game.id + '</strong><br>');
            html = html.concat('<br><strong> Description: ' + game.description + '</strong><br>');
            html = html.concat('<br><strong> Creation Date: ' + game.creationdate + '</strong><br>');
            html = html.concat('<br><strong> Userlist: ' + game.userlist + '</strong><br>');
            
             html = html.concat('<br><strong> URL: ' + game.url + '</strong><br>');
			
		});
		
		html = html.concat(' <br> ');

                var prev = this.getLink('prev');
		if (prev.length == 1) {
			console.log(prev[0].href);
			html = html.concat(' <a onClick="getPagination(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Prev]</a> ');
		}
                var next = this.getLink('next');
		if (next.length == 1) {
			html = html.concat(' <a onClick="getPagination(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Next]</a> ');
		}

 		return html;	
	}
}

function getPagination(url) {
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
        	var response = data.games;
		var gameCollection = new GameCollection(response);
                var linkHeader = jqxhr.getResponseHeader('Link');
                gameCollection.buildLinks(linkHeader);
				console.log(linkHeader);

		var html = gameCollection.toHTML();
		$("#result").html(html);

	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});

}
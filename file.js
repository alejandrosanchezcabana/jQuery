var API_BASE_URL = "http://localhost:8080";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "}
});


$("#button_list").click(function(e) {
	e.preventDefault();
	listFiles();
});

$("#button_post").click(function(e) {
	e.preventDefault();

    var newFile = new Object();
	newFile.name = $("#file_name").val();
	newFile.description = $("#descripcion").val();
	newFile.creationdate=$("#fecha").val();	
	newFile.size=$("#tamano").val();
	newFile.taglist=$("#tags").val();	
	newFile.url=$("#url").val();	
	createFile(newFile);
});

$("#button_get").click(function(e) {
	e.preventDefault();
	getFile($("#file_name").val());
});

$("#button_put").click(function(e) {
	e.preventDefault();

    var newFile = new Object();
	newFile.name = $("#file_name").val();
	newFile.description = $("#descripcion").val();
	newFile.creationdate=$("#fecha").val();	
	newFile.size=$("#tamano").val();
	newFile.taglist=$("#tags").val();	
	newFile.url=$("#url").val();
	
	updateFile(newFile);
});

$("#button_delete").click(function(e) {
	e.preventDefault();
	deleteFile($("#file_name").val());
});

$("#button_pagination").click(function(e) {
    e.preventDefault();
    var url = API_BASE_URL + '/myapp/file/pagination?page=2';
	getFilesPagination(url);
});


function listFiles() {
	var url = API_BASE_URL + "/myapp/file/list";
	$("#result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var files = data.files;
				
				$.each(files, function(i, v) {
					var file = v;

					$('<br><strong> Name: ' + file.name + '</strong><br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + file.description + '<br>').appendTo($('#result'))
					$('<strong> Fecha: </strong> ' + file.creationdate + '<br>').appendTo($('#result'));
					$('<strong> Tamaño: </strong> ' + file.size + '<br>').appendTo($('#result'));
					$('<strong> Tags: </strong> ' + file.taglist + '<br>').appendTo($('#result'));
					$('<strong> URL: </strong> ' + file.url + '<br>').appendTo($('#result'));
				});
	}).fail(function() {
		$("#result").text("No files.");
	});

}

function createFile(file) {
	var url = API_BASE_URL + '/myapp/file';
	var data = JSON.stringify(file);

	$("#result").text('');

	$.ajax({
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
        contentType: "application/json; charset=utf-8",
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> File Created</div>').appendTo($("#result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#result"));
	});


}

function getFile(file_name) {
var url = API_BASE_URL + '/myapp/file/' + file_name;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var file = data;

					$('<br><strong> Name: ' + file.name + '</strong><br>').appendTo($('#result'));
					$('<strong> Description: </strong> ' + file.description + '<br>').appendTo($('#result'))
					$('<strong> Fecha: </strong> ' + file.creationdate + '<br>').appendTo($('#result'));
					$('<strong> Tamaño: </strong> ' + file.size + '<br>').appendTo($('#result'));
					$('<strong> Tags: </strong> ' + file.taglist + '<br>').appendTo($('#result'));
					$('<strong> URL: </strong> ' + file.url + '<br>').appendTo($('#result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
	});


}

function updateFile(file) {
	var url = API_BASE_URL + '/myapp/file/' + file.name;
	var data = JSON.stringify(file);
	$("#result").text('');
	$.ajax({
		url : url,
		type : 'PUT',
		crossDomain : true,
		dataType : 'json',
		contentType: "application/json; charset=utf-8", 
		data : data,
        statusCode: {
      200: function (response) {
         $('<div class="alert alert-success"> <strong>Ok!</strong> File Updated</div>').appendTo($("#result"))
      },
      202: function (response) {
         $('<div class="alert alert-success"> <strong>Ok!</strong> File Updated</div>').appendTo($("#result"))
      },
      400: function (response) {
         $('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
      },
      404: function (response) {
         $('<div class="alert alert-danger"> <strong>Oh!</strong> Server not found </div>').appendTo($("#result"));
      }
}});
}
    

function deleteFile(file_name) {
	var url = API_BASE_URL + '/myapp/file/' + file_name;
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'Delete',
		crossDomain : true,
		dataType : 'json',
        statusCode: {
      200: function (response) {
         $('<div class="alert alert-success"> <strong>Ok!</strong> File Deleted</div>').appendTo($("#result"))
      },
      202: function (response) {
         $('<div class="alert alert-success"> <strong>Ok!</strong> File Deleted</div>').appendTo($("#result"))
      },
      400: function (response) {
         $('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
      },
      404: function (response) {
         $('<div class="alert alert-danger"> <strong>Oh!</strong> Server not found </div>').appendTo($("#result"));
      }
	/*}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> File Deleted</div>').appendTo($("#result"))
	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> File not found </div>').appendTo($("#result"));
	});*/

        }})}

function FileCollection(fileCollection){
	this.files = fileCollection;
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
		$.each(this.files, function(i, v) {
			var file = v;
			console.log(file);
			html = html.concat('<br><strong> ID: ' + file.id + '</strong><br>');
            html = html.concat('<br><strong> Description: ' + file.description + '</strong><br>');
            html = html.concat('<br><strong> Creation Date: ' + file.creationdate + '</strong><br>');
            html = html.concat('<br><strong> TAGlist: ' + file.taglist + '</strong><br>');
            
             html = html.concat('<br><strong> URL: ' + file.url + '</strong><br>');
			
		});
		
		html = html.concat(' <br> ');

                var prev = this.getLink('prev');
		if (prev.length == 1) {
			console.log(prev[0].href);
			html = html.concat(' <a onClick="getFilesPagination(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Prev]</a> ');
		}
                var next = this.getLink('next');
		if (next.length == 1) {
			html = html.concat(' <a onClick="getFilesPagination(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Next]</a> ');
		}
 		return html;	
	}
}

function getFilesPagination(url) {
	$("#result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
        	var response = data.files;
		var fileCollection = new FileCollection(response);
                var linkHeader = jqxhr.getResponseHeader('Link');
                fileCollection.buildLinks(linkHeader);
				console.log(linkHeader);

		var html = fileCollection.toHTML();
		$("#result").html(html);

	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});

}
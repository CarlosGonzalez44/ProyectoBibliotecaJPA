/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint
$.libro={};
// Configuración del HOST y URL del servicio
$.libro.HOST = 'http://localhost:8084';
$.libro.URL = '/ProyectoFinal/webresources/com.iesvdc.acceso.entidades.libros';

$.libro.LibroReadREST = function() {
    
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Listado de Libros</h3>');
                $('#r_libro').append($('<div />').append('<button class="btn btn-primary" onclick="$.libro.FormLibroCreate()">Crear nuevo libro</button>'));
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>ISBN</th>', '<th>titulo</th>', '<th>autor</th>', '<th>Esta prestado</th>', '<th>Opciones</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    tbody.append($('<tr />').append(
                        '<td>' + json[clave].isbn + '</td>', 
                        '<td>' + json[clave].titulo + '</td>',
                        '<td>' + json[clave].autor + '</td>', 
                        '<td>' + json[clave].estaPrestado + '</td>',
                        '<td> <button value="'+json[clave].id+'" onclick="$.libro.FormLibroUpdate(this)">Actualizar</button><button value="'+json[clave].id+'"onclick="$.libro.LibroDeleteREST(this)">Eliminar</button></td>'
                    ));
                    
                                
                }
                table.append(tbody);

                $('#r_libro').append( $('<div />').append(table) );
                //$('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Error conectando al servidor</h3>');
                $('#r_libro').append('<p>Inténtelo más tarde</p>');
            }
        }); 
};
$.libro.FormLibroCreate = function(){
    $('#r_libro').empty();
    $('#r_libro').html('<h3>Crear nuevo libro:</h3>');
    var form = $('<form />').addClass('table');
    form.attr("id","formulario");
    var div = $('<div />').addClass('form-group');
    div.append('<label for="isbn">ISBN:</label>');
    div.append('<input id="isbn" type="text" class="form-control" required />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="titulo">Titulo:</label>');
    div.append('<input id="titulo" type="text" class="form-control" required />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="autor">Autor:</label>');
    div.append('<input id="autor" type="text" class="form-control" required />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<div class="btn btn-success" onclick="$.libro.LibroCreateREST()" > Aceptar </div>');
    form.append(div);
    
    $('#r_libro').append(form);
};
$.libro.LibroCreateREST = function(){
    var datos = {
        'isbn' : $("#isbn").val(),
        'titulo': $("#titulo").val(),
        'autor' : $("#autor").val(),
        'estaPrestado' : false
    };
    
    // comprobamos que en el formulario haya datos...
    if ( datos.isbn.length>2 && datos.titulo.length>2 && datos.autor.length>2) {
        $.ajax({
            url: $.libro.HOST+$.libro.URL,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.libro.LibroReadREST();
                $.afui.clearHistory();
                $.afui.loadContent("#r_libro",false,false,"up");
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('#r_libro').html('<h3>Error: Libro Create','No ha sido posible crear el libro. Compruebe su conexión.</h3>');
            }
        });
    }
    
};

$.libro.LibroDeleteREST = function(boton){
        
        var id = parseInt($(boton).val());
        $.ajax({
            url: $.libro.HOST+$.libro.URL+'/'+id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.libro.LibroReadREST();
                $.afui.clearHistory();
                $.afui.loadContent("#r_libro",false,false,"up");
            },
            error: function(jqXHR, textStatus, errorThrown){
                 $('#r_libro').clear();
                $('#r_libro').html('Error: Libro Delete','No ha sido posible borrar el libro. Compruebe su conexión.');
            }
        });    
    
};
$.libro.FormLibroUpdate = function(boton){
    
    var id = parseInt($(boton).val());
    
    $.ajax({
            url: this.HOST+this.URL+'/'+id,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) 
        {
            $('#r_libro').empty();
            $('#r_libro').html('<h3>Modificar libro:</h3>');
            var form = $('<form />').addClass('table');
            form.attr("id","formulario");
            var div = $('<div />').addClass('form-group');
            div.append('<label for="isbn">ISBN:</label>');
            div.append('<input id="isbn" value="'+ json.isbn+'" type="text" class="form-control" required />');
            form.append(div);
            div = $('<div />').addClass('form-group');
            div.append('<label for="titulo">Titulo:</label>');
            div.append('<input id="titulo" value="'+ json.titulo+'" type="text" class="form-control" required />');
            form.append(div);
            div = $('<div />').addClass('form-group');
            div.append('<label for="autor">Autor:</label>');
            div.append('<input id="autor" value="'+ json.autor+'" type="text" class="form-control" required />');
            form.append(div);
            div = $('<div />').addClass('form-group');
            div.append('<button onclick="$.libro.LibroUpdateREST(this)" value="'+ id+'" class="btn btn-success"> Aceptar </button>');
            form.append(div);

            $('#r_libro').append(form);
        }
    });
};
$.libro.LibroUpdateREST = function(boton){
        
    var id = parseInt($(boton).val());
    var datos = {
        'id': id,
        'isbn' : $("#isbn").val(),
        'titulo': $("#titulo").val(),
        'autor' : $("#autor").val(),
        'estaPrestado' : false
    };
    if ( datos.isbn.length>2 && datos.titulo.length>2 && datos.autor.length>2) {
        $.ajax({
            url: $.libro.HOST+$.libro.URL+'/'+id,
            type: 'PUT',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.libro.LibroReadREST();
                $.afui.clearHistory();
                $.afui.loadContent("#r_libro",false,false,"up");
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('#r_libro').html('<h3>Error: Libro Update','No ha sido posible actualizar el libro. Compruebe su conexión.</h3>');
            }
        });
    }
};

$.libro.error = function(title, msg){
    $('#err_libro').empty();
    $('#err_libro').append('<h3>'+title+'</h3>');
    $('#err_libro').append('<p>'+msg+'</p>');
    // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
    $.afui.clearHistory();
    // cargamos el panel con id r_alumno.
    $.afui.loadContent("#err_libro",false,false,"up");
};

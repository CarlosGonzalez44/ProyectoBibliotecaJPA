/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint
$.cliente={};
// Configuración del HOST y URL del servicio
$.cliente.HOST = 'http://localhost:8084';
$.cliente.URL = '/ProyectoFinal/webresources/com.iesvdc.acceso.entidades.clientes';

$.cliente.ClienteReadREST = function() {
    
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Listado de Clientes</h3>');
                $('#r_libro').append($('<div />').append('<button class="btn btn-primary" onclick="$.cliente.FormClienteCreate()">Crear nuevo cliente</button>'));
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>Nombre</th>', '<th>Apellidos</th>', '<th>Direccion</th>', '<th>Opciones</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    tbody.append($('<tr />').append(
                        '<td>' + json[clave].nombre + '</td>', 
                        '<td>' + json[clave].apellidos + '</td>',
                        '<td>' + json[clave].direccion + '</td>', 
                        '<td> <button value="'+json[clave].id+'" onclick="$.cliente.FormClienteUpdate(this)">Actualizar</button><button " value="'+json[clave].id+'"onclick="$.cliente.ClienteDeleteREST(this)">Eliminar</button></td>'
                    ));         
                }
                table.append(tbody);

                $('#r_libro').append( $('<div />').append(table) );
            },
            error: function (xhr, status) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Error conectando al servidor</h3>');
                $('#r_libro').append('<p>Inténtelo más tarde</p>');
            }
        }); 
};
$.cliente.FormClienteCreate = function(){
    $('#r_libro').empty();
    $('#r_libro').html('<h3>Crear nuevo cliente:</h3>');
    var form = $('<form />').addClass('table');
    form.attr("id","formulario");
    var div = $('<div />').addClass('form-group');
    div.append('<label for="nombre">Nombre:</label>');
    div.append('<input id="nombre" type="text" class="form-control" required />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellidos">Apellidos:</label>');
    div.append('<input id="apellidos" type="text" class="form-control" required />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="direccion">Direccion:</label>');
    div.append('<input id="direccion" type="text" class="form-control" required />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<div onclick="$.cliente.ClienteCreateREST()" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#r_libro').append(form);
};
$.cliente.ClienteCreateREST = function(){
    var datos = {
        'nombre' : $("#nombre").val(),
        'apellidos': $("#apellidos").val(),
        'direccion' : $("#direccion").val()
    };
    
    // comprobamos que en el formulario haya datos...
    if ( datos.nombre.length>2 && datos.apellidos.length>2 && datos.direccion.length>2) {
        $.ajax({
            url: $.cliente.HOST+$.cliente.URL,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.cliente.ClienteReadREST();
                $.afui.clearHistory();
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('#r_libro').html('<h3>Error: Cliente Create','No ha sido posible crear el cliente. Compruebe su conexión.</h3>');
            }
        });
        
    }
    
};

$.cliente.ClienteDeleteREST = function(boton){

        
        var id = parseInt($(boton).val());
        $.ajax({
            url: $.cliente.HOST+$.cliente.URL+'/'+id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.cliente.ClienteReadREST();
                // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
                $.afui.clearHistory();
            },
            error: function(jqXHR, textStatus, errorThrown){
                 $('#r_libro').clear();
                $('#r_libro').html('Error: Cliente delete','No ha sido posible borrar el cliente. Compruebe su conexión.');
            }
        });    
    
};
$.cliente.FormClienteUpdate = function(boton){
    
    var id = parseInt($(boton).val());
    
    $.ajax({
            url: this.HOST+this.URL+'/'+id,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) 
        {
            $('#r_libro').empty();
            $('#r_libro').html('<h3>Modificar cliente:</h3>');
            var form = $('<form />').addClass('table');
            form.attr("id","formulario");
            var div = $('<div />').addClass('form-group');
            div.append('<label for="nombre">Nombre</label>');
            div.append('<input id="nombre" value="'+ json.nombre+'" type="text" class="form-control" required />');
            form.append(div);
            div = $('<div />').addClass('form-group');
            div.append('<label for="apellidos">Apellidos:</label>');
            div.append('<input id="apellidos" value="'+ json.apellidos+'" type="text" class="form-control" required />');
            form.append(div);
            div = $('<div />').addClass('form-group');
            div.append('<label for="direccion">Direccion:</label>');
            div.append('<input id="direccion" value="'+ json.direccion+'" type="text" class="form-control" required />');
            form.append(div);
              
            div = $('<div />').addClass('form-group');
            div.append('<button onclick="$.cliente.ClienteUpdateREST(this)" value="'+ id+'" class="btn btn-success"> Aceptar </button');
            form.append(div);

            $('#r_libro').append(form);
        }
    });
};
$.cliente.ClienteUpdateREST = function(boton){
        
    var id = parseInt($(boton).val());
    var datos = {
        'id': id,
        'nombre' : $("#nombre").val(),
        'apellidos': $("#apellidos").val(),
        'direccion' : $("#direccion").val()
    };
    if ( datos.nombre.length>2 && datos.apellidos.length>2 && datos.direccion.length>2) {
        $.ajax({
            url: $.cliente.HOST+$.cliente.URL+'/'+id,
            type: 'PUT',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.cliente.ClienteReadREST();
                $.afui.clearHistory();
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('#r_libro').html('<h3>Error: Cliente update','No ha sido posible modificar el cliente. Compruebe su conexión.</h3>');
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

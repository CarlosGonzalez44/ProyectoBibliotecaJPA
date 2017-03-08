/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint


$.prestamo={};
$.prestamo.Clientes=[];
$.prestamo.Libros=[];
$.prestamo.HOST = 'http://localhost:8084';
$.prestamo.URL = '/ProyectoFinal/webresources/com.iesvdc.acceso.entidades.prestamos';

$.prestamo.PrestamoReadREST = function() {
    
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Listado de prestamos actuales</h3>');
                $('#r_libro').append($('<div />').append('<button class="btn btn-primary" onclick="$.prestamo.FormPrestamoCreate()">Crear nuevo prestamo</button>'));
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>ID</th>', '<th>Cliente</th>', '<th>Libro</th>', '<th>FechaInicio</th>','<th>FechaFin</th>', '<th>Opciones</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    var ff=json[clave].fechaFin.split("T");
                    var fi=json[clave].fechaInicio.split("T");
                    
                    tbody.append($('<tr />').append(
                        '<td>' + json[clave].id + '</td>', 
                        '<td>'+json[clave].idCliente.nombre+'</td>',
                        '<td>' + json[clave].idLibro.titulo+ '</td>', 
                        '<td>' + fi[0] + '</td>',
                        '<td>' + ff[0] + '</td>',
                        '<td> <button value="'+json[clave].id+'" onclick="$.prestamo.FormPrestamoUpdate(this)">Actualizar</button><button value="'+json[clave].id+'"onclick="$.prestamo.PrestamoDeleteREST(this)">Eliminar</button></td>'
                        
                    ));     
                }
                table.append(tbody);
                
                $('#r_libro').append( $('<div />').append(table) );
                $('#r_libro').append(maestroDetalle);
            },
            error: function (xhr, status) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Error conectando al servidor</h3>');
                $('#r_libro').append('<p>Inténtelo más tarde</p>');
            }
        }); 
};

$.prestamo.FormPrestamoCreate = function(){
    
    $.ajax({
            url: $.prestamo.HOST+'/ProyectoFinal/webresources/com.iesvdc.acceso.entidades.clientes',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $.prestamo.Clientes=json;
                $.ajax({
                    url: $.prestamo.HOST+'/ProyectoFinal/webresources/com.iesvdc.acceso.entidades.libros',
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (json) {
                        $.prestamo.Libros=json;
                        
                        $('#r_libro').empty();
                        $('#r_libro').html('<h3>Crear nuevo prestamo:</h3>');
                        var form = $('<form />').addClass('table');
                        form.attr("id","formulario");
                        var div = $('<div />').addClass('form-group');
                        div.append('<label for="fechaInicio">FechaInicio:</label>');
                        div.append('<input id="fechaInicio" type="date" class="form-control" required />');
                        form.append(div);
                        div = $('<div />').addClass('form-group');
                        div.append('<label for="fechaFin">FechaFin:</label>');
                        div.append('<input id="fechaFin" type="date" class="form-control" required />');
                        form.append(div);
                        
                        div = $('<div />').addClass('form-group');
                        div.append('<label for="cliente">Cliente:</label>');
                         var select= $('<select />').attr({"id":"cliente","class":"form-control"})
                         for (var clave in $.prestamo.Clientes) {

                              select.append('<option value="'+$.prestamo.Clientes[clave].id+'">'+$.prestamo.Clientes[clave].nombre+'</option>');
                         }

                        div.append(select)
                        form.append(div);
                        
                        div = $('<div />').addClass('form-group');
                        div.append('<label for="libros">Libros:</label>');
                         var select= $('<select />').attr({"id":"libros","class":"form-control"})
                         for (var clave in $.prestamo.Libros) {
                             if(!$.prestamo.Libros[clave].estaPrestado){
                                 select.append('<option value="'+$.prestamo.Libros[clave].id+'">'+$.prestamo.Libros[clave].titulo+'</option>');
                             }
                         }
                        div.append(select)
                        form.append(div);
                        
                        
                        div = $('<div />').addClass('form-group');
                        div.append('<div onclick="$.prestamo.PrestamoCreateREST()" class="btn btn-success"> Aceptar </div>');
                        form.append(div);

                        $('#r_libro').append(form);
                        
                    },
                    error: function (xhr, status) {
                        $('#r_libro').empty();
                        $('#r_libro').append('<h3>Error conectando al servidor</h3>');
                        $('#r_libro').append('<p>Inténtelo más tarde</p>');
                    }
                }); 
            },
            error: function (xhr, status) {
                $('#r_libro').empty();
                $('#r_libro').append('<h3>Error conectando al servidor</h3>');
                $('#r_libro').append('<p>Inténtelo más tarde</p>');
            }
        }); 
};
$.prestamo.PrestamoCreateREST = function(){
    
    var libros=[];
    var cliente={};
     for (var lib in $.prestamo.Libros) 
     {
         if($.prestamo.Libros[lib].id==$("#libros").val()){
             cliente=$.prestamo.Libros[lib];
         }
     }
    
     for (var cli in $.prestamo.Clientes) 
     {
         if($.prestamo.Clientes[cli].id==$("#cliente").val()){
             cliente=$.prestamo.Clientes[cli];
         }
     }
    
    var datos = {
        'fechaInicio' : "12-25-1992T00:00:00+00:00",
        'fechaFin':"12-25-1992T00:00:00+00:00",
        'idCliente' : cliente,
        'idLibro' : libros
    };
    
    // comprobamos que en el formulario haya datos...
    
        $.ajax({
            url: $.prestamo.HOST+$.prestamo.URL,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.prestamo.PrestamoReadREST();
                $.afui.clearHistory();
                $.afui.loadContent("#r_libro",false,false,"up");
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('#r_libro').html('<h3>Error: Prestamo Create','No ha sido posible crear el prestamo. Compruebe su conexión.</h3>');
            }
        });    
};

$.prestamo.PrestamoDeleteREST = function(boton){
        
        var id = parseInt($(boton).val());
        $.ajax({
            url: $.prestamo.HOST+$.prestamo.URL+'/'+id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            success: function(result,status,jqXHR ) {
                $.prestamo.PrestamoReadREST();
                $.afui.clearHistory();
                $.afui.loadContent("#r_libro",false,false,"up");

            },
            error: function(jqXHR, textStatus, errorThrown){
                 $('#r_libro').clear();
                $('#r_libro').html('Error: Prestamo Delete','No ha sido posible borrar el prestamo. Compruebe su conexión.');
            }
        });    
    
};


$.prestamo.error = function(title, msg){
    $('#err_libro').empty();
    $('#err_libro').append('<h3>'+title+'</h3>');
    $('#err_libro').append('<p>'+msg+'</p>');
    // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
    $.afui.clearHistory();
    // cargamos el panel con id r_alumno.
    $.afui.loadContent("#err_libro",false,false,"up");
};

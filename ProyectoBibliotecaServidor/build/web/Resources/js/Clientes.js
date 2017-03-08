/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
$("#clienteRead").click(function() {
        $('#main').html('<h3>Listado de clientes</h3>');
    });

/*function clienteRead() {
    $.ajax({
        url: "http://localhost:8080/ProyectoFinal/webresources/com.iesvdc.acceso.entidades.clientes",
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#main').html('<h3>Listado de clientes</h3>');
            var div=$('<div />').addClass('well');
            div.append('<a onclick="">Crear nuevo cliente</a>');
            $('#main').append(div);
            var div1=$('<div />').addClass('well');

            var table = $('<table />').addClass('table');
            table.append('<thead />').append($('<tr />').append('<th>Id</th>', '<th>Nombre</th>', '<th>Apellidos</th>', '<th>Direccion</th>', '<th>Opciones</th>'));
            var tbody = $('<tbody />').attr('id','tbody');
            for (var per in json) {
                tbody.append($('<tr />').append('<td>' + json[per].id + '</td>',
                    '<td>' + json[per].nombre + '</td>', '<td>' + json[per].apellidos + '</td>',
                    '<td>' + json[per].direccion + '</td>', 
                    '<td> <button class="btn btn-primary" value="'+json[per]._id+'" onclick="">Actualizar</button></td>',
                    '<td> <button class="btn btn-danger" value="'+json[per]._id+'" onclick="">Eliminar</button></td>'));
            }
            table.append(tbody);
            div1.append(table);
            $('#main').append(div1);
            
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
        }
    });
}*/


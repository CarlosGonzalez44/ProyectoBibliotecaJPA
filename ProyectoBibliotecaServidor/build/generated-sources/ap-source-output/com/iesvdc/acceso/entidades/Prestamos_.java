package com.iesvdc.acceso.entidades;

import com.iesvdc.acceso.entidades.Clientes;
import com.iesvdc.acceso.entidades.Libros;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-02-27T21:24:29")
@StaticMetamodel(Prestamos.class)
public class Prestamos_ { 

    public static volatile SingularAttribute<Prestamos, Libros> idLibro;
    public static volatile SingularAttribute<Prestamos, Clientes> idCliente;
    public static volatile SingularAttribute<Prestamos, Date> fechaInicio;
    public static volatile SingularAttribute<Prestamos, Integer> id;
    public static volatile SingularAttribute<Prestamos, Date> fechaFin;

}
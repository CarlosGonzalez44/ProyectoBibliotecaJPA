package com.iesvdc.acceso.entidades;

import com.iesvdc.acceso.entidades.Prestamos;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-02-27T21:24:29")
@StaticMetamodel(Libros.class)
public class Libros_ { 

    public static volatile SingularAttribute<Libros, Boolean> estaPrestado;
    public static volatile CollectionAttribute<Libros, Prestamos> prestamosCollection;
    public static volatile SingularAttribute<Libros, String> isbn;
    public static volatile SingularAttribute<Libros, String> titulo;
    public static volatile SingularAttribute<Libros, Integer> id;
    public static volatile SingularAttribute<Libros, String> autor;

}
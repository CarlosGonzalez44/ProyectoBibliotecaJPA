create database libreria;
use libreria;

CREATE TABLE IF NOT EXISTS libros (
id INTEGER NOT NULL AUTO_INCREMENT,
ISBN VARCHAR(15) NOT NULL UNIQUE,
titulo VARCHAR(50) NOT NULL,
autor VARCHAR(50) NOT NULL,
esta_prestado boolean NOT NULL,
CONSTRAINT PK_libros PRIMARY KEY (id)
) CHARSET=utf8;

CREATE TABLE IF NOT EXISTS clientes (
id INTEGER NOT NULL AUTO_INCREMENT,
nombre VARCHAR(15) NOT NULL,
apellidos VARCHAR(50) NOT NULL,
direccion VARCHAR(50) NOT NULL,
CONSTRAINT PK_clientes PRIMARY KEY (id)
) CHARSET=utf8;
 drop table prestamos;
CREATE TABLE IF NOT EXISTS prestamos (
id INTEGER NOT NULL AUTO_INCREMENT,
idCliente INTEGER NOT NULL,
idLibro INTEGER NOT NULL,
fecha_inicio date not null,
fecha_fin date not null,
-- fecha_inicio datetime NOT NULL,
-- fecha_fin datetime NOT NULL,
CONSTRAINT PK_prestamos PRIMARY KEY (id),
CONSTRAINT FK_libros FOREIGN KEY (idLibro) REFERENCES libros(id),
CONSTRAINT FK_clientes FOREIGN KEY (idCliente) REFERENCES clientes(id)
) CHARSET=utf8;

INSERT INTO libros (id,ISBN,titulo,autor,esta_prestado)
VALUES
(1,'0764526413','libro1','desconocido',false),
(2,'5426354189','libro2','desconocido',false),
(3,'1269844896','libro3','desconocido',false),
(4,'1348827649','libro4','desconocido',false);

INSERT INTO clientes (id,nombre,apellidos,direccion)
VALUES
(1,'n1','ape1','dire1'),
(2,'n2','ape2','dire2'),
(3,'n3','ape3','dire3'),
(4,'n4','ape4','dire4');

INSERT INTO prestamos (id,idCliente,idLibro,fecha_inicio,fecha_fin)
VALUES
(1,1,1,'1995-10-10','1995-10-10');

INSERT INTO prestamos (id,idCliente,idLibro,fecha_inicio,fecha_fin)
VALUES
(2,2,3,'1995-10-10','1995-10-10');

create user 'admin'@'localhost' identified by 'admin';
grant all on libreria.* to 'admin'@'localhost';

select * from clientes;
select * from prestamos;
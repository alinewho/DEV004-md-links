# Markdown Links por @aline_who

## Índice

* [1. Introducción](#1-introducción)
* [2. Comandos](#2-comandos)

***

## 1. Introducción

Este es un proyecto que a través de una línea de comando, puede analizar archivos Markdown (md) en busca de links. 
Te preguntarás ¿para qué me sirve que se analicen los links?
Generalmente la documentación importante está escrita en formato md y contiene variedad de links que te llevan a distintas páginas web que son fundamentales para transmitir la información, lo que quiere decir que mucha de información útil está almacenada en estos documentos. 
Los links que contiene pueden haberse roto o ya no funcionar. Saber el estado de estos links nos permite actualizarlos o eliminarlos según sea el caso. 

Esta herramienta de línea de comando puede darte información sobre **la cantidad de links que contiene el archivo**, **cantidad de links únicos**, y **los links rotos**, así como más información que estará descrita más adelante

## 2. Comandos


Con `node <index.js> <la ruta del archivo que quieres analizar> ` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

##### `--validate`

Con `node <index.js> <la ruta del archivo que quieres analizar> --validate` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.


##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```


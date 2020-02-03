# python_ckan
Aplicación desarrollada en python para la obtención de datasets libres bajo el uso del api de ckan

## Aplicación de consumo de datos
### Librerías necesarias para ejecutar la obtención de datos:
1. json (Libreria para la manipulación de archivos json)
2. time (Libreria para mediciones de tiempo de ejecución del programa)
3. ckanapi (Api de ckan para el consumo de datasets)
```
pip install ckanapi
```
4. termcolor
```
pip install termcolor
```

## Servicio API-REST en FLASK
### Librerías necesarias para ejecutar el servicio:
1. flask (Microframework para el montaje del servicio)
```
pip install Flask
```
2. flask_restful (Extención de Flask para implementar un servicio rest)
```
pip install flask-restful
```
3. flask_cors (Extencion de Flask para permitir CORS para el servicio)
```
pip install flask-cors
```

### Ejecución:
Para la ejecución del servicio rest para el consumo local de datasets.

**En el directorio flask_data_server correr el archivo app.py.**
```
python app.py
```
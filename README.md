# Proyecto_Geolocalizacion_Bancos

Este proyecto es una app que permite por medio de google map saber tu localización, la hubicación de las ATM (Cajeros automáticos) y ademas que camino agarrar para llegar a el.

## Tecnologías

-Ionic 3
-Angular 5

## Api
- API de google map (para el mapa)
  https://developers.google.com/maps/documentation/?hl=es
  https://github.com/ionic-team/ionic-native-google-maps/blob/master/documents/README.md
  
- API de here (para los place)
  https://developer.here.com/documentation/places/topics/request-constructing.html

- API de open (para las direction)
  https://developer.mapquest.com/documentation/open/


## Instalación
 
 ```
 git clone https://github.com/kevob1994/Proyecto_Geolocalizacion_Bancos.git
 
 npm install
 
 ionic cordova remove platform android
 
 ionic cordova add platform android
 
 **Configuración para que le permita visualizar el mapa de google maps (SOLO EN CASO DE NO VISUALIZAR EL MAPA )**
 ionic cordova plugin add cordova-plugin-googlemaps \
  --variable API_KEY_FOR_ANDROID="AIzaSyAfLbbgvyDcAZCQTwvrAzRPiSuPnQeCPjw" \
  --variable API_KEY_FOR_IOS="AIzaSyAfLbbgvyDcAZCQTwvrAzRPiSuPnQeCPjw"
  
 ionic cordova run android --device
 ```
 ## Tener en cuenta
 
 - Esta aplicación no se puede visualizar en ningun browser ya que trabaja con plugins nativos que solo los teléfonos tienen.
 - Si la versión de android es vieja, no se visualizara el google map ya que no es compatible (Se verá en blanco).
 - Si la key de google map no es la correcta tampoco se visualizara el mapa.
 - Las keys con las que trabajo las api para places y directions son gratuitas, es decir que tienen limites en la cantidad de llamadas.

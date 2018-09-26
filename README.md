# Proyecto_Geolocalizacion_Bancos

Este proyecto es una app que permite por medio de google map saber tu localización, la hubicación de las ATM (Cajeros automáticos) y ademas que camino agarrar para llegar a el. Al darle al botón en el login donde dice Ubicaciones te lleva a la pagina donde se mostrará tu ubicación de rojo y los cajeros automáticos cercanos a ti, al presionar algún cajero se abre un modal que te muestra como llegar a ese cajero y para ir al cajero le das click al cajero nuevamente (estando dentro del modal) y te mostrará una ventana que dice "Ir", al presionar esa ventana se cierra el modal y te lleva a las coordenadas de ese cajero.

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
 
 - Al probar esta app, las llamadas de las API dependerán de la velocidad del internet, en caso de que tarde mucho en mostrarse los puntos ATM (los cajeros automaticos) esperar.
 - Esta aplicación no se puede visualizar en ningun browser ya que trabaja con plugins nativos que solo los teléfonos tienen.
 - Si la versión de android es vieja, no se visualizara el google map ya que no es compatible (Se verá en blanco).
 - Si la key de google map no es la correcta tampoco se visualizara el mapa.
 - Las keys con las que trabajo las api para places y directions son gratuitas, es decir que tienen limites en la cantidad de llamadas.

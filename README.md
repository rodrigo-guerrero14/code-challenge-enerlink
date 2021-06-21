# 👨‍💻 Code Challenge de Enerlink

Para el desafío se realizó una aplicación web en donde se interactua con una API entregada por Enerlink a través de una funcion fetch, en donde se reciben los datos de la Base de datos de la api, se generan nuevos datos, actualización y eliminacion de estos mismos.

Para el desarrollo de este proyecto se asumieron 2 casos puntuales
- Fecha: al realizar la peticion fetch de la base de datos, el primer y único valor de este no tiene una fecha del día, la cual es necesaria para establecer el elemento dentro del horario, por lo cual cuando se carga en el front este mismo tomará la fecha del día de hoy a traves de una función.
- Tiempos establecidos: no se ha especificado en el desafio si tendran un horario permitido, por lo cual me tome la libertad de establecer cierto horario el cual se establece en: 06:00 am - 22:00 pm

## ✨ Tecnologías
- React
- Create react app
- CSS Vanilla
- useState
- useEffect
- Custom Hooks
- Fullcalendar
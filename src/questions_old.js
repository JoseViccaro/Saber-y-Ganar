const MASTER_QUESTIONS = [
    {
        "question": "¿Cuál es el río más largo del mundo?",
        "answers": [
            "Amazonas",
            "Nilo",
            "Misisipi",
            "Yangtsé"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién escribió 'Don Quijote de la Mancha'?",
        "answers": [
            "García Márquez",
            "Shakespeare",
            "Homero",
            "Miguel de Cervantes"
        ],
        "correct": 3
    },
    {
        "question": "¿En qué continente se encuentra Egipto?",
        "answers": [
            "Asia",
            "África",
            "Europa",
            "Oceanía"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el océano más grande del mundo?",
        "answers": [
            "Atlántico",
            "Índico",
            "Pacífico",
            "Ártico"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué planeta es conocido como el 'Planeta Rojo'?",
        "answers": [
            "Júpiter",
            "Marte",
            "Venus",
            "Saturno"
        ],
        "correct": 1
    },
    {
        "question": "La Mona Lisa fue pintada por...",
        "answers": [
            "Van Gogh",
            "Picasso",
            "Leonardo da Vinci",
            "Monet"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es la capital de Australia?",
        "answers": [
            "Sídney",
            "Melbourne",
            "Canberra",
            "Perth"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué gas es esencial para que respiremos?",
        "answers": [
            "Nitrógeno",
            "CO2",
            "Hidrógeno",
            "Oxígeno"
        ],
        "correct": 3
    },
    {
        "question": "¿Quién fue el primer hombre en pisar la Luna?",
        "answers": [
            "Yuri Gagarin",
            "Buzz Aldrin",
            "Michael Collins",
            "Neil Armstrong"
        ],
        "correct": 3
    },
    {
        "question": "¿En qué año comenzó la Segunda Guerra Mundial?",
        "answers": [
            "1914",
            "1939",
            "1945",
            "1929"
        ],
        "correct": 1
    },
    {
        "question": "La Gran Muralla China fue construida para protegerse de...",
        "answers": [
            "Los japoneses",
            "Los mongoles",
            "Los rusos",
            "Los coreanos"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué instrumento musical tiene 88 teclas?",
        "answers": [
            "Guitarra",
            "Violín",
            "Piano",
            "Batería"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el país con más habitantes del mundo?",
        "answers": [
            "China",
            "India",
            "Estados Unidos",
            "Indonesia"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué animal es un mamífero y puede volar?",
        "answers": [
            "Pingüino",
            "Avestruz",
            "Murciélago",
            "Pez volador"
        ],
        "correct": 2
    },
    {
        "question": "¿Quién es el autor de 'El Principito'?",
        "answers": [
            "J.K. Rowling",
            "Antoine de Saint-Exupéry",
            "Roald Dahl",
            "C.S. Lewis"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es la montaña más alta del mundo?",
        "answers": [
            "K2",
            "Mont Blanc",
            "Everest",
            "Aconcagua"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué civilización construyó las pirámides de Giza?",
        "answers": [
            "Griegos",
            "Romanos",
            "Persas",
            "Egipcios"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué es la Vía Láctea?",
        "answers": [
            "Un planeta",
            "Una estrella",
            "Nuestra galaxia",
            "Un cometa"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el hueso más largo del cuerpo humano?",
        "answers": [
            "Tibia",
            "Fémur",
            "Húmero",
            "Peroné"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué superhéroe de DC Comics es conocido como el 'Hombre de Acero'?",
        "answers": [
            "Batman",
            "Flash",
            "Superman",
            "Aquaman"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el ingrediente principal del guacamole?",
        "answers": [
            "Tomate",
            "Aguacate",
            "Cebolla",
            "Limón"
        ],
        "correct": 1
    },
    {
        "question": "¿En qué ciudad se encuentra el Coliseo Romano?",
        "answers": [
            "Atenas",
            "París",
            "Londres",
            "Roma"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál de estos instrumentos es de viento-madera?",
        "answers": [
            "Trompeta",
            "Trombón",
            "Clarinete",
            "Violín"
        ],
        "correct": 2
    },
    {
        "question": "La serie de libros de 'Harry Potter' fue escrita por...",
        "answers": [
            "Suzanne Collins",
            "J.R.R. Tolkien",
            "George R.R. Martin",
            "J.K. Rowling"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué es la fotosíntesis?",
        "answers": [
            "La respiración de los animales",
            "La forma en que las plantas hacen su comida",
            "La evaporación del agua",
            "La formación de rocas"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué país tiene forma de bota?",
        "answers": [
            "Grecia",
            "Italia",
            "Chile",
            "Noruega"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién es considerado el 'Rey del Pop'?",
        "answers": [
            "Elvis Presley",
            "Michael Jackson",
            "Freddie Mercury",
            "Frank Sinatra"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué es un Tsunami?",
        "answers": [
            "Un tornado de agua",
            "Una serie de olas gigantes",
            "Una tormenta eléctrica",
            "Un terremoto en tierra"
        ],
        "correct": 1
    },
    {
        "question": "La Estatua de la Libertad fue un regalo de ¿qué país a EE.UU.?",
        "answers": [
            "Reino Unido",
            "España",
            "Alemania",
            "Francia"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuántos corazones tiene un pulpo?",
        "answers": [
            "Uno",
            "Dos",
            "Tres",
            "Cuatro"
        ],
        "correct": 2
    },
    {
        "question": "¿En qué país se originaron los Juegos Olímpicos?",
        "answers": [
            "Italia",
            "Egipto",
            "China",
            "Grecia"
        ],
        "correct": 3
    },
    {
        "question": "El personaje 'Sherlock Holmes' fue creado por...",
        "answers": [
            "Agatha Christie",
            "Arthur Conan Doyle",
            "Edgar Allan Poe",
            "Julio Verne"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el desierto más grande y cálido del mundo?",
        "answers": [
            "Gobi",
            "Atacama",
            "Kalahari",
            "Sahara"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es la capital de Canadá?",
        "answers": [
            "Toronto",
            "Vancouver",
            "Montreal",
            "Ottawa"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué elemento químico tiene el símbolo 'Au'?",
        "answers": [
            "Plata",
            "Argón",
            "Oro",
            "Aluminio"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué deporte practica profesionalmente Rafael Nadal?",
        "answers": [
            "Fútbol",
            "Baloncesto",
            "Tenis",
            "Golf"
        ],
        "correct": 2
    },
    {
        "question": "¿Cómo se llama el proceso de convertir un líquido en gas?",
        "answers": [
            "Condensación",
            "Solidificación",
            "Fusión",
            "Evaporación"
        ],
        "correct": 3
    },
    {
        "question": "¿En qué ciudad está la famosa ópera 'La Scala'?",
        "answers": [
            "Viena",
            "París",
            "Milán",
            "Praga"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el animal terrestre más rápido?",
        "answers": [
            "León",
            "Tigre",
            "Guepardo",
            "Leopardo"
        ],
        "correct": 2
    },
    {
        "question": "¿Quién pintó 'El Guernica'?",
        "answers": [
            "Salvador Dalí",
            "Frida Kahlo",
            "Diego Rivera",
            "Pablo Picasso"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuántos jugadores tiene un equipo de fútbol en el campo?",
        "answers": [
            "9",
            "10",
            "11",
            "12"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué tipo de animal es la ballena?",
        "answers": [
            "Pez",
            "Mamífero",
            "Anfibio",
            "Reptil"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el libro sagrado del Islam?",
        "answers": [
            "La Torá",
            "La Biblia",
            "El Corán",
            "El Tripitaka"
        ],
        "correct": 2
    },
    {
        "question": "El Sol es una...",
        "answers": [
            "Estrella",
            "Planeta",
            "Galaxia",
            "Nebulosa"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la lengua más hablada en el mundo?",
        "answers": [
            "Inglés",
            "Español",
            "Chino Mandarín",
            "Hindi"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué Beatle fue asesinado en 1980?",
        "answers": [
            "Paul McCartney",
            "George Harrison",
            "Ringo Starr",
            "John Lennon"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué significan las siglas 'ADN'?",
        "answers": [
            "Ácido Desoxirribonucleico",
            "Amida de Nitrógeno",
            "Análisis Directo Numérico",
            "Azúcar de Naranja"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué famoso científico desarrolló la teoría de la relatividad?",
        "answers": [
            "Isaac Newton",
            "Galileo Galilei",
            "Albert Einstein",
            "Nikola Tesla"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el color que resulta de mezclar azul y amarillo?",
        "answers": [
            "Rojo",
            "Naranja",
            "Marrón",
            "Verde"
        ],
        "correct": 3
    },
    {
        "question": "¿En qué continente está la selva del Amazonas?",
        "answers": [
            "Asia",
            "África",
            "América del Sur",
            "Australia"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el océano más pequeño del mundo?",
        "answers": [
            "Pacífico",
            "Atlántico",
            "Índico",
            "Ártico"
        ],
        "correct": 3
    },
    {
        "question": "¿En qué año llegó Cristóbal Colón a América?",
        "answers": [
            "1502",
            "1498",
            "1492",
            "1488"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el único mamífero que no puede saltar?",
        "answers": [
            "Rinoceronte",
            "Hipopótamo",
            "Jirafa",
            "Elefante"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué país es el mayor productor de café del mundo?",
        "answers": [
            "Colombia",
            "Vietnam",
            "Etiopía",
            "Brasil"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué famoso pintor se cortó una oreja?",
        "answers": [
            "Monet",
            "Van Gogh",
            "Gauguin",
            "Cézanne"
        ],
        "correct": 1
    },
    {
        "question": "La Torre Eiffel se encuentra en...",
        "answers": [
            "Londres",
            "Roma",
            "Berlín",
            "París"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el animal que más muertes humanas causa al año?",
        "answers": [
            "Tiburón",
            "Serpiente",
            "León",
            "Mosquito"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es la capital de Japón?",
        "answers": [
            "Kioto",
            "Osaka",
            "Tokio",
            "Hiroshima"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué elemento químico tiene el símbolo 'Fe'?",
        "answers": [
            "Fósforo",
            "Flúor",
            "Francio",
            "Hierro"
        ],
        "correct": 3
    },
    {
        "question": "¿Quién escribió 'Cien años de soledad'?",
        "answers": [
            "Mario Vargas Llosa",
            "Gabriel García Márquez",
            "Julio Cortázar",
            "Pablo Neruda"
        ],
        "correct": 1
    },
    {
        "question": "¿En qué año cayó el Muro de Berlín?",
        "answers": [
            "1987",
            "1989",
            "1991",
            "1993"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el metal más ligero?",
        "answers": [
            "Aluminio",
            "Titanio",
            "Litio",
            "Magnesio"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué es un 'lustro'?",
        "answers": [
            "Un periodo de 5 años",
            "Un periodo de 10 años",
            "Un periodo de 50 años",
            "Un periodo de 100 años"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el país más grande del mundo por superficie?",
        "answers": [
            "China",
            "Canadá",
            "Estados Unidos",
            "Rusia"
        ],
        "correct": 3
    },
    {
        "question": "¿Quién dirigió la película 'Pulp Fiction'?",
        "answers": [
            "Martin Scorsese",
            "Steven Spielberg",
            "Quentin Tarantino",
            "James Cameron"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el nombre del proceso por el cual las plantas convierten la luz solar en energía?",
        "answers": [
            "Respiración celular",
            "Transpiración",
            "Fotosíntesis",
            "Germinación"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué famoso artista es conocido por sus 'latas de sopa Campbell'?",
        "answers": [
            "Jackson Pollock",
            "Andy Warhol",
            "Roy Lichtenstein",
            "Jean-Michel Basquiat"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es la capital de Argentina?",
        "answers": [
            "Santiago",
            "Bogotá",
            "Buenos Aires",
            "Lima"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué gas de efecto invernadero es el más abundante en la atmósfera terrestre?",
        "answers": [
            "Dióxido de carbono",
            "Metano",
            "Óxido nitroso",
            "Vapor de agua"
        ],
        "correct": 3
    },
    {
        "question": "¿En qué deporte se utiliza un 'birdie'?",
        "answers": [
            "Tenis",
            "Bádminton",
            "Golf",
            "Críquet"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el nombre del primer satélite artificial lanzado al espacio?",
        "answers": [
            "Explorer 1",
            "Vanguard 1",
            "Sputnik 1",
            "Luna 1"
        ],
        "correct": 2
    },
    {
        "question": "¿Quién es el autor de la saga de libros 'El Señor de los Anillos'?",
        "answers": [
            "C.S. Lewis",
            "George R.R. Martin",
            "J.K. Rowling",
            "J.R.R. Tolkien"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el punto más bajo de la Tierra?",
        "answers": [
            "Fosa de las Marianas",
            "Valle de la Muerte",
            "Mar Muerto",
            "Depresión de Danakil"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué instrumento tocaba Jimi Hendrix?",
        "answers": [
            "Batería",
            "Bajo",
            "Guitarra",
            "Teclado"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es la moneda oficial del Reino Unido?",
        "answers": [
            "Euro",
            "Dólar",
            "Libra esterlina",
            "Franco"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué civilización antigua es famosa por sus acueductos?",
        "answers": [
            "Griegos",
            "Egipcios",
            "Persas",
            "Romanos"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el planeta más grande de nuestro sistema solar?",
        "answers": [
            "Saturno",
            "Júpiter",
            "Neptuno",
            "Urano"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién pintó la 'Noche Estrellada'?",
        "answers": [
            "Claude Monet",
            "Pablo Picasso",
            "Vincent van Gogh",
            "Salvador Dalí"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el animal nacional de la India?",
        "answers": [
            "Elefante",
            "León",
            "Tigre de Bengala",
            "Pavo real"
        ],
        "correct": 2
    },
    {
        "question": "¿En qué país se encuentra el Taj Mahal?",
        "answers": [
            "Pakistán",
            "India",
            "Bangladés",
            "Nepal"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el componente principal del Sol?",
        "answers": [
            "Oxígeno",
            "Carbono",
            "Hidrógeno",
            "Helio"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué famoso dramaturgo escribió 'Romeo y Julieta'?",
        "answers": [
            "Christopher Marlowe",
            "Ben Jonson",
            "William Shakespeare",
            "John Webster"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el desierto más frío del mundo?",
        "answers": [
            "Gobi",
            "Patagónico",
            "Antártico",
            "Ártico"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué es un 'origami'?",
        "answers": [
            "Un tipo de comida japonesa",
            "Un arte marcial",
            "El arte de doblar papel",
            "Un estilo de caligrafía"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es la capital de Sudáfrica?",
        "answers": [
            "Johannesburgo",
            "Ciudad del Cabo",
            "Durban",
            "Pretoria"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué banda de rock británica lanzó el álbum 'The Dark Side of the Moon'?",
        "answers": [
            "The Beatles",
            "Led Zeppelin",
            "Pink Floyd",
            "Queen"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el órgano más grande del cuerpo humano?",
        "answers": [
            "Hígado",
            "Cerebro",
            "Intestino",
            "Piel"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el símbolo químico del agua?",
        "answers": [
            "Ag",
            "O2",
            "H2O",
            "Au"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué planeta es el más cercano al Sol?",
        "answers": [
            "Venus",
            "Tierra",
            "Mercurio",
            "Marte"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es la velocidad de la luz?",
        "answers": [
            "300,000 km/s",
            "150,000 km/s",
            "500,000 km/s",
            "1,000,000 km/s"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué tipo de energía se obtiene del viento?",
        "answers": [
            "Solar",
            "Hidráulica",
            "Geotérmica",
            "Eólica"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el metal más abundante en la corteza terrestre?",
        "answers": [
            "Hierro",
            "Aluminio",
            "Cobre",
            "Plomo"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué estudia la entomología?",
        "answers": [
            "Peces",
            "Aves",
            "Insectos",
            "Plantas"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el ácido presente en los limones?",
        "answers": [
            "Ácido acético",
            "Ácido cítrico",
            "Ácido sulfúrico",
            "Ácido clorhídrico"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué es la penicilina?",
        "answers": [
            "Un analgésico",
            "Un antibiótico",
            "Una vitamina",
            "Una hormona"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuántos huesos tiene un ser humano adulto?",
        "answers": [
            "206",
            "210",
            "200",
            "212"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la hematología?",
        "answers": [
            "El estudio de la sangre",
            "El estudio de los huesos",
            "El estudio de los músculos",
            "El estudio de los nervios"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué año se descubrió América?",
        "answers": [
            "1492",
            "1500",
            "1488",
            "1512"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue el primer emperador romano?",
        "answers": [
            "Julio César",
            "Augusto",
            "Nerón",
            "Calígula"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué guerra duró 100 años?",
        "answers": [
            "La Guerra de los Cien Años",
            "La Primera Guerra Mundial",
            "La Segunda Guerra Mundial",
            "La Guerra de Vietnam"
        ],
        "correct": 0
    },
    {
        "question": "¿Dónde se originó la civilización azteca?",
        "answers": [
            "Perú",
            "México",
            "Egipto",
            "Grecia"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién fue Juana de Arco?",
        "answers": [
            "Una reina de Inglaterra",
            "Una santa y heroína francesa",
            "Una escritora famosa",
            "Una pintora renacentista"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué evento marcó el inicio de la Edad Media?",
        "answers": [
            "La caída del Imperio Romano",
            "El descubrimiento de América",
            "La invención de la imprenta",
            "La Revolución Francesa"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue el líder de la Reforma Protestante?",
        "answers": [
            "Martín Lutero",
            "Juan Calvino",
            "Enrique VIII",
            "Ignacio de Loyola"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué país se encuentra la ciudad de Petra?",
        "answers": [
            "Egipto",
            "Jordania",
            "Siria",
            "Irak"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué faraón egipcio es famoso por su tumba intacta?",
        "answers": [
            "Ramsés II",
            "Cleopatra",
            "Tutankamón",
            "Akenatón"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué fue el Renacimiento?",
        "answers": [
            "Un movimiento artístico y cultural",
            "Una guerra religiosa",
            "Una crisis económica",
            "Una pandemia"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el desierto más grande del mundo?",
        "answers": [
            "El Sahara",
            "El Gobi",
            "El de Atacama",
            "El Antártico"
        ],
        "correct": 3
    },
    {
        "question": "¿En qué país se encuentra el Monte Fuji?",
        "answers": [
            "China",
            "Corea del Sur",
            "Japón",
            "Vietnam"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es la capital de Rusia?",
        "answers": [
            "San Petersburgo",
            "Moscú",
            "Kiev",
            "Varsovia"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué río pasa por París?",
        "answers": [
            "El Támesis",
            "El Danubio",
            "El Sena",
            "El Tíber"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el país más poblado de África?",
        "answers": [
            "Nigeria",
            "Egipto",
            "Sudáfrica",
            "Etiopía"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué cordillera se encuentra el Aconcagua?",
        "answers": [
            "En los Alpes",
            "En los Andes",
            "En el Himalaya",
            "En las Montañas Rocosas"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es la isla más grande del mundo?",
        "answers": [
            "Groenlandia",
            "Australia",
            "Borneo",
            "Madagascar"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué país es conocido como la 'Tierra del Sol Naciente'?",
        "answers": [
            "China",
            "Japón",
            "Corea del Sur",
            "Tailandia"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es la capital de Brasil?",
        "answers": [
            "Río de Janeiro",
            "São Paulo",
            "Brasilia",
            "Salvador"
        ],
        "correct": 2
    },
    {
        "question": "¿En qué continente se encuentra la Patagonia?",
        "answers": [
            "En América del Sur",
            "En África",
            "En Australia",
            "En Asia"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién escribió 'Cien años de soledad'?",
        "answers": [
            "Gabriel García Márquez",
            "Mario Vargas Llosa",
            "Julio Cortázar",
            "Pablo Neruda"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién pintó 'La última cena'?",
        "answers": [
            "Miguel Ángel",
            "Rafael",
            "Leonardo da Vinci",
            "Donatello"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué escritor es famoso por sus novelas de misterio con Hércules Poirot?",
        "answers": [
            "Arthur Conan Doyle",
            "Agatha Christie",
            "Edgar Allan Poe",
            "Raymond Chandler"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién es el autor de 'El viejo y el mar'?",
        "answers": [
            "Ernest Hemingway",
            "William Faulkner",
            "John Steinbeck",
            "F. Scott Fitzgerald"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué movimiento artístico representa Salvador Dalí?",
        "answers": [
            "Cubismo",
            "Impresionismo",
            "Surrealismo",
            "Expresionismo"
        ],
        "correct": 2
    },
    {
        "question": "¿Quién escribió 'La Divina Comedia'?",
        "answers": [
            "Dante Alighieri",
            "Petrarca",
            "Boccaccio",
            "Maquiavelo"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué banda de rock es conocida como 'Sus Satánicas Majestades'?",
        "answers": [
            "The Beatles",
            "The Rolling Stones",
            "Led Zeppelin",
            "Queen"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién compuso 'Las cuatro estaciones'?",
        "answers": [
            "Mozart",
            "Bach",
            "Beethoven",
            "Vivaldi"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué película ganó el primer Óscar a la Mejor Película?",
        "answers": [
            "Alas",
            "Lo que el viento se llevó",
            "Casablanca",
            "El mago de Oz"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién es el autor de la escultura 'El Pensador'?",
        "answers": [
            "Miguel Ángel",
            "Donatello",
            "Rodin",
            "Bernini"
        ],
        "correct": 2
    },
    {
        "question": "¿En qué año se estrenó la primera película de Star Wars?",
        "answers": [
            "1977",
            "1980",
            "1983",
            "1975"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién interpreta a Iron Man en el Universo Cinematográfico de Marvel?",
        "answers": [
            "Chris Evans",
            "Chris Hemsworth",
            "Mark Ruffalo",
            "Robert Downey Jr."
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el nombre del protagonista de la serie 'Breaking Bad'?",
        "answers": [
            "Jesse Pinkman",
            "Saul Goodman",
            "Walter White",
            "Gus Fring"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué videojuego es considerado el más vendido de la historia?",
        "answers": [
            "Tetris",
            "Minecraft",
            "Grand Theft Auto V",
            "Super Mario Bros."
        ],
        "correct": 1
    },
    {
        "question": "¿Quién es la cantante conocida como la 'Reina del Pop'?",
        "answers": [
            "Madonna",
            "Beyoncé",
            "Rihanna",
            "Lady Gaga"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué serie de televisión tiene como lema 'Winter is Coming'?",
        "answers": [
            "The Walking Dead",
            "Breaking Bad",
            "Game of Thrones",
            "Stranger Things"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué actor ha interpretado a James Bond en más películas?",
        "answers": [
            "Sean Connery",
            "Roger Moore",
            "Daniel Craig",
            "Pierce Brosnan"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el nombre del parque de atracciones de dinosaurios en 'Jurassic Park'?",
        "answers": [
            "Isla Nublar",
            "Isla Sorna",
            "Parque Jurásico",
            "Mundo Jurásico"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué director de cine es conocido por películas como 'Tiburón', 'E.T.' y 'La lista de Schindler'?",
        "answers": [
            "Martin Scorsese",
            "Francis Ford Coppola",
            "Steven Spielberg",
            "Quentin Tarantino"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué personaje de dibujos animados vive en una piña debajo del mar?",
        "answers": [
            "Mickey Mouse",
            "Bugs Bunny",
            "Bob Esponja",
            "Homer Simpson"
        ],
        "correct": 2
    },
    {
        "question": "¿En qué país se inventó el fútbol?",
        "answers": [
            "Brasil",
            "Argentina",
            "Inglaterra",
            "España"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuántos anillos de la NBA tiene Michael Jordan?",
        "answers": [
            "5",
            "6",
            "7",
            "8"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué tenista ha ganado más torneos de Grand Slam?",
        "answers": [
            "Roger Federer",
            "Rafael Nadal",
            "Novak Djokovic",
            "Pete Sampras"
        ],
        "correct": 2
    },
    {
        "question": "¿En qué deporte destaca Usain Bolt?",
        "answers": [
            "Natación",
            "Atletismo",
            "Gimnasia",
            "Ciclismo"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el equipo de fútbol con más Champions League?",
        "answers": [
            "FC Barcelona",
            "AC Milan",
            "Liverpool FC",
            "Real Madrid"
        ],
        "correct": 3
    },
    {
        "question": "¿Cómo se llama el estadio del FC Barcelona?",
        "answers": [
            "Santiago Bernabéu",
            "Camp Nou",
            "Wanda Metropolitano",
            "San Mamés"
        ],
        "correct": 1
    },
    {
        "question": "¿En qué país se celebraron los primeros Juegos Olímpicos de la era moderna?",
        "answers": [
            "Grecia",
            "Francia",
            "Reino Unido",
            "Estados Unidos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué boxeador es conocido como 'The Greatest'?",
        "answers": [
            "Mike Tyson",
            "Muhammad Ali",
            "Floyd Mayweather",
            "Manny Pacquiao"
        ],
        "correct": 1
    },
    {
        "question": "¿En qué consiste un 'hat-trick' en el fútbol?",
        "answers": [
            "Marcar 2 goles en un partido",
            "Marcar 3 goles en un partido",
            "Marcar 4 goles en un partido",
            "Marcar 5 goles en un partido"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué selección de fútbol ha ganado más Copas del Mundo?",
        "answers": [
            "Alemania",
            "Italia",
            "Argentina",
            "Brasil"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el animal que tiene tres corazones?",
        "answers": [
            "El pulpo",
            "La sepia",
            "El calamar",
            "Todos los anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿De qué color es la sangre de los insectos?",
        "answers": [
            "Roja",
            "Azul",
            "Verde",
            "Amarillenta"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el único mamífero capaz de volar?",
        "answers": [
            "La ardilla voladora",
            "El murciélago",
            "El colugo",
            "El petauro del azúcar"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuántos dientes tiene un caracol?",
        "answers": [
            "Ninguno",
            "Unos pocos",
            "Cientos",
            "Miles"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el animal más ruidoso del mundo?",
        "answers": [
            "La ballena azul",
            "El elefante",
            "El mono aullador",
            "El camarón pistola"
        ],
        "correct": 3
    },
    {
        "question": "¿Por qué los flamencos son rosas?",
        "answers": [
            "Por su genética",
            "Por su alimentación",
            "Porque se tiñen",
            "Es un misterio"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el animal con la mordida más fuerte?",
        "answers": [
            "El tiburón blanco",
            "El cocodrilo de agua salada",
            "La hiena",
            "El hipopótamo"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuánto tiempo puede vivir una medusa?",
        "answers": [
            "Unos días",
            "Unos meses",
            "Unos años",
            "Algunas son inmortales"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el animal que duerme más horas al día?",
        "answers": [
            "El perezoso",
            "El koala",
            "El gato",
            "El murciélago"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué animal tiene la lengua más larga en proporción a su cuerpo?",
        "answers": [
            "El oso hormiguero",
            "El camaleón",
            "El murciélago néctar",
            "El picaflor"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es la capital de Turquía?",
        "answers": [
            "Estambul",
            "Ankara",
            "Izmir",
            "Bursa"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué famoso científico propuso las tres leyes del movimiento?",
        "answers": [
            "Albert Einstein",
            "Galileo Galilei",
            "Isaac Newton",
            "Nikola Tesla"
        ],
        "correct": 2
    },
    {
        "question": "¿En qué país se encuentra la Torre de Pisa?",
        "answers": [
            "Francia",
            "Italia",
            "España",
            "Grecia"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el libro más vendido de la historia?",
        "answers": [
            "Don Quijote de la Mancha",
            "La Biblia",
            "El Señor de los Anillos",
            "Harry Potter y la piedra filosofal"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué es un archipiélago?",
        "answers": [
            "Una cadena de montañas",
            "Un conjunto de islas",
            "Un tipo de relieve",
            "Un río subterráneo"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién pintó el techo de la Capilla Sixtina?",
        "answers": [
            "Leonardo da Vinci",
            "Rafael",
            "Miguel Ángel",
            "Tiziano"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el idioma oficial de Brasil?",
        "answers": [
            "Español",
            "Portugués",
            "Inglés",
            "Francés"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué es la aurora boreal?",
        "answers": [
            "Un fenómeno meteorológico",
            "Un tipo de estrella",
            "Un efecto óptico en la atmósfera",
            "Una constelación"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el metal más caro del mundo?",
        "answers": [
            "Oro",
            "Platino",
            "Rodio",
            "Paladio"
        ],
        "correct": 2
    },
    {
        "question": "¿Quién fue el primer ser humano en viajar al espacio?",
        "answers": [
            "Neil Armstrong",
            "Yuri Gagarin",
            "Buzz Aldrin",
            "John Glenn"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué es la fisión nuclear?",
        "answers": [
            "La unión de dos átomos",
            "La división de un átomo",
            "La creación de un átomo",
            "La destrucción de un átomo"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el planeta más caliente del sistema solar?",
        "answers": [
            "Mercurio",
            "Venus",
            "Marte",
            "Júpiter"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué es el número de Avogadro?",
        "answers": [
            "El número de átomos en un mol",
            "El número de planetas en el sistema solar",
            "La velocidad del sonido",
            "La constante de Planck"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la clonación?",
        "answers": [
            "La creación de una copia genética",
            "La modificación de un gen",
            "La secuenciación del ADN",
            "La terapia génica"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la materia oscura?",
        "answers": [
            "Una forma de materia que no emite luz",
            "Un tipo de agujero negro",
            "Una estrella de neutrones",
            "Una galaxia enana"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la antimateria?",
        "answers": [
            "Una partícula con carga opuesta",
            "Una partícula sin carga",
            "Una partícula más pesada",
            "Una partícula más ligera"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es el bosón de Higgs?",
        "answers": [
            "Una partícula que da masa a otras partículas",
            "Una partícula que transmite la fuerza nuclear fuerte",
            "Una partícula que transmite la fuerza nuclear débil",
            "Una partícula que transmite la fuerza electromagnética"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la teoría de cuerdas?",
        "answers": [
            "Una teoría que unifica la relatividad y la mecánica cuántica",
            "Una teoría que describe el origen del universo",
            "Una teoría que explica la materia oscura",
            "Una teoría que predice la existencia de universos paralelos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es un exoplaneta?",
        "answers": [
            "Un planeta fuera de nuestro sistema solar",
            "Un planeta enano",
            "Un planeta gaseoso",
            "Un planeta rocoso"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la biotecnología?",
        "answers": [
            "La aplicación de la tecnología a los seres vivos",
            "El estudio de la vida en otros planetas",
            "La creación de vida artificial",
            "La modificación del clima"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue la Ruta de la Seda?",
        "answers": [
            "Una red de rutas comerciales",
            "Una campaña militar",
            "Un movimiento religioso",
            "Una exploración científica"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue Alejandro Magno?",
        "answers": [
            "Un rey de Macedonia que conquistó un gran imperio",
            "Un filósofo griego",
            "Un emperador romano",
            "Un faraón egipcio"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue la Peste Negra?",
        "answers": [
            "Una pandemia que asoló Europa en el siglo XIV",
            "Una guerra entre Inglaterra y Francia",
            "Una crisis económica en el Imperio Romano",
            "Una rebelión campesina en China"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue la Ilustración?",
        "answers": [
            "Un movimiento intelectual que enfatizaba la razón",
            "Un estilo artístico del siglo XVIII",
            "Una reforma religiosa en el siglo XVI",
            "Una revolución política en el siglo XVII"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue la Guerra Fría?",
        "answers": [
            "Un enfrentamiento político e ideológico entre EEUU y la URSS",
            "Una guerra mundial que involucró a todas las potencias",
            "Un conflicto armado en la península de Corea",
            "Una carrera espacial entre EEUU y la URSS"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue Nelson Mandela?",
        "answers": [
            "Un activista contra el apartheid y presidente de Sudáfrica",
            "Un líder de los derechos civiles en Estados Unidos",
            "Un primer ministro de la India",
            "Un secretario general de las Naciones Unidas"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue el Imperio Otomano?",
        "answers": [
            "Un imperio que controló gran parte del sudeste de Europa, Asia occidental y el norte de África",
            "Un imperio que se extendió por toda la península ibérica",
            "Un imperio que dominó el subcontinente indio",
            "Un imperio que unificó China"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue la Revolución Industrial?",
        "answers": [
            "Un proceso de profundas transformaciones económicas y sociales",
            "Una rebelión de los trabajadores contra los dueños de las fábricas",
            "Una guerra por el control de las colonias",
            "Un descubrimiento científico que cambió el mundo"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue Gengis Kan?",
        "answers": [
            "El fundador del Imperio Mongol",
            "Un emperador de China",
            "Un sultán de Egipto",
            "Un rey de Persia"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue el Apartheid?",
        "answers": [
            "Un sistema de segregación racial en Sudáfrica",
            "Un movimiento por los derechos de las mujeres",
            "Una política de expansión territorial",
            "Una doctrina religiosa"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el lago más profundo del mundo?",
        "answers": [
            "El lago Baikal",
            "El lago Tanganica",
            "El lago Superior",
            "El mar Caspio"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la cascada más alta del mundo?",
        "answers": [
            "El Salto Ángel",
            "Las cataratas del Niágara",
            "Las cataratas de Iguazú",
            "Las cataratas Victoria"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el volcán más activo del mundo?",
        "answers": [
            "El Kilauea",
            "El Etna",
            "El Stromboli",
            "El Monte Fuji"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el país con más volcanes?",
        "answers": [
            "Indonesia",
            "Japón",
            "Estados Unidos",
            "Chile"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el río más caudaloso del mundo?",
        "answers": [
            "El Amazonas",
            "El Congo",
            "El Orinoco",
            "El Paraná"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el país con más islas?",
        "answers": [
            "Suecia",
            "Finlandia",
            "Canadá",
            "Indonesia"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la ciudad más poblada del mundo?",
        "answers": [
            "Tokio",
            "Delhi",
            "Shanghái",
            "São Paulo"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el país más pequeño del mundo?",
        "answers": [
            "Mónaco",
            "Nauru",
            "Tuvalu",
            "Ciudad del Vaticano"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el país con más fronteras terrestres?",
        "answers": [
            "Rusia",
            "China",
            "Brasil",
            "Alemania"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el punto más alejado del centro de la Tierra?",
        "answers": [
            "El Monte Everest",
            "El Chimborazo",
            "El K2",
            "El Aconcagua"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién escribió 'El retrato de Dorian Gray'?",
        "answers": [
            "Oscar Wilde",
            "Charles Dickens",
            "Jane Austen",
            "George Orwell"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué pintor es considerado el padre del cubismo junto a Georges Braque?",
        "answers": [
            "Pablo Picasso",
            "Salvador Dalí",
            "Joan Miró",
            "Juan Gris"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué novela comienza con la frase 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme...'?",
        "answers": [
            "Don Quijote de la Mancha",
            "La Celestina",
            "El Lazarillo de Tormes",
            "El Buscón"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién es el autor de la famosa escultura 'David'?",
        "answers": [
            "Miguel Ángel",
            "Donatello",
            "Bernini",
            "Cellini"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué banda británica es conocida como los 'Fab Four'?",
        "answers": [
            "The Beatles",
            "The Rolling Stones",
            "The Who",
            "Queen"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién escribió la obra de teatro 'La vida es sueño'?",
        "answers": [
            "Lope de Vega",
            "Calderón de la Barca",
            "Tirso de Molina",
            "Miguel de Cervantes"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué artista es famoso por sus 'Móviles'?",
        "answers": [
            "Alexander Calder",
            "Jean Arp",
            "Henry Moore",
            "Constantin Brancusi"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué libro de J.R.R. Tolkien precede a 'El Señor de los Anillos'?",
        "answers": [
            "El Hobbit",
            "El Silmarillion",
            "Los hijos de Húrin",
            "Cuentos inconclusos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué director de cine es famoso por sus películas de 'spaghetti western'?",
        "answers": [
            "Sergio Leone",
            "Federico Fellini",
            "Luchino Visconti",
            "Vittorio De Sica"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién es la autora de la saga de novelas 'Los juegos del hambre'?",
        "answers": [
            "Suzanne Collins",
            "J.K. Rowling",
            "Stephenie Meyer",
            "Veronica Roth"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué película de Disney fue la primera en ser lanzada en formato VHS?",
        "answers": [
            "Blancanieves y los siete enanitos",
            "Pinocho",
            "Fantasía",
            "Dumbo"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del actor que interpreta a Harry Potter?",
        "answers": [
            "Daniel Radcliffe",
            "Rupert Grint",
            "Tom Felton",
            "Matthew Lewis"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué grupo de rock es famoso por su canción 'Bohemian Rhapsody'?",
        "answers": [
            "Queen",
            "Led Zeppelin",
            "Pink Floyd",
            "The Beatles"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué videojuego aparece el personaje de Lara Croft?",
        "answers": [
            "Tomb Raider",
            "Uncharted",
            "The Last of Us",
            "Resident Evil"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué serie de televisión trata sobre un profesor de química que se convierte en narcotraficante?",
        "answers": [
            "Breaking Bad",
            "The Wire",
            "Los Soprano",
            "Narcos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué actor interpretó al Joker en la película 'El Caballero Oscuro'?",
        "answers": [
            "Heath Ledger",
            "Jack Nicholson",
            "Jared Leto",
            "Joaquin Phoenix"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del mundo mágico en la saga de Harry Potter?",
        "answers": [
            "Hogwarts",
            "El Mundo Mágico",
            "El Callejón Diagon",
            "El Ministerio de Magia"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué película de Quentin Tarantino está dividida en capítulos no cronológicos?",
        "answers": [
            "Pulp Fiction",
            "Reservoir Dogs",
            "Kill Bill",
            "Bastardos sin gloria"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué personaje de Nintendo es un fontanero italiano?",
        "answers": [
            "Mario",
            "Luigi",
            "Wario",
            "Waluigi"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué cantante es conocida como la 'Princesa del Pop'?",
        "answers": [
            "Britney Spears",
            "Christina Aguilera",
            "Jessica Simpson",
            "Mandy Moore"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué deporte se utiliza un 'puck'?",
        "answers": [
            "Hockey sobre hielo",
            "Hockey sobre hierba",
            "Polo",
            "Lacrosse"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuántos jugadores hay en un equipo de baloncesto en la cancha?",
        "answers": [
            "5",
            "6",
            "7",
            "11"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué país ganó la primera Copa del Mundo de la FIFA en 1930?",
        "answers": [
            "Uruguay",
            "Argentina",
            "Brasil",
            "Italia"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué ciudad se celebran los torneos de tenis de Wimbledon?",
        "answers": [
            "Londres",
            "París",
            "Nueva York",
            "Melbourne"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué ciclista ha ganado más Tours de Francia?",
        "answers": [
            "Lance Armstrong",
            "Miguel Induráin",
            "Eddy Merckx",
            "Bernard Hinault"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el récord mundial de los 100 metros lisos masculinos?",
        "answers": [
            "9.58 segundos",
            "9.69 segundos",
            "9.72 segundos",
            "9.79 segundos"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué deporte se conoce a Babe Ruth como una leyenda?",
        "answers": [
            "Béisbol",
            "Fútbol americano",
            "Baloncesto",
            "Hockey sobre hielo"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué arte marcial es originario de Corea?",
        "answers": [
            "Taekwondo",
            "Karate",
            "Judo",
            "Kung Fu"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el evento principal del Super Bowl?",
        "answers": [
            "El partido de fútbol americano",
            "El espectáculo de medio tiempo",
            "Los anuncios publicitarios",
            "La ceremonia de premiación"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué nadador ha ganado más medallas de oro olímpicas?",
        "answers": [
            "Michael Phelps",
            "Mark Spitz",
            "Ian Thorpe",
            "Ryan Lochte"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único país que tiene una Biblia en su bandera?",
        "answers": [
            "República Dominicana",
            "El Vaticano",
            "Israel",
            "Grecia"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el animal que no puede sacar la lengua?",
        "answers": [
            "El cocodrilo",
            "La serpiente",
            "La tortuga",
            "El lagarto"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el alimento que no se estropea?",
        "answers": [
            "La miel",
            "El azúcar",
            "La sal",
            "El arroz"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el color más raro de ojos en los humanos?",
        "answers": [
            "Verde",
            "Ámbar",
            "Violeta",
            "Gris"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único músculo que está unido solo por un extremo?",
        "answers": [
            "La lengua",
            "El corazón",
            "El diafragma",
            "El bíceps"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el objeto más fabricado del mundo?",
        "answers": [
            "Los coches",
            "Los teléfonos móviles",
            "Las monedas",
            "Los ladrillos LEGO"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el único número que no se puede representar en números romanos?",
        "answers": [
            "0",
            "1000",
            "1000000",
            "No hay"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único planeta que gira en sentido horario?",
        "answers": [
            "Venus",
            "Urano",
            "Neptuno",
            "Plutón"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único mamífero que pone huevos?",
        "answers": [
            "El ornitorrinco",
            "El equidna",
            "Ambos",
            "Ninguno"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el único alimento que tiene todos los nutrientes que el ser humano necesita?",
        "answers": [
            "La leche materna",
            "El huevo",
            "La quinoa",
            "La espirulina"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la capital de Nueva Zelanda?",
        "answers": [
            "Auckland",
            "Wellington",
            "Christchurch",
            "Queenstown"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién es el autor de la novela '1984'?",
        "answers": [
            "George Orwell",
            "Aldous Huxley",
            "Ray Bradbury",
            "Philip K. Dick"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué país se encuentra el desierto de Gobi?",
        "answers": [
            "China y Mongolia",
            "Rusia y Kazajistán",
            "India y Pakistán",
            "Irán y Afganistán"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la moneda oficial de Suiza?",
        "answers": [
            "Euro",
            "Franco suizo",
            "Libra esterlina",
            "Dólar estadounidense"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué es la UNESCO?",
        "answers": [
            "La Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura",
            "La Organización Mundial de la Salud",
            "El Fondo Monetario Internacional",
            "La Organización Mundial del Comercio"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue la primera mujer en ganar un Premio Nobel?",
        "answers": [
            "Marie Curie",
            "Irène Joliot-Curie",
            "Dorothy Hodgkin",
            "Gerty Cori"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el océano que rodea la Antártida?",
        "answers": [
            "Océano Antártico",
            "Océano Atlántico",
            "Océano Pacífico",
            "Océano Índico"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es el sintoísmo?",
        "answers": [
            "La religión tradicional de Japón",
            "Una filosofía china",
            "Un sistema político de la India",
            "Una forma de arte de Corea"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el edificio más alto del mundo?",
        "answers": [
            "Burj Khalifa",
            "Torre de Shanghái",
            "Abraj Al-Bait",
            "Ping An Finance Center"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién es el actual rey de España?",
        "answers": [
            "Felipe VI",
            "Juan Carlos I",
            "Alfonso XIII",
            "Felipe V"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la tabla periódica?",
        "answers": [
            "Una tabla que organiza los elementos químicos",
            "Una tabla que muestra las fases de la luna",
            "Una tabla que predice el clima",
            "Una tabla que calcula las mareas"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es un agujero negro?",
        "answers": [
            "Una región del espacio con una gravedad tan fuerte que nada puede escapar",
            "Una estrella que ha agotado su combustible",
            "Una galaxia sin estrellas",
            "Un planeta sin atmósfera"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es el efecto invernadero?",
        "answers": [
            "Un fenómeno por el cual ciertos gases retienen el calor en la atmósfera",
            "Un proceso que enfría la Tierra",
            "Un ciclo que renueva el aire",
            "Un campo magnético que protege de la radiación"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la relatividad general?",
        "answers": [
            "Una teoría de la gravedad desarrollada por Einstein",
            "Una teoría sobre el origen del universo",
            "Una teoría que describe las partículas subatómicas",
            "Una teoría que explica la luz"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es un virus?",
        "answers": [
            "Un agente infeccioso que se replica dentro de las células",
            "Una bacteria que causa enfermedades",
            "Un hongo que crece en los alimentos",
            "Un parásito que vive en los intestinos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la evolución?",
        "answers": [
            "El proceso por el cual las especies cambian a lo largo del tiempo",
            "La idea de que todos los seres vivos fueron creados al mismo tiempo",
            "La teoría de que la vida se originó en otro planeta",
            "El estudio de los fósiles"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la fotosíntesis?",
        "answers": [
            "El proceso por el cual las plantas convierten la luz solar en energía",
            "La forma en que los animales respiran",
            "La manera en que los hongos se reproducen",
            "El ciclo del agua en la naturaleza"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es el ADN?",
        "answers": [
            "La molécula que contiene la información genética",
            "La proteína que transporta el oxígeno en la sangre",
            "La enzima que digiere los alimentos",
            "La hormona que regula el crecimiento"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la Vía Láctea?",
        "answers": [
            "Nuestra galaxia",
            "Un cúmulo de estrellas",
            "Una nebulosa planetaria",
            "Un sistema solar vecino"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué es la inteligencia artificial?",
        "answers": [
            "La simulación de la inteligencia humana en las máquinas",
            "La capacidad de los ordenadores para aprender sin ser programados",
            "El desarrollo de robots que pueden pensar y sentir",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué fue la civilización maya?",
        "answers": [
            "Una civilización mesoamericana que destacó por su escritura y su arte",
            "Una civilización andina que construyó Machu Picchu",
            "Una civilización egipcia que construyó las pirámides",
            "Una civilización griega que inventó la democracia"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue la Reforma Protestante?",
        "answers": [
            "Un movimiento religioso que dividió el cristianismo occidental",
            "Una reforma política que limitó el poder de los reyes",
            "Una reforma económica que introdujo el capitalismo",
            "Una reforma social que abolió la esclavitud"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue la Revolución Rusa?",
        "answers": [
            "Un movimiento que derrocó al zar y estableció la Unión Soviética",
            "Una guerra civil que enfrentó a los bolcheviques y los mencheviques",
            "Una rebelión campesina que exigía pan, paz y tierra",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué fue la Gran Depresión?",
        "answers": [
            "Una profunda crisis económica mundial que comenzó en 1929",
            "Una sequía que afectó a las llanuras de Estados Unidos",
            "Una pandemia que mató a millones de personas",
            "Una guerra que devastó Europa"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué fue el Holocausto?",
        "answers": [
            "El genocidio de seis millones de judíos por parte de los nazis",
            "Un programa de eutanasia para eliminar a los discapacitados",
            "La persecución y el asesinato de gitanos, homosexuales y otros grupos",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué fue el movimiento por los derechos civiles en Estados Unidos?",
        "answers": [
            "Una lucha por la igualdad de derechos para los afroamericanos",
            "Una campaña para poner fin a la segregación racial en las escuelas",
            "Una serie de protestas no violentas lideradas por Martin Luther King Jr.",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué fue la caída del Muro de Berlín?",
        "answers": [
            "Un evento que simbolizó el fin de la Guerra Fría",
            "La reunificación de Alemania Oriental y Occidental",
            "La apertura de las fronteras entre el bloque comunista y el occidental",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué fue el Renacimiento de Harlem?",
        "answers": [
            "Un florecimiento de la cultura afroamericana en Nueva York",
            "Un movimiento literario, artístico y musical",
            "Una expresión de orgullo y resistencia contra el racismo",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué fue la Prohibición en Estados Unidos?",
        "answers": [
            "Un período en el que la venta de alcohol era ilegal",
            "Una ley que pretendía reducir el crimen y la corrupción",
            "Una enmienda a la Constitución que fue finalmente derogada",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué fue el escándalo de Watergate?",
        "answers": [
            "Un escándalo político que llevó a la dimisión del presidente Nixon",
            "Un robo en la sede del Partido Demócrata",
            "Un encubrimiento por parte de la Casa Blanca",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el estrecho que separa Asia de América?",
        "answers": [
            "El estrecho de Bering",
            "El estrecho de Gibraltar",
            "El estrecho de Magallanes",
            "El canal de Suez"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la capital de la India?",
        "answers": [
            "Nueva Delhi",
            "Bombay",
            "Calcuta",
            "Bangalore"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué país se encuentra el Kilimanjaro?",
        "answers": [
            "Tanzania",
            "Kenia",
            "Uganda",
            "Etiopía"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el lago más grande de América del Sur?",
        "answers": [
            "El lago Titicaca",
            "El lago de Maracaibo",
            "El lago de Valencia",
            "El lago Argentino"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la capital de Egipto?",
        "answers": [
            "El Cairo",
            "Alejandría",
            "Luxor",
            "Asuán"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué continente se encuentra el desierto del Kalahari?",
        "answers": [
            "África",
            "Asia",
            "Australia",
            "América del Sur"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la capital de Tailandia?",
        "answers": [
            "Bangkok",
            "Chiang Mai",
            "Phuket",
            "Pattaya"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el río que forma la frontera entre México y Estados Unidos?",
        "answers": [
            "El río Bravo",
            "El río Colorado",
            "El río Misisipi",
            "El río Misuri"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la capital de Vietnam?",
        "answers": [
            "Hanói",
            "Ho Chi Minh",
            "Da Nang",
            "Hué"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué país se encuentra la ciudad de Dubái?",
        "answers": [
            "Emiratos Árabes Unidos",
            "Arabia Saudita",
            "Catar",
            "Omán"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién escribió 'Matar a un ruiseñor'?",
        "answers": [
            "Harper Lee",
            "Truman Capote",
            "Flannery O'Connor",
            "William Faulkner"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué pintor holandés es famoso por sus autorretratos?",
        "answers": [
            "Rembrandt",
            "Vermeer",
            "Hals",
            "Steen"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué novela de Fiódor Dostoyevski explora la psicología de un asesino?",
        "answers": [
            "Crimen y castigo",
            "Los hermanos Karamázov",
            "El idiota",
            "Los demonios"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién es el autor de la sinfonía 'Heroica'?",
        "answers": [
            "Ludwig van Beethoven",
            "Wolfgang Amadeus Mozart",
            "Franz Joseph Haydn",
            "Franz Schubert"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué movimiento literario se asocia con autores como Jack Kerouac y Allen Ginsberg?",
        "answers": [
            "La Generación Beat",
            "La Generación Perdida",
            "El Modernismo",
            "El Postmodernismo"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién escribió la obra de teatro 'Un tranvía llamado Deseo'?",
        "answers": [
            "Tennessee Williams",
            "Arthur Miller",
            "Eugene O'Neill",
            "Edward Albee"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué artista pop es famoso por sus serigrafías de Marilyn Monroe?",
        "answers": [
            "Andy Warhol",
            "Roy Lichtenstein",
            "Keith Haring",
            "Jean-Michel Basquiat"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué libro de Lewis Carroll narra las aventuras de una niña en un mundo fantástico?",
        "answers": [
            "Alicia en el país de las maravillas",
            "A través del espejo",
            "La caza del Snark",
            "Silvia y Bruno"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué director de cine es conocido por sus películas de suspense como 'Psicosis' y 'Los pájaros'?",
        "answers": [
            "Alfred Hitchcock",
            "Orson Welles",
            "Stanley Kubrick",
            "Billy Wilder"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién es el autor de la canción 'Like a Rolling Stone'?",
        "answers": [
            "Bob Dylan",
            "The Beatles",
            "The Rolling Stones",
            "Jimi Hendrix"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué película de 2001 de Stanley Kubrick presenta a un superordenador llamado HAL 9000?",
        "answers": [
            "2001: Una odisea del espacio",
            "La naranja mecánica",
            "El resplandor",
            "Barry Lyndon"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del fontanero verde, hermano de Mario?",
        "answers": [
            "Luigi",
            "Wario",
            "Waluigi",
            "Toad"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué banda de rock irlandesa es liderada por el vocalista Bono?",
        "answers": [
            "U2",
            "The Cranberries",
            "Thin Lizzy",
            "The Script"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué serie de televisión un grupo de amigos pasa el rato en una cafetería llamada Central Perk?",
        "answers": [
            "Friends",
            "Seinfeld",
            "Cómo conocí a vuestra madre",
            "The Big Bang Theory"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué actor interpretó a Forrest Gump?",
        "answers": [
            "Tom Hanks",
            "Robin Williams",
            "Bill Murray",
            "John Travolta"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del león protagonista de 'El Rey León'?",
        "answers": [
            "Simba",
            "Mufasa",
            "Scar",
            "Nala"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué programa de televisión presenta a concursantes que compiten en desafíos de cocina?",
        "answers": [
            "MasterChef",
            "Top Chef",
            "Hell's Kitchen",
            "The Great British Bake Off"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué videojuego de rol de acción de mundo abierto fue desarrollado por CD Projekt Red?",
        "answers": [
            "The Witcher 3: Wild Hunt",
            "Cyberpunk 2077",
            "The Elder Scrolls V: Skyrim",
            "Fallout 4"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué director de cine es conocido por sus películas de animación stop-motion como 'El extraño mundo de Jack' y 'Coraline'?",
        "answers": [
            "Henry Selick",
            "Tim Burton",
            "Wes Anderson",
            "Laika"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué cantante es conocida como la 'Reina del Soul'?",
        "answers": [
            "Aretha Franklin",
            "Etta James",
            "Nina Simone",
            "Billie Holiday"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué deporte se utiliza una 'bola 8'?",
        "answers": [
            "Billar",
            "Bolos",
            "Petanca",
            "Curling"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuántos hoyos tiene un campo de golf estándar?",
        "answers": [
            "18",
            "9",
            "27",
            "36"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué país es famoso por su equipo de rugby, los All Blacks?",
        "answers": [
            "Nueva Zelanda",
            "Australia",
            "Sudáfrica",
            "Inglaterra"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué ciudad se encuentra el estadio de Wembley?",
        "answers": [
            "Londres",
            "Mánchester",
            "Liverpool",
            "Birmingham"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué piloto de carreras es conocido como 'El Doctor'?",
        "answers": [
            "Valentino Rossi",
            "Marc Márquez",
            "Jorge Lorenzo",
            "Casey Stoner"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del trofeo que se entrega al ganador del Abierto de Francia de tenis?",
        "answers": [
            "La Copa de los Mosqueteros",
            "El Trofeo Norman Brookes",
            "La Copa Davis",
            "El Trofeo del Centenario"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué deporte se destaca Michael Jordan?",
        "answers": [
            "Baloncesto",
            "Béisbol",
            "Fútbol americano",
            "Golf"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué equipo de fútbol es conocido como los 'Red Devils'?",
        "answers": [
            "Manchester United",
            "Liverpool",
            "Arsenal",
            "Chelsea"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del torneo de golf más antiguo del mundo?",
        "answers": [
            "El Abierto Británico",
            "El Masters de Augusta",
            "El Abierto de Estados Unidos",
            "El Campeonato de la PGA"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué país ha ganado más Copas del Mundo de Críquet?",
        "answers": [
            "Australia",
            "India",
            "Indias Occidentales",
            "Pakistán"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único animal que no puede saltar?",
        "answers": [
            "El elefante",
            "El rinoceronte",
            "El hipopótamo",
            "La jirafa"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único mamífero que puede volar?",
        "answers": [
            "El murciélago",
            "La ardilla voladora",
            "El colugo",
            "El petauro del azúcar"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único continente sin desiertos?",
        "answers": [
            "Europa",
            "América del Norte",
            "América del Sur",
            "Australia"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único país que es también un continente?",
        "answers": [
            "Australia",
            "Groenlandia",
            "La Antártida",
            "Islandia"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único animal que tiene la cabeza en el corazón?",
        "answers": [
            "El camarón",
            "La gamba",
            "El langostino",
            "Todos los anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el único metal que es líquido a temperatura ambiente?",
        "answers": [
            "El mercurio",
            "El galio",
            "El cesio",
            "El francio"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único país del mundo cuyo nombre empieza por 'Y' en español?",
        "answers": [
            "Yemen",
            "Yibuti",
            "Yugoslavia",
            "No hay"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el único mamífero que no tiene estómago?",
        "answers": [
            "El ornitorrinco",
            "El equidna",
            "El perezoso",
            "El armadillo"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único órgano del cuerpo humano que flota en el agua?",
        "answers": [
            "El pulmón",
            "El hígado",
            "El bazo",
            "El riñón"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único número que tiene el mismo número de letras que su valor?",
        "answers": [
            "Cinco",
            "Cuatro",
            "Tres",
            "Seis"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué cultura ibérica es famosa por su escultura, la Dama de Elche?",
        "answers": [
            "La cultura íbera",
            "La cultura celta",
            "La cultura tartésica",
            "La cultura fenicia"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué ciudad actual fue la más importante para los cartagineses en la península ibérica?",
        "answers": [
            "Cartagena",
            "Cádiz",
            "Ibiza",
            "Málaga"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué ciudad fue conquistada por los romanos en el año 133 a.C.?",
        "answers": [
            "Numancia",
            "Sagunto",
            "Cartago Nova",
            "Gades"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué batalla marcó el final del reino visigodo?",
        "answers": [
            "La batalla de Guadalete",
            "La batalla de Covadonga",
            "La batalla de las Navas de Tolosa",
            "La batalla de Simancas"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué siglo comenzó la Reconquista?",
        "answers": [
            "En el siglo VIII",
            "En el siglo IX",
            "En el siglo X",
            "En el siglo XI"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué batalla marcó el inicio de la Reconquista?",
        "answers": [
            "La batalla de Covadonga",
            "La batalla de Roncesvalles",
            "La batalla de Guadalete",
            "La batalla de Clavijo"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué rey castellano fomentó la Escuela de Traductores de Toledo?",
        "answers": [
            "Alfonso X el Sabio",
            "Fernando III el Santo",
            "Sancho IV el Bravo",
            "Alfonso VIII de Castilla"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué reyes efectuaron la unión dinástica en España a finales del siglo XV?",
        "answers": [
            "Los Reyes Católicos",
            "Los Austrias",
            "Los Borbones",
            "Los Trastámara"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué tratado puso fin a la Guerra de Sucesión Española?",
        "answers": [
            "El Tratado de Utrecht",
            "El Tratado de Tordesillas",
            "La Paz de Westfalia",
            "El Tratado de los Pirineos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué dinastía comenzó a reinar en España con Felipe V?",
        "answers": [
            "La Dinastía Borbónica",
            "La Dinastía de los Austrias",
            "La Dinastía de los Trastámara",
            "La Dinastía de los Saboya"
        ],
        "correct": 0
    },
    {
        "question": "¿Desde qué ciudad trasladó la capitalidad a Madrid Felipe II?",
        "answers": [
            "Toledo",
            "Valladolid",
            "Sevilla",
            "Granada"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué rey expulsó a los moriscos de España?",
        "answers": [
            "Felipe III",
            "Felipe II",
            "Felipe IV",
            "Carlos II"
        ],
        "correct": 0
    },
    {
        "question": "¿Con qué otro nombre se conoce la Constitución firmada en 1812?",
        "answers": [
            "La Pepa",
            "La Gloriosa",
            "La Non nata",
            "El Estatuto Real"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué guerra comenzó tras la muerte de Fernando VII?",
        "answers": [
            "La Primera Guerra Carlista",
            "La Guerra de la Independencia",
            "La Guerra de Sucesión",
            "La Guerra de los Siete Años"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué etapa histórica fue rey de España Amadeo I de Saboya?",
        "answers": [
            "En el Sexenio Democrático",
            "En la Restauración borbónica",
            "En la Segunda República",
            "En el Franquismo"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue el primer presidente del gobierno de la democracia actual?",
        "answers": [
            "Adolfo Suárez",
            "Felipe González",
            "Leopoldo Calvo-Sotelo",
            "José María Aznar"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué año se celebraron los Juegos Olímpicos en Barcelona?",
        "answers": [
            "1992",
            "1988",
            "1996",
            "2004"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del caballo de Don Quijote?",
        "answers": [
            "Rocinante",
            "Babieca",
            "Bucéfalo",
            "Pegaso"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuántos lados tiene un heptágono?",
        "answers": [
            "5",
            "6",
            "7",
            "8"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el nombre del océano que separa Europa de América?",
        "answers": [
            "Atlántico",
            "Pacífico",
            "Índico",
            "Ártico"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué instrumento musical es conocido como el 'rey de los instrumentos'?",
        "answers": [
            "Piano",
            "Violín",
            "Órgano",
            "Guitarra"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el nombre del proceso por el cual el agua se convierte en vapor?",
        "answers": [
            "Condensación",
            "Evaporación",
            "Fusión",
            "Solidificación"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién es el autor de la teoría de la evolución por selección natural?",
        "answers": [
            "Charles Darwin",
            "Gregor Mendel",
            "Louis Pasteur",
            "Isaac Newton"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del gas que respiramos?",
        "answers": [
            "Dióxido de carbono",
            "Nitrógeno",
            "Oxígeno",
            "Hidrógeno"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el nombre del satélite natural de la Tierra?",
        "answers": [
            "Marte",
            "Venus",
            "Luna",
            "Sol"
        ],
        "correct": 2
    },
    {
        "question": "¿Qué es un holograma?",
        "answers": [
            "Una imagen tridimensional creada por láser",
            "Un tipo de fotografía antigua",
            "Un efecto de sonido",
            "Un tipo de pintura"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del primer ordenador electrónico digital?",
        "answers": [
            "ENIAC",
            "UNIVAC",
            "IBM PC",
            "Apple I"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue el primer presidente de Estados Unidos?",
        "answers": [
            "George Washington",
            "Thomas Jefferson",
            "Abraham Lincoln",
            "John Adams"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué año se fundó la Organización de las Naciones Unidas (ONU)?",
        "answers": [
            "1945",
            "1939",
            "1918",
            "1950"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué evento histórico se conoce como la 'Noche de los Cristales Rotos'?",
        "answers": [
            "Un pogromo contra los judíos en Alemania en 1938",
            "Una batalla de la Primera Guerra Mundial",
            "Un golpe de estado en la Unión Soviética",
            "Una revuelta estudiantil en Francia"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién fue el último emperador de China?",
        "answers": [
            "Puyi",
            "Qin Shi Huang",
            "Kublai Kan",
            "Mao Zedong"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué civilización antigua es famosa por sus jeroglíficos?",
        "answers": [
            "Egipcia",
            "Romana",
            "Griega",
            "Maya"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es la capital de Sudáfrica?",
        "answers": [
            "Pretoria",
            "Ciudad del Cabo",
            "Bloemfontein",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Qué país es el más grande de América del Sur?",
        "answers": [
            "Argentina",
            "Brasil",
            "Colombia",
            "Perú"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el río más largo de Europa?",
        "answers": [
            "Volga",
            "Danubio",
            "Rin",
            "Sena"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué país es conocido como la 'Tierra de los Mil Lagos'?",
        "answers": [
            "Suecia",
            "Noruega",
            "Finlandia",
            "Canadá"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es la capital de Egipto?",
        "answers": [
            "El Cairo",
            "Alejandría",
            "Luxor",
            "Asuán"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién pintó 'La persistencia de la memoria'?",
        "answers": [
            "Salvador Dalí",
            "Pablo Picasso",
            "Joan Miró",
            "Frida Kahlo"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del famoso detective creado por Arthur Conan Doyle?",
        "answers": [
            "Sherlock Holmes",
            "Hércules Poirot",
            "Miss Marple",
            "Philip Marlowe"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué género musical se originó en Nueva Orleans a principios del siglo XX?",
        "answers": [
            "Blues",
            "Jazz",
            "Rock and Roll",
            "Country"
        ],
        "correct": 1
    },
    {
        "question": "¿Quién es el autor de la novela 'Orgullo y prejuicio'?",
        "answers": [
            "Jane Austen",
            "Charlotte Brontë",
            "Emily Brontë",
            "Mary Shelley"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué famoso compositor es conocido por sus nueve sinfonías?",
        "answers": [
            "Wolfgang Amadeus Mozart",
            "Ludwig van Beethoven",
            "Johann Sebastian Bach",
            "Franz Schubert"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué película de Disney presenta a una princesa que vive con siete enanitos?",
        "answers": [
            "Blancanieves y los siete enanitos",
            "La Cenicienta",
            "La Bella Durmiente",
            "La Sirenita"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del actor que interpreta a James Bond en la mayoría de las películas?",
        "answers": [
            "Sean Connery",
            "Roger Moore",
            "Daniel Craig",
            "Pierce Brosnan"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué serie de televisión se desarrolla en el continente ficticio de Westeros?",
        "answers": [
            "Juego de Tronos",
            "Vikingos",
            "The Witcher",
            "El Señor de los Anillos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué videojuego es famoso por su personaje principal, un fontanero italiano?",
        "answers": [
            "Super Mario Bros.",
            "The Legend of Zelda",
            "Pokémon",
            "Tetris"
        ],
        "correct": 0
    },
    {
        "question": "¿Quién es la cantante conocida como la 'Reina del Soul'?",
        "answers": [
            "Aretha Franklin",
            "Tina Turner",
            "Diana Ross",
            "Whitney Houston"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué deporte se utiliza un 'shuttlecock'?",
        "answers": [
            "Bádminton",
            "Tenis",
            "Voleibol",
            "Squash"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuántos jugadores hay en un equipo de voleibol en la cancha?",
        "answers": [
            "5",
            "6",
            "7",
            "8"
        ],
        "correct": 1
    },
    {
        "question": "¿Qué país ha ganado más medallas de oro en los Juegos Olímpicos de verano?",
        "answers": [
            "Estados Unidos",
            "China",
            "Rusia",
            "Alemania"
        ],
        "correct": 0
    },
    {
        "question": "¿En qué ciudad se encuentra el estadio de Old Trafford?",
        "answers": [
            "Mánchester",
            "Londres",
            "Liverpool",
            "Birmingham"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué piloto de Fórmula 1 es conocido como 'El Profesor'?",
        "answers": [
            "Ayrton Senna",
            "Michael Schumacher",
            "Alain Prost",
            "Lewis Hamilton"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el nombre del trofeo que se entrega al ganador de la Copa Mundial de la FIFA?",
        "answers": [
            "Copa Jules Rimet",
            "Copa del Mundo de la FIFA",
            "Copa América",
            "Eurocopa"
        ],
        "correct": 1
    },
    {
        "question": "¿En qué deporte se destaca Serena Williams?",
        "answers": [
            "Tenis",
            "Baloncesto",
            "Golf",
            "Atletismo"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué equipo de fútbol es conocido como los 'Gunners'?",
        "answers": [
            "Arsenal",
            "Chelsea",
            "Liverpool",
            "Manchester United"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el nombre del torneo de tenis más antiguo del mundo?",
        "answers": [
            "Wimbledon",
            "Roland Garros",
            "Abierto de Australia",
            "Abierto de Estados Unidos"
        ],
        "correct": 0
    },
    {
        "question": "¿Qué país ha ganado más Copas del Mundo de Rugby?",
        "answers": [
            "Nueva Zelanda",
            "Sudáfrica",
            "Australia",
            "Inglaterra"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el animal terrestre más grande?",
        "answers": [
            "Elefante africano",
            "Jirafa",
            "Rinoceronte",
            "Hipopótamo"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el animal más venenoso del mundo?",
        "answers": [
            "Serpiente marina",
            "Rana dardo venenosa",
            "Medusa caja",
            "Pulpo de anillos azules"
        ],
        "correct": 2
    },
    {
        "question": "¿Cuál es el país con la mayor cantidad de husos horarios?",
        "answers": [
            "Rusia",
            "China",
            "Estados Unidos",
            "Francia"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el único mamífero que puede ver el color azul?",
        "answers": [
            "Los humanos",
            "Los perros",
            "Los gatos",
            "Ninguno"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único animal que no tiene cerebro?",
        "answers": [
            "Medusa",
            "Esponja",
            "Estrella de mar",
            "Todas las anteriores"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el único metal que es líquido a temperatura ambiente?",
        "answers": [
            "Mercurio",
            "Galio",
            "Cesio",
            "Francio"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único país del mundo que empieza por la letra 'Z' en español?",
        "answers": [
            "Zambia",
            "Zimbabue",
            "Zaire",
            "No hay"
        ],
        "correct": 1
    },
    {
        "question": "¿Cuál es el único mamífero que no tiene pulgar oponible?",
        "answers": [
            "Los humanos",
            "Los monos",
            "Los koalas",
            "Los osos"
        ],
        "correct": 3
    },
    {
        "question": "¿Cuál es el único órgano del cuerpo humano que no puede sentir dolor?",
        "answers": [
            "El cerebro",
            "El corazón",
            "El hígado",
            "Los pulmones"
        ],
        "correct": 0
    },
    {
        "question": "¿Cuál es el único número que no tiene una letra en su nombre en inglés?",
        "answers": [
            "Four",
            "One",
            "Zero",
            "Five"
        ],
        "correct": 0
    }
]

module.exports = MASTER_QUESTIONS;

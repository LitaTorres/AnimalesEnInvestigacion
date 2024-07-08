// //estructura funcion iife
(() => {
    const mensaje = "Bienvenido(a)";
    console.log(mensaje)
    alert(mensaje)
})();

//FUNCION AUTOEJECUTABLE SIMPLESITA
(() => {
    document.getElementById("btnRegistrar").addEventListener("click", () => {
        console.log("Se hizo clic en el botóncito Agregar");
    });
})();

//CLASE SUPER PADRE ANIMAL
class Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        this._nombre = nombre;
        this._edad = edad;
        this._img = img;
        this._comentarios = comentarios;
        this._sonido = sonido;
    }

    //METODOS
    get nombre() {
        return this._nombre;
    }

    get edad() {
        return this._edad;
    }

    get img() {
        return this._img;
    }

    get comentarios() {
        return this._comentarios;
    }

    set comentarios(nuevo_comentario) {
        this._comentarios = nuevo_comentario;
    }

    get sonido() {
        return this._sonido;
    }

    reproducirSonido() {
        const audio = new Audio(`assets/sounds/${this._sonido}`);
        audio.play();
    }

    //MINI IMAGEN DE REGISTRO
    mostrarImagen() {
        const imagen = document.createElement("img");
        imagen.src = `assets/imgs/${this._img}`;
        imagen.alt = this._nombre;
        imagen.style.height = "180px";
        imagen.style.width = "150px";

        const imagenRegistro = document.getElementById("preview");
        imagenRegistro.innerHTML = "";
        imagenRegistro.appendChild(imagen); //imagen es el hijo de imagenRegistro

    }
}

//CLASES HIJAS

class Leon extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    //METODO
    rugir() {
        this.reproducirSonido();
    }

    ImagenHijo() {
        this.mostrarImagen();
    }

}

class Lobo extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    //METODO
    aullar() {
        this.reproducirSonido();
    }

    ImagenHijo() {
        this.mostrarImagen();
    }
}

class Oso extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    //METODO
    grunir() {
        this.reproducirSonido();
    }

    ImagenHijo() {
        this.mostrarImagen();
    }
}


class Serpiente extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    //METODO
    sistear() {
        this.reproducirSonido();
    }

    ImagenHijo() {
        this.mostrarImagen();
    }
}

class Aguila extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    //METODO
    chillar() {
        this.reproducirSonido();
    }

    ImagenHijo() {
        this.mostrarImagen();
    }
}

function mostrarResultado(animal) {
    // animal.reproducirSonido();
    animal.mostrarImagen();
    animalTabla(animal);
}


//INSERCION DE DATOS RECIBIDOS EN EL FORMULARIO
document.addEventListener("DOMContentLoaded", () => {
    const botonRegistrar = document.getElementById("btnRegistrar");

    let animalesData = [];

    //PARA EXTRAER LAS IMAGENES DEL JSON
    async function fotos() {
        try {
            const obtener = await fetch("assets/animales.json"); //intenté hacerlo con url pero F
            const data = await obtener.json();
            animalesData = data.animales;
        } catch (error) {
            console.error("error al cargar el archivo:", error);
        }
    }
    fotos();


    botonRegistrar.addEventListener("click", () => {
        const nombreAnimal = document.getElementById("animal").value;
        const rangoEdad = document.getElementById("edad").value;
        const comentarios = document.getElementById("comentarios").value;

        //Acá verificando campos obligatorios
        if (nombreAnimal === "Seleccione un animal" || rangoEdad === "Seleccione un rango de años" || comentarios === "") {
            alert ("Favor, completar todos los campos antes de agregar un animal")
            return;
        }

        // Acá buscando la información del animal en el JSON
        const animalData = animalesData.find(animal => animal.name === nombreAnimal);
        if (animalData) {

            let animal;

            switch (nombreAnimal) {
                case "Leon":
                    animal = new Leon(nombreAnimal, rangoEdad, "Leon.png", comentarios, "Rugido.mp3");
                    break;
                case "Lobo":
                    animal = new Lobo(nombreAnimal, rangoEdad, "Lobo.jpg", comentarios, "Aullido.mp3");
                    break;
                case "Oso":
                    animal = new Oso(nombreAnimal, rangoEdad, "Oso.jpg", comentarios, "Grunido.mp3");
                    break;
                case "Serpiente":
                    animal = new Serpiente(nombreAnimal, rangoEdad, "Serpiente.jpg", comentarios, "Siseo.mp3");
                    break;
                case "Aguila":
                    animal = new Aguila(nombreAnimal, rangoEdad, "Aguila.png", comentarios, "Chillido.mp3");
                    break;
                default:
                    console.log("Animal no valido");
                    return;
            }

            mostrarResultado(animal);
        }
    });

});

//ESTRUCTURA PARA MOSTRAR LA IMAGEN PEQUEÑA
function animalTabla(animal) {
    const tablaAnimales = document.getElementById("Animales");

    const tarjeta = document.createElement("div");;
    tarjeta.className = "col-6 col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center "

    const img = document.createElement("img");
    img.src = `assets/imgs/${animal.img}`;
    img.alt = animal.nombre;
    img.style.height = "165px";
    img.style.width = "130px";
    img.className = "img-fluid"

    const cuerpo = document.createElement("div");
    const titulo = document.createElement("h5");
    titulo.textContent = `Click Sonido`;
    titulo.style.color = "white"
    titulo.className = "mt-2"

    tarjeta.appendChild(img);
    tarjeta.appendChild(cuerpo);
    cuerpo.appendChild(titulo);

    tablaAnimales.appendChild(tarjeta);

    titulo.addEventListener("click", () => {
        animal.reproducirSonido()
    })

    //INTENTO DEL MODAL CREÁNDOLO NMS 
    img.addEventListener("click", () => {
        const modal = document.getElementsByClassName("modal-body")[0];
        modal.innerHTML = ""

        const img = document.createElement("img");
        img.src = `assets/imgs/${animal.img}`;
        img.alt = animal.nombre;
        img.style.height = "280px";
        img.style.width = "250px";

        const modalNombre = document.createElement("h5");
        modalNombre.textContent = animal.nombre;
        modalNombre.style.color = "white"

        const modalEdad = document.createElement("p");
        modalEdad.textContent = animal.edad;
        modalEdad.style.color = "white"

        const modalComentarios = document.createElement("p");
        modalComentarios.className = "card-text text-white";
        modalComentarios.textContent = `Comentarios: ${animal.comentarios}`;

        modal.appendChild(img);
        modal.appendChild(modalNombre);
        modal.appendChild(modalEdad);
        modal.appendChild(modalComentarios);

        $("#exampleModal").modal("show");

    })
}
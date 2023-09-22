"use strict";

// const navScreen = document.querySelector(".nav-screen");
// const productSection = document.querySelector(".products-section");

// const car = document.querySelector(".car");

// const navMobile = document.querySelector(".nav-mob-left");
// const btnNav = document.querySelector(".btn-nav");

// nav mobile responsive
// const barraNav = document.querySelector(".nav-mobile");
// const btnCerrar = document.getElementById("cerrar");

// agregar productos de forma dinamica
// const products = document.querySelector(".products");

// parte dinamica del carrito
// const carContent = document.querySelector(".car-content");


// cantidad de productos en el carrito
let counter = 0;
// array con las keys de los productos del carrito
let arrayCar = [];

// crear codigo del carrito
const createCarCode = ()=>{

    const carProducts = document.createElement("DIV");
    const h2 = document.createElement("H2");
    const h3 = document.createElement("H3");
    const table = document.createElement("TABLE");
    const thead = document.createElement("THEAD");
    const thp = document.createElement("TH");
    const thc = document.createElement("TH");
    const tho = document.createElement("TH");
    const tbody = document.createElement("TBODY");
    const btnCar = document.createElement("BUTTON");

    thp.classList.add("thp");
    tho.classList.add("tho");

    carProducts.classList.add("car-products");
    h2.innerText = "Carrito";
    h3.innerText = "Productos";
    table.classList.add("car-table");
    thp.innerText = "Producto";
    thc.innerText = "Cantidad";
    tho.innerText = "Opciones";
    tbody.classList.add("tbody");
    btnCar.classList.add("btn-car");
    btnCar.innerText = "Comprar";

    thead.appendChild(thp);
    thead.appendChild(thc);
    thead.appendChild(tho);

    table.appendChild(thead);
    table.appendChild(tbody);
    
    carProducts.appendChild(h2);
    carProducts.appendChild(h3);
    carProducts.appendChild(table);
    carProducts.appendChild(btnCar);

    // vacias carrito
    btnCar.addEventListener("click",()=>{
        
        const compra = confirm("Desea realizar la compra?");
        
        if(compra){
            alert("Gracias por su compra! Vuelva pronto.");
            clearCar();
        }

    });

    return carProducts;
}

// vaciar carrito
const clearCar = ()=>{

    // se crear el contenido del carrito vacio
    const carEmpty = document.createElement("DIV");
    carEmpty.classList.add("car-empty");
    carEmpty.innerText = "No hay productos en el carrito";

    const carContent = document.querySelector(".car-content");
    const carProducts = document.querySelector(".car-products");
    
    // se elimina el carrito
    carContent.removeChild(carProducts);
    // se agrega el carro vacio
    carContent.appendChild(carEmpty);

    counter = 0;
    arrayCar = [];

    const agregados = document.querySelector(".agregados");
    agregados.innerText = "";

}

const changeCantidad = (array, cantidad)=>{

    cantidad.innerText = array[1];
        
    if(array[1] === 0){
            
        const tbody = document.querySelector(".tbody");
        const tr = document.getElementById(`item-${array[0]}`);
            
        tbody.removeChild(tr);

        counter--;

        const agregados = document.querySelector(".agregados");
        agregados.innerText = counter;

        // elimina el valor del array
        arrayCar = arrayCar.filter(value=> value!== array[0]);

    }

    if(counter === 0){
        clearCar();
    }

}

// agregar producto al carro
const addProductCar = (nombre, precio, key) =>{

    const carContent = document.querySelector(".car-content");

    // si es el primer producto
    if(counter==0){

        const carEmpty = document.querySelector(".car-empty");
        
        // elimina el carro vacio
        carContent.removeChild(carEmpty);
        // se crear el codigo del carrito nuevo
        const carProducts = createCarCode();

        carContent.appendChild(carProducts);

    }
    
    // si no ha sido agregado anteriormente
    if(!arrayCar.includes(key)){
        
        const tbody = document.querySelector(".tbody");
        const tr = document.createElement("TR");
        const name = document.createElement("TD");
        const cantidad = document.createElement("TD");
        const btns = document.createElement("TD");
        const btnMore = document.createElement("BUTTON");
        const btnLess = document.createElement("BUTTON");

        name.classList.add("t-left");

        name.innerText = nombre;
        cantidad.innerText = "1";
        btnMore.innerText = "+";
        btnLess.innerText = "-";
        
        tr.setAttribute("id",`item-${key}`);
        name.setAttribute("id",`name-${key}`);
        cantidad.setAttribute("id",`cantidad-${key}`);

        btnMore.classList.add(`more-${key}`);
        btnLess.classList.add(`less-${key}`);

        btns.appendChild(btnMore);
        btns.appendChild(btnLess);

        tr.appendChild(name);
        tr.appendChild(cantidad);
        tr.appendChild(btns);

        tbody.appendChild(tr);

        let cantProducto = 1;

        arrayCar.push(key);
        counter++;

        const agregados = document.querySelector(".agregados");
        agregados.innerText = counter;

        btnMore.addEventListener("click",()=>{
            cantProducto++;
            changeCantidad([key,cantProducto], cantidad);
        });

        btnLess.addEventListener("click",()=>{
            cantProducto--;
            changeCantidad([key,cantProducto], cantidad);
        });

    }
    else{

        alert("El producto ya fue agregado anteriormente");

    }

}

const documentFragment = document.createDocumentFragment();

// crear productos de la seccion
const crearProductos = async ()=>{

    const request = await fetch("productos.txt");
    const content = await request.json();
    const arr = content.content;

    const products = document.querySelector(".products");

    for(let i=0; i<arr.length; i++){

        // se crea la tarjeta de cada producto
        const card = document.createElement("DIV");
        const img = document.createElement("IMG");
        const name = document.createElement("H3");
        const p = document.createElement("P");
        const a = document.createElement("A");

        // se asignan los valores
        img.src = arr[i]["src"];
        name.innerText = arr[i]["nombre"];
        p.innerText = arr[i]["precio"]+"$";
        a.innerText = "Comprar";

        // sea agregan los elementos a la tarjeta
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(p);
        card.appendChild(a);

        // se agregar las clases para los estilo
        card.classList.add(`item-${i}`, "card");
        a.classList.add(`buy-${i}`);

        // numero de seleccion el tabulador
        card.tabIndex = i+1;

        // eventos de click
        card.addEventListener("click", ()=>{
            document.querySelector(".key-data").value = i;
        });

        a.addEventListener("click",()=>{
            addProductCar(arr[i]["nombre"], arr[i]["precio"], i);
        });

        // se agrega la tarjeta
        documentFragment.appendChild(card);

    }

    // agrega los productos de la seccion
    products.appendChild(documentFragment);
    
}

const abrirModal = ()=>{

    const bgModal = document.querySelector(".bg-modal");
    const car = document.querySelector(".car");

    bgModal.classList.add("show-modal");
    car.classList.add("show-car");

    bgModal.addEventListener("click",()=>{
        bgModal.classList.remove("show-modal");
        car.classList.remove("show-car");
    });

}


const navScreen = document.querySelector(".nav-screen");
const productSection = document.querySelector(".products-section");
const car = document.querySelector(".car");

// para mantener la barra de navegacion y el carrito estatico
window.addEventListener("scroll",()=>{

    if(window.innerWidth>768){

        if(window.scrollY<70){
            navScreen.classList.remove("show-nav-top");
            productSection.classList.remove("products-section-alt");
            car.classList.remove("car-static");
        }
        else {
            navScreen.classList.add("show-nav-top");
            productSection.classList.add("products-section-alt");
            car.classList.add("car-static");
        }

    }

});

// Nav mobile
const navMobile = document.querySelector(".nav-mob-left");
const btnNav = document.querySelector(".btn-nav");
const btnCerrar = document.getElementById("cerrar");

// mostrar menu mobile
btnNav.addEventListener("click",()=>{
    navMobile.classList.add("show");
});

// cerrar menu mobile al dar click en el btn cerrar
btnCerrar.addEventListener("click",()=>{
    navMobile.classList.remove("show");
});

// cerrar menu movile al dar click afuera
productSection.addEventListener("click",()=>{
    navMobile.classList.remove("show");
});


// car mobile
const iconCar = document.querySelector(".icon-car");

iconCar.addEventListener("click",()=>{
    abrirModal();
});

//console.log(tbody.textContent=="");
crearProductos();


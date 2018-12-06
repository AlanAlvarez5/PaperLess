var num;

function agregar(id) {
    var element = document.getElementById("documents");
    var elements = document.getElementsByClassName("document");
    num = elements.length;
    document.getElementById("numElements").value = num; // Actualiza el valor de la cuenta de elementos
    //alert(document.getElementById("numElements").value)
    // Crea un id para cada input con el id de doc+numero
    element.innerHTML += ("<input name='doc"+num+"' type='text' class='document' placeholder='Nombre de documento' form='addcall'></input>");
};

function remove(id) {
    var elements = document.getElementsByClassName("document");
    num = elements.length;
    //alert("hay " + num + " elementos");
    document.getElementById("numElements").value = num; // Actualiza el valor de la cuenta de elementos
    elements[num-1].remove(elements[num-1]);
};

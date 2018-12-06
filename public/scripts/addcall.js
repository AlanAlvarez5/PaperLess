function agregar(id) {
    var element = document.getElementById("documents");
    element.innerHTML += "<input type='text', class='document', placeholder='Nombre de documento'></input>";
};

function remove(id) {
    var elements = document.getElementsByClassName("document");
    var num = elements.length;
    //alert("hay " + num + " elementos");
    elements[num-1].remove(elements[num-1]);
};
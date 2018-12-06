 var i = 0;
 $('#incrementa').click(function(){ 
       
    if (i < 20 ) { /*Cambiar el >= 0 por < 10 si quieres limitar el incremento*/
            i++;
        } else if (i = i++) {
            i = 0;
        }
        document.getElementById("display").innerHTML = i;
 })

 $('#disminuye').click(function(){ 
 
  if (i > 0) {--i;} 
        document.getElementById("display").innerHTML = i;
 })



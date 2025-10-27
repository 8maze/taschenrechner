
let v1 = 1234;

console.log(v1);


$(document).on('click','#btn_plus','#btn_minus', '#btn_times','#btn_divided_by', function(){

    
    $.ajax({     
            url: "server.php", // Das Zielskript auf dem Server
            type: "POST",     // Die HTTP-Methode 
            data:  $('#form_testform').serialize()      
    })
    

});




















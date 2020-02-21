(function(){ 
    "use strict";

      // listen for the submission of the form
      document.getElementById("myform").addEventListener("submit", function(event){
        // prevent the default behavior
        event.preventDefault();

        // get all the text fields from the form
        const formData = document.querySelectorAll("input[type=text]");
        // create an array to hold values from the form
        const words = [];

        //loop through the fields and add the words to the array, one at a time.
        for( let i=0; i<formData.length; i++){
            words.push(formData[i].value);    
        }
        //You can see the array in the console, if you want...
        console.log(words);

        
        //Pass the array of words the user typed into the function
        order(words);

    });

    //This function takes an array input, then constructs the pizza, peppering
        //in the user's words where necessary.
        function order(theWords){
            const order = `I want to make a ${theWords[0]} pizza. I want to add ${theWords[1]} on top. I want ${theWords[2]}size .I want add${theWords[3]} sauce on top. Place${theWords[4]} pizza for me `;

            //Get the pizza container
            const mlContainer = document.getElementById('pizza');

            //Change the guts of the container to your pizza
            mlContainer.innerHTML = `<p>${order}</p>`;

            //change the class on the pizza container so you can see it.
            mlContainer.setAttribute("class", "visible");
        }



}());
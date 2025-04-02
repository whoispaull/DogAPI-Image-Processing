let startTime, endTime, jsonTime, imageTime;

async function fetchData() {
  try {
    // Începm timpul de urmărire
    startTime = new Date().getTime();

    // Preluam datele JSON în mod asincron
    let response = await fetch("https://dog.ceo/api/breeds/image/random");
    let data = await response.json();

    // Afișează datele JSON în browser
    document.getElementById("json-data").innerHTML = JSON.stringify(data);

    // Manipulati imaginea în canvas după un timeout stabilit
    setTimeout(() => {
      let canvas = document.getElementById("image-canvas");
      let ctx = canvas.getContext("2d");

      let image = new Image();
      image.src = data.message;
      image.crossOrigin = "anonymous";

      image.onload = function() {
      canvas.width = this.width;
      canvas.height = this.height;
      ctx.drawImage(this,0,0);

        // Începem timpul de urmărire
        startTime = new Date().getTime();
        
        //----------------------------Daca folosim a doua optiune, let i = 1, adica Negative Image----------------------------
        let option = 0; 
        
        // optiunea 1 : se realizeaza mirror la imagine
        // if (option === 0) {
        //   setTimeout(() => {
        //     // ctx.translate(canvas.width, 0);
        //     // ctx.scale(-1, 1);
        //     // ctx.drawImage(image, 0, 0);
        //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //     for (let y = 0; y < canvas.height; y++) {
        //       for (let x = 0; x < canvas.width / 2; x++) {
      
        //           const index = (y * canvas.width + x) * 4;
        //           const mirrorIndex = (y * canvas.width + canvas.width - x - 1) * 4;
                  
        //           for (let i = 0; i < 4; i++) {
        //               const temp = imageData.data[index + i];
        //               imageData.data[index + i] = imageData.data[mirrorIndex + i];
        //               imageData.data[mirrorIndex + i] = temp;
        //           }
        //       }
        //   }
          
        //   }, 1000);
          
        // }

        if (option === 0) {
          setTimeout(() => {
          endTime = new Date().getTime();
          let totalTime = endTime - startTime;
          console.log(totalTime);
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          rowOffset = 0;
          rowWidthInBytes = 4 * canvas.width;

          for(row = 0; row < canvas.height; row++){
            index = rowOffset;
            for(columnOffsetInBytes = rowWidthInBytes - 4; columnOffsetInBytes > 0; columnOffsetInBytes -=8){

              for(i = 0; i < 4; i++){
                tmp = imageData.data[index + columnOffsetInBytes];
                imageData.data[index + columnOffsetInBytes] = imageData.data[index];
                imageData.data[index++] = tmp;
              }
            }
            rowOffset += rowWidthInBytes;
          }
          ctx.putImageData(imageData, 0, 0);
        }, 1000);
          
        }

        // Opțiunea 2: Aplicam filtrul de imagine negativă în jumătatea stângă a imaginii
        else {
          ctx.drawImage(image, 0, 0, image.width / 2, image.height, 0, 0,image.width / 2, image.height);
          let imageData = ctx.getImageData(0, 0, image.width / 2, image.height);
          let data = imageData.data;

          // Procesează imaginea în 4 felii cu o întârziere de 1s
          for (let i = 0; i < data.length; i += 4 * (data.length / 4)) {
            setTimeout(() => {
              endTime = new Date().getTime();
              let totalTime = endTime - startTime;
              console.log(totalTime);
              for (let j = i; j < i + data.length / 4; j += 4) {
                data[j] = 255 - data[j]; // red
                data[j + 1] = 255 - data[j + 1]; // green
                data[j + 2] = 255 - data[j + 2]; // blue
              }
              ctx.putImageData(imageData, 0, 0);
              // ctx.translate(canvas.width, 0);
              // ctx.scale(-1, 1);
              // ctx.drawImage(image, 0, 0);             
              ctx.translate(image.width / 2, 0);
              ctx.scale(-1,1);
              ctx.drawImage(image, 0, 0);
              ctx.setTransform(1, 0, 0, 1, 0, 0);
            }, 1000);
          }
        }

        // Încheiați timpul de urmărire și calculați timpul de execuție pentru acest pas
        endTime = new Date().getTime();
        let totalTime = endTime - startTime;
          console.log(totalTime);
        imageTime = (endTime - startTime) / 1000 + " seconds";

        // Pasul 4: Afișați timpul de execuție pentru fiecare pas
        document.getElementById("json-time").innerHTML = jsonTime;
        document.getElementById("image-time").innerHTML = imageTime;
      };
    }, 3000);

    // Încheiați timpul de urmărire și calculați timpul de execuție pentru acest pas
    endTime = new Date().getTime();
    let totalTime = endTime - startTime;
          console.log(totalTime);
    jsonTime = (endTime - startTime) / 1000 + " seconds";
    document.getElementById("json-time").innerHTML = "JSON data fetch time: " + jsonTime;
    } catch (error) {
    console.error(error);
    }
    }
    fetchData();

// Acest cod descarca o imagine aleatoare de la "https://dog.ceo/api/breeds/image/random" 
// si afiseaza datele json in browser. Apoi, imaginea este afisata intr-un canvas HTML 
// si este prelucrata in functie de optiunea selectata.

// Optiunea 1: imaginea este oglindita orizontal. 
// Se realizeaza asta prin translatarea contextului canvasului si scalarea imaginii cu -1 pe axa x.

// Optiunea 2: imaginea este inversata numai pe jumatatea din stanga pe verticala si orizontala. 
// Se realizeaza asta prin aplicarea unui filtru de imagine negativa numai pe jumatatea din stanga a imaginii, 
// dupa care se translataza contextul canvasului si se scalaza imaginea cu -1 pe axa x.
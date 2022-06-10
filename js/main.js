var app = new Vue({
  el: "#app",
  data: {
    people: [1999, 2018, 2010, 2002, 1989],
    players:[],
    option: 0,
    page : 0,
    name: "",
    level: [{
      name: "Difícil",
      attempt:3,},
      {
        name: "Normal",
        attempt: 5,
      },
      {
        name: "Fácil",
        attempt: 7
      }
        ],
    
    attempts: 0,
    year1: "",
    year2:"",
    message: '',
    clue: ''
  },
  methods: {


    // Funcion que verifica el ingreso, de ser correcto genera el año aleatorio tomado del Array,
    // modifica el fondo de la pagina y dirige al juego
    login(){
      if(this.option == 0 || this.name == ""){

        alert("Ingrese los datos correctamente");
        return

      }

      let body = document.querySelector("body");
      body.className ="background";
      this.attempts = this.level[this.option-1].attempt;
      
      let random = this.getRandom(0, this.people.length)
      this.year1 = this.people[random];
      this.page = 1


    },

    // Obtiene un valor aletorio del arreglo 
    getRandom(min, max){
      return Math.floor(Math.random() * (max-min)) + min;

    },


    // Verifica el año proporcionado por el usuario, segun su resultado, resta los Intentos, muestra un 
    // mensaje y una posible posta segun los intentos y la dificultad
    check(){
     
      if(this.year2 == ""){
        this.message = "Ingresa un año";
        return;
      }

      if(this.year1 == this.year2){
        this.message ="GANASTE!";
        this.addPlayer();
      }
      else if(this.year2 > this.year1){
        this.message = "La fecha que ingresaste es mayor a la correcta";
        this.attempts -= 1;

      }
      else if(this.year2 < this.year1){
        this.message = "La fecha que ingresaste es menor a la correcta";
        this.attempts -= 1;

      }

     this.pista();

      if(this.attempts <= 0){
        this.message = "Se te acabaron los intentos. Perdiste :c";
        this.addPlayer();



      }

      this.year2 = ""

      

    },

    // Obtiene la edad de la persona con ese año y por medio de este hace una operación para 
    // utilizarla como pista
    pista(){

      let year = 2022 - this.year1 ;

      let x =(((Math.pow(year, 2) / 10 ) - 10) + 5) * 2
      x = x.toFixed(2);
      let msg = `Pista: La edad de la persona en el año 2022 esta dada por la siguiente operacion x = ((( ${x} / 2) - 5 )+ 10) * 10 )^ (1/2)  `
      // let msg = `Pista: La edad de la persona en el año 2022 esta dada por la siguiente operacion x =  ( ${year/5 + 3} - 3 )* 5   `
      let attempt = this.level[this.option-1].attempt - this.attempts;

      console.log(attempt);

      switch(this.option){

        
        case 1:
            if( attempt >= 2){


              this.clue = msg
            }

            break;

        case 2:
              if( attempt >= 3){
  
  
                this.clue = msg
              }
  
              break;

      case 3:
                if( attempt >= 5){
    
                  this.clue = msg
                }
    
                break;
      }
    },

    // Al finalizar el juego, añade el jugador al arreglo de jugadores (players) 
    // y los ordena segun los Intentos, de menor a  mayor
    addPlayer(){

     

      let btn1 = document.getElementById("verificar");
      btn1.disabled = true;

      let text = document.getElementById("formGroupExampleInput");
      text.disabled = true;

      let btn2 = document.getElementById("player");
      btn2.disabled = false;

      let btn3 = document.getElementById("playAgain")
      btn3.disabled = false;


      this.players.push({
        id: this.players.length +1,
        name: this.name,
        level: this.level[this.option-1].name,
        attempt:  this.level[this.option-1].attempt - this.attempts
    })


    this.players.sort(((a, b) => a.attempt - b.attempt));

    


    },


    // Muestra la tabla
    viewTable(){
      this.page =2;
    },

    // reinicia el juego con nuevos valores
    playAgain(){

      this.message= '';
     this.clue= '';
     let btn1 = document.getElementById("verificar");
      btn1.disabled = false;
      let btn3 = document.getElementById("playAgain")
      btn3.disabled = true;
      let btn2 = document.getElementById("player");
      btn2.disabled = true;
      let text = document.getElementById("formGroupExampleInput");
      text.disabled = false;
      this.login();
      


    },


    // sale del juego y reinicia todo
    
    logOut(){
      let body = document.querySelector("body");
      body.classList.remove("background")
      this.page = 0;
      this.option = 0;
      this.attempts= 0;
      this.year1= "";
      this.year2="";
      this.message= '';
      this.clue= '';
      this.name="";
    }




    



    
  },
});

  //v-for="i in array" es una directiva de ue que permite recorrer un arreglo

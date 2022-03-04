let previous = document.querySelector('#pre');
let next = document.querySelector('#next');
let play = document.querySelector('#play');
let titre = document.querySelector('#titre')
let volumemax = document.querySelector('#volmax');
let volumemin = document.querySelector('#volmin')
let recent_volume= document.querySelector('#volume');
let piste_image = document.querySelector('#piste_image');
let auto_play = document.querySelector('#auto');
let slider = document.querySelector('#duree_slider');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let mute = document.querySelector('#mute');
let autoplaysound = document.querySelector('#autoplaysound');


let minuteur;
let autoplay = 0;

let index_no = 0;
let chanson_joue = false;

//creer un  element audio
let piste = document.createElement('audio');




//listes des musiques
let Musiques = [
    {
      name: "Premier son",
      path: "music/song1.mp3",
      img: "img/img1.jpg",
      singer: "JohnSon_Ferdi"
    },
    {
      name: "Deuxieme son",
      path: "music/song2.mp3",
      img: "img/img2.jpg",
      singer: "John-HK"
    },
    {
      name: "Troisieme son",
      path: "music/song3.mp3",
      img: "img/img3.jpg",
      singer: "Philip Prauss"
    },
    {
      name: "Quatrieme song",
      path: "music/song4.mp3",
      img: "img/img4.jpg",
      singer: "NK_Jambi"
    },
    {
      name: "Cinquieme song",
      path: "music/song5.mp3",
      img: "img/img5.jpg",
      singer: "Enrique Delavi"
    }
 ];


 // function charger la piste
function charger_piste(index_no){

	clearInterval(minuteur);
	reset_slider();

	piste.src = Musiques[index_no].path;
	titre.innerHTML = Musiques[index_no].name;	
	piste_image.src = Musiques[index_no].img;
    artist.innerHTML = Musiques[index_no].singer;
    piste.load();

	minuteur = setInterval(Intervalle_slider,1000);
	total.innerHTML = Musiques.length;
	present.innerHTML = index_no + 1;
}


charger_piste(index_no);


//couper le son
function mute_sound(){

	piste.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
	document.getElementById('mute').style.visibility = 'visible';
	setTimeout(function() {document.getElementById('mute').style.visibility = 'hidden';}, 1500);
}

// ckeck si le son est joue ou pas
 function JustPlay(){

 	if(chanson_joue==false){
 		JouerLaPiste();

 	}else{
 		MettreEnPause();
 	}
 }

 // reinitialise le slider de la musique
 function reset_slider(){
    slider.value = 0;
}

 
// jouer la piste 
function JouerLaPiste () {

    piste.play();
    chanson_joue = true;
    play.innerHTML = '<i class="fa-solid fa-pause fa-5x" aria-hidden="true"></i>';
};


//mettre en pause
function MettreEnPause(){

	piste.pause();
	chanson_joue = false;
	play.innerHTML = '<i class="fa-solid fa-circle-play fa-5x" aria-hidden="true"></i>';
}



//  musique suivante
function Musique_suivant(){

	if(index_no < Musiques.length - 1){

		index_no += 1;
		charger_piste(index_no);
		JouerLaPiste();

	}else{

		index_no = 0;
		charger_piste(index_no);
		JouerLaPiste();

	}
}


//  musique precedente
function Musique_precedent(){

	if(index_no > 0){

		index_no -= 1;
		charger_piste(index_no);
		JouerLaPiste();

	}else{

		index_no = Musiques.length;
		charger_piste(index_no);
		JouerLaPiste();
	}
}


// change volume  et l'intervalle du curseur 
function volume_change(){

	volume_show.innerHTML = recent_volume.value;
	piste.volume = recent_volume.value / 100;

}

volumemax.addEventListener('click', event => {
	volumemax = ++recent_volume.value; 
});

volumemin.addEventListener('click', event => {
	volumemin = --recent_volume.value;
});

// change volume button +
function VolumeMax(){
    volume_change();
}
// change volume button -
function VolumeMin(){
	volume_change();
}


// change la position du slider 
function change_duree(){
	slider_position = piste.duration * (slider.value / 100);
	piste.currentTime = slider_position;
}


 // jouer la piste automatiquement 
function JouerPisteAuto(){

	if (autoplay==1){
	
       	autoplay = 0;
      	autoplaysound.style.color = "red";
	 	document.getElementById('autoplaysound').style.visibility = 'visible';
	 	setTimeout(function() {document.getElementById('autoplaysound').style.visibility = 'hidden';}, 1500);

 	}else{
        autoplay = 1;
		autoplaysound.style.color = "";
	   	document.getElementById('autoplaysound').style.visibility = 'visible';
		setTimeout(function() {document.getElementById('autoplaysound').style.visibility = 'hidden';}, 1500);

	}
}


function Intervalle_slider(){

	let position = 0;
        
        // mise a jour de la position du slider 
		if(!isNaN(piste.duration)){
		   position = piste.currentTime * (100 / piste.duration);
		   slider.value =  position;
	      }

       
       // fonction qui s'excute lorsque la musique est finie
       if(piste.ended){
       	 play.innerHTML = '<i class="fa-solid fa-circle-play fa-5x" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       charger_piste(index_no);
		       JouerLaPiste();
           }
	    }
     }
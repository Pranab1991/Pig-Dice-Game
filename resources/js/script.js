
$(function(){
/*-----------------------Initial declaration--------------------*/
var keyDown=$('#keyDown')[0];	
$('body').keydown(function(event){ if(event.originalEvent.key.length===1){if(/^[ A-Za-z0-9_@./#&+-]*$/.test(event.originalEvent.key)){
	keyDown.load();
	keyDown.play();}}
});	
/*$('body').keydown(function(event){
	
});*/
jQuery('input[type="text"]').keyup(function() {
    var raw_text =  jQuery(this).val();
    var return_text = raw_text.replace(/[^a-zA-Z0-9 _]/g,'');
    jQuery(this).val(return_text);
});	

var player1;
	var player2;
	var currentPlayer;
    var e=document.getElementsByTagName('img')[0];
	var looser;
    function whichTransitionEvent(){
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
		  'transition':'animationend',
		  'OTransition':'oAnimationEnd',
		  'MozTransition':'animationend',
		  'WebkitTransition':'webkitAnimationEnd'
		}

		for(t in transitions){
			if( el.style[t] !== undefined ){
				return transitions[t];
			}
		}
	 }
	var registered=false;
	var transitionEvent = whichTransitionEvent();
	$('.player2 i').css('visibility','hidden');	
/*-------------------------Player Factory-----------------------*/	
  function getPlayer(){
	  this.name=null;
	  this.currentScore=0;
	  this.totalScore=0;
	  var that=this;
	  function playerAccessors(that){ 
		          this.setName=function(playerName){
			           that.name=playerName;
		              };
		  		  this.getName=function(){
			           return that.name;
		              }
				  this.setCurrentScore=function(playerCurrentScore){
			           that.currentScore=playerCurrentScore;
		              };
		  		  this.getCurrentScore=function(){
			           return that.currentScore;
		              }
				  this.setTotalScore=function(playerTotalScore){
			           that.totalScore=playerTotalScore;
		              };
		  		  this.getTotalScore=function(){
			           return that.totalScore; 
				  }; 
	  };
	  return new playerAccessors(that);
     };
	/*----------------Player Initializer--------------*/
	$('.OkayBox').on('click',function(event){
		var audio = $("#mysoundclip")[0];
		if($("#Player1").hasClass('animated shake' )){
			$("#Player1").removeClass('animated shake');
			$("label i").removeClass('animated tada');
		}
		$(this).animate({"box-shadow":"0 0 0 ",top:3},100).animate({"box-shadow":"5px 5px 5px",top:0},100,function(){
			var playerOneName=$('#Player1').val().trim();
			if(playerOneName==='undefined'||playerOneName===null||playerOneName===""){
				var erroraudio=$("#myerrorclip")[0];
				erroraudio.load();
				$("#Player1").addClass('animated shake');
				$("label i").addClass('animated tada');
				erroraudio.play();
			}else{
			if(player1===undefined||player1===null){
			 var mysliderclip=$('#mysliderclip')[0];
				mysliderclip.play();
			 player1=new getPlayer();
			 player1.setName(playerOneName);
			 console.log(player1.getName()); 
			 $('.playBox').slideUp(1000,function(){
					$('.playBox label span').html("2");		
				    $('.playBox input').val("");
			}).delay(1).slideDown(1000);}else{
			var myfadeclip=$('#myfadeclip')[0];
			myfadeclip.play();	 
	         player2=new getPlayer();
			 player2.setName(playerOneName); 
			 console.log(player1.getName()+" VS "+player2.getName()); 
			  currentPlayer=player1;	 
				 $(".playStartInfo").fadeOut(1000);
			 }	
			}
		});
		audio.play();
	})
	var audio = $("#mysoundclip")[0];
	/*------------------------------game code----------------*/
	/*--------------------On click Roll----------------*/
	$('.second').click(function(event){
		if($('.dice img').hasClass("diceRotate")){
			return false;
		}
		audio.load();
		audio.play();
		$(this).animate({"box-shadow":"0 0 0 "},100).animate({"box-shadow":"5px 5px 5px"},100,function(){
			$('.dice img').addClass("diceRotate");
			var audioDice = $("#diceRotate")[0];
			audioDice.load();
		    audioDice.play();
			        if(!registered){
					transitionEvent && e.addEventListener(transitionEvent, function(event) {
						if(event.animationName==='rotateDice2'){
							var getCurrentScore=getRandomDice();
							var url='resources/images/dice-'+getCurrentScore+'.png';
							$('img').attr('src',url);
							console.log(getCurrentScore+"    "+(getCurrentScore===1))
							
							if(getCurrentScore===1){
								currentPlayer.setCurrentScore(0);
								if(currentPlayer===player1){
									$('.playeraCurrentScore.playerScr1').html(0);
								}else{
									$('.playeraCurrentScore.playerScr2').html(0);
								}
								if(currentPlayer===player1){
									currentPlayer=player2;
									$('.player2 i').css('visibility','inherit');
									$('.player1 i').css('visibility','hidden');
									console.log(currentPlayer.getName());
								}else{
									currentPlayer=player1;
									$('.player2 i').css('visibility','hidden');
									$('.player1 i').css('visibility','inherit');
									console.log(currentPlayer.getName());
								}
							}else{
								currentPlayer.setCurrentScore(currentPlayer.getCurrentScore()+getCurrentScore);
							if(currentPlayer===player1){
								$('.playeraCurrentScore.playerScr1').html(currentPlayer.getCurrentScore());
							}else{
		                        $('.playeraCurrentScore.playerScr2').html(currentPlayer.getCurrentScore());
							}
							}
							//currentPlayer.setCurrentScore(getCurrentScore);
							//
							
						}
					    if(event.animationName==='rotateDice3'){
							$('img').removeClass("diceRotate");
						}
					});}
			     registered=true;
			function getRandomDice(){
				var dice=Math.ceil(6*Math.random());
				return dice;
			}
		})
	})
/*--------------------On click Hold----------------*/
	$('.third').click(function(event){
		audio.load();
		audio.play();
		$(this).animate({"box-shadow":"0 0 0 "},100).animate({"box-shadow":"5px 5px 5px"},100,function(){
			currentPlayer.setTotalScore(currentPlayer.getTotalScore()+currentPlayer.getCurrentScore());
			currentPlayer.setCurrentScore(0);
		 if(currentPlayer===player1){
			$('.playeraTotalScore.playerTotScr1').html(currentPlayer.getTotalScore()); 
			$('.playeraCurrentScore.playerScr1').html(0);
			 if(currentPlayer.getTotalScore()>=100){
				  var myfadeclip=$('#myfadeclip')[0];
			     myfadeclip.play();	
			 $('.container').fadeOut(3000,function(){
				
				 $('.container').remove();
				 $('body').append('<video autoplay id="video-background" plays-inline><source src="vendors/video/final.mp4" type="video/mp4"></video>');
				 looser=player2.getName();
				  $("#lname").html(looser);
				 $(".overlay").fadeIn(5000);
			 });
			 looser=player2.getName();	 
			return false;	 
		  } 
			currentPlayer=player2;
			$('.player2 i').css('visibility','inherit');
			$('.player1 i').css('visibility','hidden');
		  }else{
			$('.playeraTotalScore.playerTotScr2').html(currentPlayer.getTotalScore()); 
			$('.playeraCurrentScore.playerScr2').html(0);
			 if(currentPlayer.getTotalScore()>=100){
			   var myfadeclip=$('#myfadeclip')[0];
			   myfadeclip.play();	
			 $('.container').fadeOut(4000,function(){
				 $('.container').remove();
				 $('body').append('<video autoplay id="video-background" plays-inline><source src="vendors/video/final.mp4" type="video/mp4"></video>');
				 looser=player1.getName();
				 $("#lname").html(looser);
				 $(".overlay").fadeIn(5000);
			 });	 
			return false;	 
		  }   
			currentPlayer=player1;
			$('.player2 i').css('visibility','hidden');
			$('.player1 i').css('visibility','inherit');  
		  }
			
		 	
		});
	});
/*--------------------On click New----------------*/	
	$('.first').click(function(event){
		audio.load();
		audio.play();
		$(this).animate({"box-shadow":"0 0 0,0 0 0 "},100).animate({"box-shadow":"5px 5px 10px,-5px -5px 10px"},100,function(){
			var canSeeYou = $("#canseeyou")[0];
			canSeeYou.load();
		    canSeeYou.play();
			$('.whySoSerious').fadeIn(1000);
			$('.seriousContent').slideDown(2000);
		})
	})

$('.mybutton.Yes').click(function(event){
		audio.load();
		audio.play();
$(this).animate({"left":"3","bottom":"3"},100).animate({"left":"0","bottom":"0"},100,function(){
			 var mysliderclip=$('#mysliderclip')[0];
			 mysliderclip.play();
	        $('.whySoSerious').fadeOut(2000);
			$('.seriousContent').slideUp(2000);
	        player1=null;
	        player2=null;
	        currentPlayer=null; 
	        $('.playeraTotalScore.playerTotScr1').html(0); 
			$('.playeraCurrentScore.playerScr1').html(0);
	        $('.playeraTotalScore.playerTotScr2').html(0); 
			$('.playeraCurrentScore.playerScr2').html(0);
	        $('.player2 i').css('visibility','hidden');
			$('.player1 i').css('visibility','inherit');
	        $('.playBox label span').html("1");		
		    $('.playBox input').val("");
	        $(".playStartInfo").fadeIn(2000);
	})
	})
$('.mybutton.No').click(function(event){
		audio.load();
		audio.play();
$(this).animate({"left":"3","bottom":"3"},100).animate({"left":"0","bottom":"0"},100,function(){
	 var mysliderclip=$('#mysliderclip')[0];
			 mysliderclip.play();
	        $('.whySoSerious').fadeOut(2000);
			$('.seriousContent').slideUp(2000);
	})
	})	
})



// To toggle mouse with color and background
/*$(function(){
	console.log('document is ready');
	$('.OkayBox').on('click',function(event){
		console.log(this);
		$(this).animate({"box-shadow":"0 0 0 ",
						 "background-color":"#e67ba3"},100).animate(
		                {"box-shadow":"5px 5px 5px ",
						 "background-color":"#ea3450"},100);
	})
})*/
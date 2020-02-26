$(function () {
  document.getElementById("tutorialLink").addEventListener("click",tutorialOnclick);
  
  function tutorialOnclick(){
    if($("#tutorialDiv").is(":visible")){
      clearTimeout(gifTimeout);
      toggleGIF();
      $("#tutorialDiv").toggle(1200);
    }
    else{
      toggleGIF();
      $("#tutorialDiv").toggle(1200);
      gifTimeout = setTimeout(function (){        
        toggleGIF();        
        $("#tutorialDiv").toggle(1200);
      }, 16000); 
    }
  }
  
  function toggleGIF(){
    if($("#tutorialGif").is(":visible")){
      $("#tutorialGif").hide(1200);
    }
    else{        
      $("#tutorialGif").show();
      setTimeout(function() {
        $("#tutorialGif").attr('src', 'img/gif/tutorial.gif');
      }, 0);
    }
  }
  
})
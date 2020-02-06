/*
$(window).keyup(() => {
	var activeElementType = document.activeElement.type;
	if(event.keyCode == 16 && validTypes.includes(activeElementType)){
		var stringR = document.activeElement.value;
		document.activeElement.value = reverseString(mapString(stringR));
	}
});*/

var validTypes = ["text","textarea","email","search","tel","url"];
var shiftLast = false;
$(window).keydown(() => {	
	if(event.keyCode == 16) shiftLast = true;
	else shiftLast = false;
})

$(window).keyup(() => {
		var activeElementType = document.activeElement.type;
		if(shiftLast&& validTypes.includes(activeElementType)){
			var stringR = document.activeElement.value;
			document.activeElement.value = reverseString(mapString(stringR));
		}

})

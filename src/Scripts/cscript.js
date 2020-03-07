const convertableChars = ['a','ש','b','נ','c','ב','d','ג','e','ק','f','כ','g','ע','h','י','i','ן','j','ח','k','ל',
'l','ך','m','צ','n','מ','o','ם','p','פ','q','/','r','ר','s','ד','t','א','u','ו','v','ה',
'w','\'','x','ס','y','ט','z','ז',',','ת','.','ץ',',','ף']
const ValidTypes = ["text","textarea","email","search","tel","url"];
const SuggestAt = 15;  
let shiftLast = false;

$(window).keydown(() => {	
	if(event.keyCode == 16) shiftLast = true;
	else {
		shiftLast = false;
		chrome.storage.local.set({ 'capitalLetters': [] });
	}
})

$(window).keyup(async () => {
		if(shiftLast){
			if(ValidTypes.includes(document.activeElement.type)){
				let source = document.activeElement.value;
				let selectionStart = document.activeElement.selectionStart;
				let selectionEnd = document.activeElement.selectionEnd;
				if(selectionStart != selectionEnd)
					source = document.activeElement.value.slice(selectionStart,selectionEnd);
				if(source){
					source = await setUpUpperCase(source);
					let shifted = reverseString(mapString(source));
					shifted = await updateUpperCases(shifted);
					document.activeElement.value = document.activeElement.value.replace(source,shifted);
					document.activeElement.setSelectionRange(selectionStart,selectionEnd);
					if(checkShiftSucceeded(source,shifted))shiftSucceeded();
					else shiftFailed();					
				} 
			}
			else if(document.activeElement.tagName == 'DIV' && $(document.activeElement).text()){
				let source = $(document.activeElement).text();
				let selectionStart = document.getSelection().focusOffset;
				let selectionEnd = document.getSelection().anchorOffset;
				
				if(selectionStart < selectionEnd)
					source = $(document.activeElement).text().slice(selectionStart,selectionEnd);
				else if(selectionStart > selectionEnd)
					source = $(document.activeElement).text().slice(selectionEnd,selectionStart);

				if(source){
					source = await setUpUpperCase(source);
					let shifted = reverseString(mapString(source));
					shifted = await updateUpperCases(shifted);
					$(document.activeElement).text($(document.activeElement).text().replace(source,shifted));
					
					let range = document.createRange();
					range.setStart(document.activeElement.childNodes[0],selectionStart<selectionEnd?selectionStart:selectionEnd)
					range.setEnd(document.activeElement.childNodes[0],selectionEnd>selectionStart?selectionEnd:selectionStart)
					window.getSelection().removeAllRanges();
					window.getSelection().addRange(range);
					
					if(checkShiftSucceeded(source,shifted))shiftSucceeded();
					else shiftFailed();	
				} 
			}
		}
})

function setUpUpperCase(source){
	return new Promise((resolve,rejcect)=>{
		chrome.storage.local.get('capitalLetters', function (data) {
			let sL = source.length;
			if (data.capitalLetters.length == 0) {
				let newCapitalLetters=[];
				let i = 0;
				for (; i < sL; i++) {
					newCapitalLetters.push(source.charAt(i) != source.charAt(i).toLowerCase());
				}
				chrome.storage.local.set({ 'capitalLetters': newCapitalLetters });
			}
			resolve(source);		
			});
	});
}

function updateUpperCases(source){
	return new Promise((resolve,reject)=>{
		chrome.storage.local.get('capitalLetters', function (data) {
			let mappedStr='';
			if (data.capitalLetters.length > 0) {
			let i = 0;
			let sL = source.length;
			while (i < sL) {
				if(data.capitalLetters[i])
					mappedStr = mappedStr + source.charAt(i).toUpperCase();
				else
					mappedStr = mappedStr + source.charAt(i);
				i++;
			}
		}
			resolve(mappedStr);
		});		
	})
}

function increaseCount(){
	return new Promise((resolve,reject)=>{
		chrome.storage.local.get('useCount', function (data) {
			if (data) {
			chrome.storage.local.set({ 'useCount': ++data.useCount }, function () {
			});
			}
		resolve(data.useCount);
		});
	})
}

function checkShiftSucceeded(input,output){
	let assert = true;
	assert &= (output.length > 0);
	assert &= ((input != output) || input.split("").every((ch)=> !convertableChars.includes(ch) ));
	return assert;
}

async function shiftSucceeded(){
	const currentCount = await increaseCount();
	if(currentCount == SuggestAt){
		const rankNotification = {
			type: 'basic',
			iconUrl: 'img/icon/icon48.png',
			title: 'Like it?',
			message: "What's your feedback?",
			buttons: [{title:"Rank!"},{title:"Share"}]
		};
		chrome.runtime.sendMessage({type: 'notification', data: rankNotification});
	}
}

function shiftFailed(){
	const reportNotification = {
		type: 'basic',
		iconUrl: 'img/icon/icon48.png',
		title: 'Report',
		message: "Shift attempt failed, tell us what happend",
		buttons: [{title:"Approve"},{title:"Abort"}]
	};
	chrome.runtime.sendMessage({type: 'notification', data: reportNotification});
}




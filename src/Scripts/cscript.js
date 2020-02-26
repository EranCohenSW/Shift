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
		const activeElementType = document.activeElement.type;		
		if(shiftLast && ValidTypes.includes(activeElementType)){
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
				if(checkShiftSucceeded(1,source,shifted)){
					shiftSucceeded()
				}
				else{
					shiftFailed();
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

function checkShiftSucceeded(langId,input,output){
	let assert = true;
	assert &= (output.length > 0);
	assert &= (input != output);
	return assert;
}

async function shiftSucceeded(){
	const currentCount = await increaseCount();
	if(currentCount == SuggestAt){
		console.log("its now "+currentCount);
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




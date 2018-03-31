let Condition = 0;
let Display_String = "";
let OperatorString = ["*","-","+","/","%"];
let String_Of_Operaters = ["NumpadDivide","NumpadAdd","NumpadSubtract"
							,"NumpadMultiply","NumpadEnter","Enter",
							"Backslash","Backspace","ShiftRight","Delete",
							"Equal","Minus","NumpadDecimal"];
let String_Of_Operaters_Values = {
	NumpadDivide :"/",
	NumpadSubtract :"-",
	NumpadAdd : "+",
	NumpadDecimal : ".",
	Equal : "+",
	Minus : "-",
	NumpadMultiply : "*",
	NumpadEnter : "=",
	Enter : "=",
	Backslash : "%",
	 Backspace : "B",
	ShiftRight : "-F",
	 Delete : "xx",
};
function IsOperator(Value_to_Check,Condition){
	for(var i = 0 ; i  < 5 ; i++){
		if(OperatorString[i] == Value_to_Check){
				return true;
			// return true;
		}
	}
	if(Condition == 1 && Value_to_Check == "."){		
		return true;
	}
	return false;
}
function LastCharacterIsOperator() {
	for(var i=0 ; i < 5 ; i++){
		if(Display_String[Display_String.length] == OperatorString[i]){
				return true;
		}
	}
	return false;
}
function IsAlreadyDotPresent() {
	var D;
	for(D = 0 ; D < Display_String.length ; D++){
		if(Display_String[Display_String.length - D -1] == "."){
			break;	
		}
	}
	console.log(D);
	if(D == Display_String.length){
		return false;
	}
	for(var i=0 ; i < Display_String.length ; i++){
		for(var j = 0 ; j < 5 ; j++){
			if(Display_String[Display_String.length - i -1] == OperatorString[j]){
				console.log(Display_String.length - i - 1);
				  if( (Display_String.length - D -1) > (Display_String.length - i - 1)){
				  	return true;
				  }
				  else {
				  	return false;
				  }
			}
		}
	}
	return true;
}
window.addEventListener("keydown",function(e){
	let audio = document.querySelector('audio'); 
	let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	let Key_Value = Number(e.key);
	console.log(e);
	console.log(e.code);
	// console.log(e.key);
	// console.log(Key_Value);
	if(!key){
		if(isNaN(Key_Value))
		{
			if(e.keyCode === 189){// - Key
					audio.currentTime=0;
					audio.play();
					OnKeyPress(0,e.key,e.keyCode,e.code);
					return;
			}
			else if(e.keyCode === 187){// + Key
					audio.currentTime=0;
					audio.play();
					OnKeyPress(0,e.key,e.keyCode,e.code);
					return;
			}
			else{
			return;}
		}
		else{
			audio.currentTime = 0;
			audio.play();
			OnKeyPress(0,e.key,e.keyCode,e.code);
			return;
		}
	}
	audio.currentTime = 0;
	audio.play();
	OnKeyPress(1,e.key,e.keyCode,e.code);
});
function OnKeyPress(DecisionVariable,Key_value,KeyCode,Code) {
	AddCssToKey(DecisionVariable,Key_value,KeyCode);
	Change_InnerHtml_Of_Display(DecisionVariable,Key_value,KeyCode,Code);
}
let AllButtons = document.querySelectorAll('.Button');
function Change_InnerHtml_Of_Display(DecisionVariable,Key_value,KeyCode,Code) {
	console.log(Key_value);
	console.log(String_Of_Operaters.indexOf(Code));
	if(!isNaN(Key_value)){
		if(Display_String.length < 20){
		if(!(Display_String[0] == 0 && Display_String.length == 1 && Key_value == 0)){// Fix the  Number
			Display_String = Display_String + Key_value;                       // of Zero Before dot
			ChangeInnerHtml(Display_String);} 
		}
	}
	else if(String_Of_Operaters.indexOf(Code) != -1){
			if(String_Of_Operaters_Values[Code] == "B"){//BackSpace
				Display_String = Display_String.slice(0,Display_String.length - 1);
				ChangeInnerHtml(Display_String);
				return;
		}	
		if(String_Of_Operaters_Values[Code] == "-F"){//RightShift
			if(!(Display_String[0] == "-" )){
				Display_String = "-" + Display_String;
				ChangeInnerHtml(Display_String);
			}
			return;
		}
		if(String_Of_Operaters_Values[Code] == "xx"){//Ac
			Display_String = "";
			ChangeInnerHtml(Display_String);
			return;
		}
		if(String_Of_Operaters_Values[Code] == "="){
			if(LastCharacterIsOperator()){
				return;
			}
			Display_String = eval(Display_String);
			Display_String = Display_String.toString();
			ChangeInnerHtml(Display_String);
			console.log(Display_String);
			return;
		}
		if(Display_String.length < 19){//Fix Lenght of Digit in Display Of Calculator
			if(!(IsOperator(String_Of_Operaters_Values[Code],0)  &&  IsOperator(Display_String[Display_String.length - 1],1)))//Condition For Operator
				if(!(String_Of_Operaters_Values[Code]=="." && (IsAlreadyDotPresent()))){
					if(!(String_Of_Operaters_Values[Code] == "-F"))	
						if(!(IsOperator(String_Of_Operaters_Values[Code],0) && Display_String.length == 0)){
							Display_String = Display_String + String_Of_Operaters_Values[Code];								//overLoading
							console.log(Key_value);
							console.log(Display_String);
							ChangeInnerHtml(Display_String);
					}
			}
		}	
	}
}
function ChangeInnerHtml(Display_String) {
	document.querySelector('.Display').innerHTML = Display_String;	
}
function AddCssToKey(DecisionVariable,Key_value,KeyCode) {
		if(Condition == 1){	
		RemoveAllNewClasses();}
		AllButtons.forEach( function(key) {
			if((!isNaN(Key_value) && (Key_value == key.textContent)) || ((key.textContent == "+/-") && Key_value == "Shift" )){
				key.classList.add("class", "NumberPadButtonPress");// 1,2,3,4,5,6,7,8,9,0,.,+/-
				Condition = 1;
			}
			else if(isNaN(Key_value) && Key_value == key.textContent && Key_value != "="){// (/,+,-)
				if(key.textContent == "."){
					key.classList.add("class", "NumberPadButtonPress");
					Condition = 1;
				}
			}
		});
}
function RemoveAllNewClasses() {
	let Button = document.querySelector(".NumberPadButtonPress");
	let OperationButton = document.querySelector(".OperationPadButtonPress");
	if(Button != undefined)
	Button.classList.remove('NumberPadButtonPress');
	if(OperationButton != undefined)
	OperationButton.classList.remove('OperationPadButtonPress');
}
let Calculator = document.querySelector('.Button_Grid');
Calculator.addEventListener('mouseover', RemoveAllNewClasses);
let operations = {

};
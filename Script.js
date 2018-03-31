let Condition = 0;
window.addEventListener("keydown",function(e){
	let audio = document.querySelector('audio'); 
	let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	let Key_Value = Number(e.key);
	console.log(e.key);
	console.log(Key_Value);
	if(!key){
		if(isNaN(Key_Value))
		{
			if(e.keyCode === 189){// - Key
					audio.currentTime=0;
					audio.play();
					OnKeyPress(0,e.key,e.keyCode);
					return;
			}
			else if(e.keyCode === 187){// + Key
					audio.currentTime=0;
					audio.play();
					OnKeyPress(0,e.key,e.keyCode);
					return;
			}
			else{
			return;}
		}
		else{
			audio.currentTime = 0;
			audio.play();
			OnKeyPress(0,e.key,e.keyCode);
			return;
		}
	}
	audio.currentTime = 0;
	audio.play();
	OnKeyPress(1,e.key,e.keyCode);
});
function OnKeyPress(DecisionVariable,Key_value) {
	AddCssToKey(DecisionVariable,Key_value);
	Change_InnerHtml_Of_Disply(DecisionVariable,Key_value);
}
let AllButtons = document.querySelectorAll('.Button');
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
function Change_InnerHtml_Of_Disply(DecisionVariable) {
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
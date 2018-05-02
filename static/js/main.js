//const gebi=id=>document.getElementById(id)
var header=document.getElementsByTagName('header')[0];
function shadow(){
    if(document.body.scrollHeight>window.innerHeight)
    header.style.boxShadow="box-shadow: 0vh 0vh 4vh 2vh rgba(0,0,0,0.3),0vh 0vh 2vh 0.75vh rgba(0,0,0,0.4);";
}
document.body.onscroll=(
    function s(){
        if(document.body.scrollTop||document.documentElement.scrollTop>=header.clientHeight-50){
            header.style.boxShadow="0vh 0vh 4vh 2vh rgba(0,0,0,0.3),0vh 0vh 2vh 0.75vh rgba(0,0,0,0.4)";
        }
        else
            header.removeAttribute('style');
    }
);
var menu_btn = gebi('menucontainer');
menu_btn.onclick = (function (event) {
	if (!Boolean(menu_btn.getAttribute('style'))) {
		menu_btn.setAttribute('style', 'transform: rotateZ(180deg);margin-top: 8%;');
		gebi('top').setAttribute('style', 'transform: rotateZ(45deg)translateY(0.35em)translateX(0.5em); background: red;');
		gebi('bot').setAttribute('style', 'transform: rotateZ(-45deg)translateX(0.1em)translateY(0.05em); background: red;');
		menu_shutter(1);
		menu_btn.title = "Close";
	}
	else {
		menu_btn.removeAttribute('style');
		gebi('top').removeAttribute('style');
		gebi('bot').removeAttribute('style');
		menu_shutter(0);
		menu_btn.title = "Menu";
	}
});
function menu_shutter(swtch) {
	var menu = gebi('menu');
	var bar = gebi('bar');
	var cap=gebi('menu_cap');
	var childs=Array.from(document.getElementsByClassName('menuitem'));
	if (swtch) {
		menu.setAttribute('style', 'height: 100vh;transform: translateY(0);opacity: 1;');
		bar.setAttribute('style', 'height: 100%; bottom: 0;transition-delay: 0s');
		document.body.style.overflow = 'hidden';
		childs.forEach(
			function (elem){
				elem.style.transform="none";
			},this
		);
		cap.innerHTML="Close";
	}
	else {
		menu.removeAttribute('style');
		bar.removeAttribute('style');
		document.body.removeAttribute('style');
		childs.forEach(
			function (elem){
				elem.removeAttribute('style');
			},this
		);
		cap.innerHTML="Menu";
	}
}
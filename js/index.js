var number = 0;  // общая информация про заказ начало
var sum = 0;
var button = [];

button = document.getElementsByClassName("product-box__btn");
function infoItem() {
	document.querySelector(".top-cart-info__item span:first-child").textContent = number;
	document.querySelector(".top-cart-info__item span:last-child").innerHTML = sum;
};

function addItem() {
	let amount = 1;
	let value = this.previousElementSibling.children[0].value;
	if (value) {
		amount = +value;
		number+= +value;
	} else {
		number+= 1;
	}
	this.previousElementSibling.children[0].value = "";
	let elem = this.previousElementSibling.previousElementSibling.textContent;
	sum+= amount * elem.slice(0, elem.length-5);
	
	infoItem();
}

for (var i = 0; i < button.length; i++) {
	button[i].addEventListener("click", addItem);
}
infoItem();   	// общая информация про заказ конец
			  	// разбиваем блюда на 3 группы начало

var items = document.querySelectorAll(".product-box__item");
for (var i = 0; i < items.length; i++) {
	switch (i+1) {
		case 1:
		case 2:
		case 3:
		case 5:
			items[i].typeOfGoods = "Завтраки";
			break;
		case 6:
		case 7:
		case 8:
		case 9:
			items[i].typeOfGoods = "Первые блюда";
			break;
		case 4:
		case 10:
		case 11:
		case 12:
			items[i].typeOfGoods = "Гарниры";
			break;
		default:
			break;
	}
}			// разбиваем блюда на 3 группы конец
			// настройка сортировки по двум селектам начало
var typeOfGoods = document.querySelector(".select-box select");	
var typeOfPrice = document.querySelector(".price-select-box select");
	var selectGoods = "Все";
	var selectPrice = "Все";
function sort() {
	for (var i = 0; i < items.length; i++) {
		if (selectGoods === selectPrice) {
				items[i].style.display = "flex";
			} else {
				console.log((selectGoods === "Все" && (!((+items[i].children[2].children[0].textContent.slice(0, -5) > +selectPrice.slice(3, -4))))));
				if ((selectGoods === "Все") && (+items[i].children[2].children[0].textContent.slice(0, -5) > +selectPrice.slice(3, -4))) {
					items[i].style.display = "none";
				} else {
					if (selectGoods === "Все" && (!(+items[i].children[2].children[0].textContent.slice(0, -5) > +selectPrice.slice(3, -4)))) {
						items[i].style.display = "flex";
					} else {
						if ((selectPrice === "Все") && (items[i].typeOfGoods !== selectGoods)) {
							items[i].style.display = "none";
						} else {
							if ((selectPrice === "Все") && (items[i].typeOfGoods === selectGoods)){ 
								items[i].style.display = "flex";
							} else {
								if ((items[i].typeOfGoods === selectGoods) && (!(+items[i].children[2].children[0].textContent.slice(0, -5) > +selectPrice.slice(3, -4)))) {
									items[i].style.display = "flex";
								} else {
									items[i].style.display = "none";
								}
							}
						}
					}
				}	
		}
	}	

}
function sortByTypeOfGoods() {
	selectGoods = this[this.selectedIndex].textContent;
	sort()
}
function sortByTypeOfPrice() {
	selectPrice = this[this.selectedIndex].textContent;
	sort()
}


typeOfGoods.addEventListener("change", sortByTypeOfGoods);
typeOfPrice.onchange = sortByTypeOfPrice;
			// настройка сортировки по двум селектам конец

			// оформить заказ начало

	var modal = document.createElement('div');
	modal.style.cssText = "position : absolute;\
					top : 0%;\
					left : 0%;\
					width : 100%;\
					height : 100%;\
					background-color :  rgba(136, 136, 136, 0.7);\
					z-index: 10; \
					display: none;\
					"
	
	modal.innerHTML="<div><p>Введите Ваши данные</p><input placeholder='Name' type='text'><input placeholder='Email' type='email'><button class='btn-send'>Отправить</button></div>";
	modal.children[0].style.cssText =  "position : absolute;\
										left: 40%; \
										top: 30%; \
										width : 400px;\
										height : 250px;\
										border : 1px solid lightblue;\
										padding-top : 25px;\
										border-radius : 25px;\
										background-color : lightgreen; \
										"

	modal.children[0].children[0].style.textAlign = "center";
	modal.children[0].children[1].style.cssText = "	line-height : 200%;\
										width : 80%;\
										margin : 25px 0 25px 10%;\
									  "
	modal.children[0].children[2].style.lineHeight = '200%';
	modal.children[0].children[2].style.width = '80%';
	modal.children[0].children[2].style.marginLeft = '10%';
	modal.children[0].children[3].style.cssText = "	line-height : 200%;\
										width : 60%;\
										margin : 25px 0 0 20%;\
								  	  ";


	document.body.append(modal);

	modal.addEventListener("click", (e)=>{
		if (e.target === modal) {
		console.log(e.target);
		modal.style.display = "none"}});
	document.querySelector(".btn-send").addEventListener("click", send);
	function send() {
		if ((modal.children[0].children[1].value == null) || (modal.children[0].children[2].value || null)) {
			alert("Спасибо за покупку на общую сумму: " + sum + " грн." );
			sum = 0;
			number = 0;
			infoItem();
			modal.style.display = "none";
		} else {
			alert("Введите свое Имя и Email")

		}
	};

function buy() {
	modal.style.display = "block";
}


document.querySelector(".btn-check").addEventListener("click", buy);



	// оформить заказ конец

	 


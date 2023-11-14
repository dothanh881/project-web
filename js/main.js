(function($) {
	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function() {
		var $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})
	});

	var priceInputMax = document.getElementById('price-max'),
			priceInputMin = document.getElementById('price-min');

	priceInputMax.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	priceInputMin.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	function updatePriceSlider(elem , value) {
		if ( elem.hasClass('price-min') ) {
			console.log('min')
			priceSlider.noUiSlider.set([value, null]);
		} else if ( elem.hasClass('price-max')) {
			console.log('max')
			priceSlider.noUiSlider.set([null, value]);
		}
	}

	// Price Slider
	var priceSlider = document.getElementById('price-slider');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1, 999],
			connect: true,
			step: 1,
			range: {
				'min': 1,
				'max': 999
			}
		});

		priceSlider.noUiSlider.on('update', function( values, handle ) {
			var value = values[handle];
			handle ? priceInputMax.value = value : priceInputMin.value = value
		});
	}

})(jQuery);


// Form

let email = document.forms['form']['email'];
let password = document.forms['form']['password'];

let email_error = document.getElementById('email_error');
let pass_error = document.getElementById('pass_error');

function validated(){

    if(email.value.length < 9){
        email.style.border = "1px solid red";
        email_error.style.display = "block";
        email.focus();
        return false;
    }
    
        
    if(password.value.length < 6){
        password.style.border = "1px solid red";
        pass_error.style.display = "block";
        password.focus();
        return false;
    }
}


function signup(e){
	event.preventDefault();
	let username = document.getElementById("username").value;
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	let confirmPassword = document.getElementById("confirm_password").value;

	if (!username) {
		alert('Vui lòng nhập tên người dùng.');
		return;
	  }

	  const emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	  if (!emailRegex.test(email)) {
		alert('Vui lòng nhập Email.');
		return;
	  }

	  if (!password) {
		alert('Vui lòng nhập mật khẩu.');
		return;
	  }
	  

	if(confirmPassword !== password){
		alert("Mật khẩu không khớp. Vui lòng nhập lại.");
    	return;
	}


	let user = {
		username : username,
		email : email,
		password : password,
	}

	let json = JSON.stringify(user);
	localStorage.setItem(username,json);
	
	
	alert("Đăng kí thành công");

}



//  adminInfo = [{
//     "username": "admin",
//     "password": "adadad"
// }];
   
function login(e) {
	event.preventDefault();
  
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
  
	if (username === "admin" && password === "adadad") {
	  alert("Đăng nhập thành công!");
	  window.location.href = "admin.html";
	  return; 
	}
  
	let user = localStorage.getItem(username);
	let data = JSON.parse(user);
  
	if (!username) {
	  alert("Vui lòng nhập tên người dùng!");
	} else if (!password) {
	  alert("Vui lòng nhập mật khẩu!");
	} 
	
	else {
	  if (username === data.username && password === data.password) {
		alert("Đăng nhập thành công!");
		window.location.assign("user.html");
	  } else {
		alert("Đăng nhập thất bại. Mật khẩu hoặc tài khoản không đúng.");
	  }
	}
  }
//cart
const quantityInput = document.getElementById('cart-input');
const increaseButton = document.getElementById('qty-increase');
const decreaseButton = document.getElementById('qty-decrease');

increaseButton.addEventListener('click', function() {
  // Tăng giá trị của input
  quantityInput.value = parseInt(quantityInput.value) + 1;
});

decreaseButton.addEventListener('click', function() {
  // Giảm giá trị của input (đảm bảo giá trị không nhỏ hơn 0)
  if (parseInt(quantityInput.value) > 0) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }

  // Kiểm tra nếu giá trị bằng 0, xóa sản phẩm
  if (parseInt(quantityInput.value) === 0) {
    var remove_cart;
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
  })
}
  }
});

// // Hàm xóa sản phẩm
/// xóa cart

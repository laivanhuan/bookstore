(function ($) {

/*==============================================[ Show side menu ]==*/


$('.show-side-menu').on('click',function(){
  $('.restyle-home-outgrid .wrap-vertcal-menu').css('right','0px');
});

$('.hide-side-menu').on('click',function(){
  $('.restyle-home-outgrid .wrap-vertcal-menu').css('right','-16%');
});



/*==============================================[ dropdown menu ]==*/
$('.btn-show-menu-mobile').on('click', function(){
  $(this).toggleClass('is-active');
  $('.wrap-side-menu').slideToggle();
});

let arrowMainMenu = $('.arrow-main-menu');

for(let i=0; i<arrowMainMenu.length; i++){
  $(arrowMainMenu[i]).on('click', function(){
    $(this).next('.sub-menu').slideToggle();
    $(this).toggleClass('turn-arrow');
  })
}

$(window).resize(function(){
  if($(window).width() >= 1100){
    if($('.wrap-side-menu').css('display') == 'block'){
      $('.wrap-side-menu').css('display','none');
      $('.btn-show-menu-mobile').toggleClass('is-active');
    }
    if($('.sub-menu').css('display') == 'block'){
      $('.sub-menu').css('display','none');
      $('.arrow-main-menu').removeClass('turn-arrow');
    }
  }
});

/*==============================================[ add to cart ]==*/

let getData = async id => {
  try {
    let url = '/api/carts/'+id;
    let data = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
}

let renderCart = (listProducts) =>{
  let arrProducts = listProducts.map(i =>{
    return '<div class="item"><div class="item-img"><img src="'+i.img+'"></div><div class="item-info"><span class="item-name">'+i.name+'</span><span class="item-price">'+i.price+'</span></div></div>';
  });
  let strHTML = arrProducts.join('');
  $('.list-product').html(strHTML);
}

$('.btn-addtocart').on('click', function(){
  $('.count-pro').css('display','inline-block');
  let id = this.getAttribute("data-id");
  getData(id).then(data => renderCart(data.data));
  
});

})
(jQuery);
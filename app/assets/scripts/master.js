$(document).ready(function(){
	$('.main-menu-nav-group-items').mouseover(function(){
		$(this).find('.main-sub-menu-nav-group').slideDown('fast');
	});

	$('.main-menu-nav-group-items').mouseleave(function(){
		$(this).find('.main-sub-menu-nav-group').slideUp('fast');
	});
});
$(document).ready(function () {
	var totalWidth = 0;
	var positions = new Array();
	
	$("#slides .slide").each(function (i) {
		positions[i] = totalWidth;
		totalWidth += $(this).width();
		
		if (!$(this).width()) {	
			alert("Please add a width to your images");
			return false;
		}
	});
	
	$("#menu ul li.product:first").addClass("active").siblings().addClass("inactive");

	$("#slides").width(totalWidth);
	
	$("#menu ul li a").click(function (e, keepScroll) {
		$("li.product").removeClass("active").addClass("inactive");
		$(this).parent().addClass("active");
		
		var pos = $(this).parent().prevAll(".product").length;
		
		$("#slides").stop().animate({marginLeft: -positions[pos] + "px"}, 450);
		
		e.preventDefault();
		
		if (!autoScroll) {clearInterval(itvl)};	
	});
	
	var current = 1;
	var duration = 10;
	var itvl = setInterval(function () {autoScroll()}, duration*1000);
	
	function autoScroll() {
		if (current == -1) {
			return false;
		}
		$("#menu ul li a").eq(current%$("#menu ul li a").length).trigger("click", [true]);
		current++;	
	}

});
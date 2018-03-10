//Accordion
var action = "click";
var speed = "300";

$(document).ready(function () {
	$("li.q").on("click", function () {
		//get next element		
		$(this).next()
			.slideToggle(speed)
				.siblings("li.a")
					.slideUp();
					
		//get image for active question
		var img = $(this).children("img");

		//remove "rotate" class for all images except active
		$("img").not(img).removeClass("rotate");
		
		//toggle "rotate" class
		img.toggleClass("rotate");
	});
});
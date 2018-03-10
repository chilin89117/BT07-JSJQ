$(document).ready(function () {

	var o = "O", x = "X";
	var turns = 0;
	
	var box = $("#board li");
	var s1 = $("#spot1");
	var s2 = $("#spot2");
	var s3 = $("#spot3");
	var s4 = $("#spot4");
	var s5 = $("#spot5");
	var s6 = $("#spot6");
	var s7 = $("#spot7");
	var s8 = $("#spot8");
	var s9 = $("#spot9");
	
	box.on("click", function () {
		if ((s1.hasClass("o") && s2.hasClass("o") && s3.hasClass("o")) ||
				(s4.hasClass("o") && s5.hasClass("o") && s6.hasClass("o")) ||
				(s7.hasClass("o") && s8.hasClass("o") && s9.hasClass("o")) ||
				(s1.hasClass("o") && s4.hasClass("o") && s7.hasClass("o")) ||
				(s2.hasClass("o") && s5.hasClass("o") && s8.hasClass("o")) ||
				(s3.hasClass("o") && s6.hasClass("o") && s9.hasClass("o")) ||
				(s1.hasClass("o") && s5.hasClass("o") && s9.hasClass("o")) ||
				(s3.hasClass("o") && s5.hasClass("o") && s7.hasClass("o"))) {
			
			alert("Winner: O");
			reset();
			
		} else if ((s1.hasClass("x") && s2.hasClass("x") && s3.hasClass("x")) ||
				(s4.hasClass("x") && s5.hasClass("x") && s6.hasClass("x")) ||
				(s7.hasClass("x") && s8.hasClass("x") && s9.hasClass("x")) ||
				(s1.hasClass("x") && s4.hasClass("x") && s7.hasClass("x")) ||
				(s2.hasClass("x") && s5.hasClass("x") && s8.hasClass("x")) ||
				(s3.hasClass("x") && s6.hasClass("x") && s9.hasClass("x")) ||
				(s1.hasClass("x") && s5.hasClass("x") && s9.hasClass("x")) ||
				(s3.hasClass("x") && s5.hasClass("x") && s7.hasClass("x"))) {
				
			alert("Winner: X");
			reset();
				
		} else if (turns == 9) {
			
			alert("Tie Game");
			reset();
				
		} else if ($(this).hasClass("disable")) {
			
			alert("This spot is already filled");
				
		} else if (turns%2 == 0) {
			
			turns++;
			$(this).text(o);
			$(this).addClass("disable o");
			if ((s1.hasClass("o") && s2.hasClass("o") && s3.hasClass("o")) ||
				(s4.hasClass("o") && s5.hasClass("o") && s6.hasClass("o")) ||
				(s7.hasClass("o") && s8.hasClass("o") && s9.hasClass("o")) ||
				(s1.hasClass("o") && s4.hasClass("o") && s7.hasClass("o")) ||
				(s2.hasClass("o") && s5.hasClass("o") && s8.hasClass("o")) ||
				(s3.hasClass("o") && s6.hasClass("o") && s9.hasClass("o")) ||
				(s1.hasClass("o") && s5.hasClass("o") && s9.hasClass("o")) ||
				(s3.hasClass("o") && s5.hasClass("o") && s7.hasClass("o"))) {
				
				alert("Winner: O");
				reset();	
			}			
		} else {
						
			turns++;
			$(this).text(x);
			$(this).addClass("disable x");
			if ((s1.hasClass("x") && s2.hasClass("x") && s3.hasClass("x")) ||
				(s4.hasClass("x") && s5.hasClass("x") && s6.hasClass("x")) ||
				(s7.hasClass("x") && s8.hasClass("x") && s9.hasClass("x")) ||
				(s1.hasClass("x") && s4.hasClass("x") && s7.hasClass("x")) ||
				(s2.hasClass("x") && s5.hasClass("x") && s8.hasClass("x")) ||
				(s3.hasClass("x") && s6.hasClass("x") && s9.hasClass("x")) ||
				(s1.hasClass("x") && s5.hasClass("x") && s9.hasClass("x")) ||
				(s3.hasClass("x") && s5.hasClass("x") && s7.hasClass("x"))) {
				
				alert("Winner: X");
				reset();	
			}
		}
	});
		
	$("#reset").on("click", reset);
	
	function reset() {
		box.text("+");
		box.removeClass("disable");			
		box.removeClass("o");	
		box.removeClass("x");	
		turns =0;
	}
});
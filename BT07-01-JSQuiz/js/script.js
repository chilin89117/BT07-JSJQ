function submitAnswers () {
  var total = 5;
  var score = 0;
  
  // querySelector() returns <input type="radio" name="qx" value="y" id="qxy">
 	var q1 = document.querySelector("input[name='q1']:checked");
 	var q2 = document.querySelector("input[name='q2']:checked");
 	var q3 = document.querySelector("input[name='q3']:checked");
 	var q4 = document.querySelector("input[name='q4']:checked");
 	var q5 = document.querySelector("input[name='q5']:checked");

  // Validation -------------------------------------------------------
  
	for (i = 1; i <= total; i++) {
		if (eval('q' + i) == null) {
			alert("You missed question " + i + ".");
			return false;
		}
	}
  
  // Set correct answers ----------------------------------------------
  
  var answers = ['b', 'a', 'd', 'b', 'd'];
  
  var a1 = q1.value;
  var a2 = q2.value;
  var a3 = q3.value;
  var a4 = q4.value;
  var a5 = q5.value;
  
  // Check answers ----------------------------------------------------
  
  for (i = 1; i <= total; i++) {
      if (eval('a' + i) == answers[i - 1]) {
      score++;
      }
  }
  
  // Display results --------------------------------------------------
  
  var results = document.getElementById('results');
  
  results.innerHTML = '<h2>You scored <span>' + score + '</span> out of <span>' 
                      + total + '</span>.</h2>';
  return false;
}

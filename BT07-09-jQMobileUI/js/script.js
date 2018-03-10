$(document).one("pageinit", function () {

	showRuns();	
	
	$("#submitAdd").on("tap", addRun);
	$("#submitEdit").on("tap", editRun);
	$("#stats").on("tap", "#deleteLink", deleteRun);
	$("#stats").on("tap", "#editLink", setCurrent);
	$("#clearRuns").on("tap", clearRuns);
	
	function showRuns() {
		var runs = getRunsObject();
		
		if (runs != "" && runs != null) {
			for (var i = 0; i < runs.length; i++) {
				$("#stats").append('<li class="ui-body-inherit ui-li-static">' + 
					'<strong>Date: </strong>' + runs[i]["date"] + '<br /><strong>Distance: ' +
					'</strong>' + runs[i]["miles"] + ' miles<div class="controls">' + 
					'<a href="#edit" id="editLink" data-miles="' + runs[i]["miles"] + '" ' + 
					'data-date="' + runs[i]["date"] + '">Edit</a> | <a href="#" ' + 
					'id="deleteLink" data-miles="' + runs[i]["miles"] + '" ' +
					'data-date="' + runs[i]["date"] + '">Delete</a></li>');
			}
			
			$("#home").bind("pageinit", function () {
				$("#stats").listview("refresh");
			});
		} else {
			$("#stats").html("<p>You have no logged runs.</p>");
		}
	}	
	
	function addRun() {
		var miles = $("#addMiles").val();
		var date = $("#addDate").val();
		
		var run = {
			date: date,
			miles: parseFloat(miles)		
		};
		
		var runs = getRunsObject();
		runs.push(run);
		alert("Run Added");
		
		localStorage.setItem("runs", JSON.stringify(runs));
		window.location.href = "index.html";
		return false;	
	}
	
	function editRun() {
		var currentMiles = localStorage.getItem("currentMiles");
		var currentDate = localStorage.getItem("currentDate");
		
		var runs = getRunsObject();		
		
		for (var i = 0; i < runs.length; i++) {
			if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
				runs.splice(i, 1);
			}
		}
		
		localStorage.setItem("runs", JSON.stringify(runs));	
		
		var miles = $("#editMiles").val();
		var date = $("#editDate").val();
		
		var updateRun = {
			date: date,
			miles: parseFloat(miles)		
		};
		
		runs.push(updateRun);
		alert("Run Updated");
		
		localStorage.setItem("runs", JSON.stringify(runs));
		window.location.href = "index.html";
		return false;	
	}
	
	function deleteRun() {
	
		if (confirm("Are You Sure?")) {
			var m = $(this).data("miles");
			var d = $(this).data("date");
			var runs = getRunsObject();		
		
			for (var i = 0; i < runs.length; i++) {
				if (runs[i].miles == m && runs[i].date == d) {
					runs.splice(i, 1);
				}
			}
		
			localStorage.setItem("runs", JSON.stringify(runs));	
			alert("Run Deleted");

			window.location.href = "index.html";
			return false;	
		}
	}
	
	function getRunsObject() {	
		var runs = new Array();
		var currentRuns = localStorage.getItem("runs");
		
		if (currentRuns != null) {
			var runs = JSON.parse(currentRuns);
		}
		
		return runs.sort(function (a, b) {
			return new Date(b.date) - new Date(a.date)
		});
	}
	
	function setCurrent() {
		
		var m = $(this).data("miles");
		var d = $(this).data("date");
		
		localStorage.setItem("currentMiles", m);
		localStorage.setItem("currentDate", d);
		
		$("#editMiles").val(m);
		$("#editDate").val(d);
	}
	
	function clearRuns() {
		if (confirm("Are You Sure?")) {
			localStorage.removeItem("runs");
			$("#stats").html("<p>You have no logged runs.</p>");	
		}
	}
});

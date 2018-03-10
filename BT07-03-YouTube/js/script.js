// Searchbar Handler
$(function() {
	let searchField = $('#query');
	let icon = $('#search-btn');
	
	// Focus Event Handler
	$(searchField).on('focus', function() {
		$(this).animate({width: '100%'}, 400);
		$(icon).animate({right: '10px'}, 400);
	});
	
	// Blur Event Handler
	$(searchField).on('blur', () => {
		if(searchField.val() == '') {
			$(searchField).animate({width: '45%'}, 400);
			$(icon).animate({right: '360px'}, 400);
		}
	});
	
	$('#search-form').submit((e) => {
		e.preventDefault();
	});
});

function search() {
	$("#results").html("");
	$("#buttons").html("");
	let q = $("#query").val();
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: "snippet, id",
			maxResults: 7,
			q: q,
			type: "video",
			key: "AIzaSyDiOjshOD3zvRA9YCxTG6Bw_-FPqTHyuGY	"
		},
		(data) => {
			let nextPageToken = data.nextPageToken;
			let prevPageToken = data.prevPageToken;
			console.log(data);
			
			$.each(data.items, (i, item) => {
				let output = getOutput(item);
				$("#results").append(output);
			});
			
			let buttons = getButtons(prevPageToken, nextPageToken, q);
			$("#buttons").append(buttons);	
		}	
	);
}

function nextPage() {
	let token = $("#next-btn").data("token");
	let q = $("#next-btn").data("query");
	$("#results").html("");
	$("#buttons").html("");
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: "snippet, id",
			maxResults: 7,
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyDiOjshOD3zvRA9YCxTG6Bw_-FPqTHyuGY	"
		},
		(data) => {
			let nextPageToken = data.nextPageToken;
			let prevPageToken = data.prevPageToken;
			console.log(data);
			
			$.each(data.items, (i, item) => {
				let output = getOutput(item);
				$("#results").append(output);
			});
			
			let buttons = getButtons(prevPageToken, nextPageToken, q);
			$("#buttons").append(buttons);	
		}	
	);
}

function prevPage() {
	let token = $("#prev-btn").data("token");
	let q = $("#prev-btn").data("query");
	$("#results").html("");
	$("#buttons").html("");
	
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			part: "snippet, id",
			maxResults: 7,
			q: q,
			pageToken: token,
			type: "video",
			key: "AIzaSyDiOjshOD3zvRA9YCxTG6Bw_-FPqTHyuGY	"
		},
		(data) => {
			let nextPageToken = data.nextPageToken;
			let prevPageToken = data.prevPageToken;		
			
			$.each(data.items, (i, item) => {
				let output = getOutput(item);
				$("#results").append(output);
			});
			
			let buttons = getButtons(prevPageToken, nextPageToken, q);
			$("#buttons").append(buttons);	
		}	
	);
}

function getOutput(item) {
	let videoId = item.id.videoId;
	let title = item.snippet.title;
	let desc = item.snippet.description;
	let thumb = item.snippet.thumbnails.high.url;
	let channelTitle = item.snippet.channelTitle;
	let vDate = item.snippet.publishedAt;
	let output = `
		<li>
			<div class="list-left"> 
				<img src="${thumb}">
			</div>
			<div class="list-right">
				<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/${videoId}">${title}</a></h3>
				<small>By <span class="cTitle"> ${channelTitle}</span> on ${vDate}</small>
				<p>${desc}</p>
			</div>
		</li>
		<div class="clearfix"></div>`;
	return output;
}

function getButtons(prevPageToken, nextPageToken, q) {
	if (!prevPageToken) {
		var btnOutput = `
			<div class="btn-container">
				<button id="next-btn" class="paging-btn" data-token="${nextPageToken}" 			data-query="${q}" onclick="nextPage();">Next Page</button>
			</div>`;
	}	else {
		var btnOutput = `
			<div class="btn-container">
				<button id="prev-btn" class="paging-btn" data-token="${prevPageToken}" 			data-query="${q}" onclick="prevPage();">Previous Page</button>
				<button id="next-btn" class="paging-btn" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage();">Next Page</button>
			</div>`;
	}
	return btnOutput;
}
$(function () {
$("#contactForm input, #contactForm textarea").jqBootstrapValidation({
	preventSubmit: true,
	submitError: function ($form, event, errors) { },
	submitSuccess: function ($form, event) {
	event.preventDefault();
	var name = $("input#name").val();
	var email = $("input#email").val();
	var subject = $("input#subject").val();
	var message = $("textarea#message").val();
	$this = $("#sendMessageButton");
	$this.prop("disabled", true);

	// Data to send in request
	var requestData = JSON.stringify({
		name: name,
		email: email,
		subject: subject,
		message: message
	});

	// First check if primary server is responsive
	var primaryServer = "https://smtp.myremoteserver.onedice.org/send_email";
	var backupServer = "https://smtp.myhomeserver.onedice.org:2112/send_email";
	
	// Set a timeout for the primary server test
	var serverCheckTimeout = 2000; // 2 seconds timeout
	
	// Create a test request to the primary server
	var serverTest = $.ajax({
		url: primaryServer,
		type: "HEAD",
		timeout: serverCheckTimeout
	});
	
	// Handle the result of the server test
	serverTest.done(function() {
		// Primary server is up, send the actual request
		sendEmailRequest(primaryServer);
	}).fail(function() {
		// Primary server check failed, use backup server
		console.log("Primary server not responding, using backup server");
		sendEmailRequest(backupServer);
	});
	
	// Function to send the actual email request
	function sendEmailRequest(serverUrl) {
		$.ajax({
		url: serverUrl,
		type: "POST",
		data: requestData,
		contentType: "application/json",
		success: function () {
			$('#success').html("<div class='alert alert-success'>");
			$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
			.append("</button>");
			$('#success > .alert-success')
			.append("<strong>Message sent successfully!</strong>");
			$('#success > .alert-success')
			.append('</div>');
			$('#contactForm').trigger("reset");
		},
		error: function () {
			$('#success').html("<div class='alert alert-danger'>");
			$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
			.append("</button>");
			$('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
			$('#success > .alert-danger').append('</div>');
			$('#contactForm').trigger("reset");
		},
		complete: function () {
			setTimeout(function () {
			$this.prop("disabled", false);
			}, 1000);
		}
		});
	}
	},
	filter: function () {
	return $(this).is(":visible");
	},
});

$("a[data-toggle=\"tab\"]").click(function (e) {
	e.preventDefault();
	$(this).tab("show");
});
});

$('#name').focus(function () {
$('#success').html('');
});
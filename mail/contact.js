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

	var primaryServer = "https://smtp.apis.onedice.org/send_email";
	var reduntancyServer = "https://smtp.apis.staging.onedice.org:2112/send_email";
	
	// Send to primary server with a short timeout
	$.ajax({
		url: primaryServer,
		type: "POST",
		data: requestData,
		contentType: "application/json",
		timeout: 3000, // 3 second timeout for primary server
		success: function () {
		showSuccess();
		},
		error: function (jqXHR, textStatus, errorThrown) {
		console.log("Primary server failed: " + textStatus + ". Trying reduntancy server...");
		
		// If primary server fails, try reduntancy server
		$.ajax({
			url: reduntancyServer,
			type: "POST",
			data: requestData,
			contentType: "application/json",
			success: function () {
			showSuccess();
			},
			error: function () {
			showError(name);
			},
			complete: function () {
			enableButton();
			}
		});
		},
		complete: function () {
		// Only enable the button if we're not going to the reduntancy server
		if (this.success) {
			enableButton();
		}
		}
	});
	
	function showSuccess() {
		$('#success').html("<div class='alert alert-success'>");
		$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
		.append("</button>");
		$('#success > .alert-success')
		.append("<strong>Message sent successfully!</strong>");
		$('#success > .alert-success')
		.append('</div>');
		$('#contactForm').trigger("reset");
	}
	
	function showError(name) {
		$('#success').html("<div class='alert alert-danger'>");
		$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
		.append("</button>");
		$('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
		$('#success > .alert-danger').append('</div>');
		$('#contactForm').trigger("reset");
	}
	
	function enableButton() {
		setTimeout(function () {
		$this.prop("disabled", false);
		}, 1000);
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
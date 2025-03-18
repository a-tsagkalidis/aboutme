$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            function sendEmail(url) {
                return $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    }),
                    contentType: "application/json"
                });
            }

            sendEmail("https://smtp.myremoteserver.onedice.org/send_email").done(function () {
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append("<strong>Message sent successfully!</strong>")
                        .append('</div>');
                $('#contactForm').trigger("reset");
            }).fail(function () {
                sendEmail("https://smtp.myhomeserver.onedice.org:2112/send_email").done(function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                            .append("<strong>Message sent successfully through fallback server!</strong>")
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                }).fail(function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                            .append($("<strong>").text("Sorry " + name + ", both mail servers are not responding. Please try again later!"))
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                });
            }).always(function () {
                setTimeout(function () {
                    $this.prop("disabled", false);
                }, 1000);
            });
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

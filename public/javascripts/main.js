/* global jQuery */

var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
(function() {
    var s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('script')[0]
    s1.async = true
    s1.src = 'https://embed.tawk.to/5817f9829ca1830bdca3a1a5/default'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    s0.parentNode.insertBefore(s1, s0)
})()

jQuery(document).ready(function($) {
    $("#bookmarkme").click(function() {
        if (window.sidebar) { // Mozilla Firefox Bookmark
            window.sidebar.addPanel(location.href, document.title, "");
        } else if (navigator.userAgent.toLowerCase().indexOf('chrome') != - 1) {
          alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
        } else if (window.external) { // IE Favorite
            window.external.AddFavorite(location.href, document.title);
        } else if (window.opera && window.print) { // Opera Hotlist
            this.title = document.title;
            return true;
        } else { // webkit - safari/chrome
            alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
        }
    });

    function checkSubmit(e) {
        if (e && e.keyCode === 13) {
            $('#form').submit()
        }
    }
    // variable to hold request
    var request
    $('#question').focus()
    $('#question').keydown(function(event) {
        if (event.keyCode === 13) {
            // abort any pending request
            if (request) {
                request.abort()
            }
            // let's disable the inputs for the duration of the ajax request
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            // prevent default posting of form
            event.preventDefault()
        }
    })
    $('#email').keydown(function(event) {
        if (event.keyCode === 13) {
            // abort any pending request
            if (request) {
                request.abort()
            }
            // let's disable the inputs for the duration of the ajax request
            // Note: we disable elements AFTER the form data has been serialized.
            // Disabled form elements will not be serialized.
            // $('#email_send').css({
            //   'display': 'none'
            // })
            // $('#comments_send').css({
            //   'display': 'inline'
            // })
            // $('#submit').css({
            //   'display': 'inline'
            // })
            // $('#comments').focus()
            // $('#form').css({
            //   'margin-top': '14.5%'
            // })
            // $('#home').css({
            //   'display': 'inline-block'
            // })
            // prevent default posting of form
            event.preventDefault()
        }
    })

    // bind to the submit event of our form
    $('#form').submit(function(event) {
            // abort any pending request
            if (request) {
                request.abort()
            }
            // setup some local variables
            var $form = $(this)
                // let's select and cache all the fields
            var $inputs = $form.find('input')
                // serialize the data in the form
            var serializedData = $form.serialize() + '&uploads=' + encodeURIComponent($('#upload-input').val())
            console.log($form, serializedData);
                // let's disable the inputs for the duration of the ajax request
                // Note: we disable elements AFTER the form data has been serialized.
                // Disabled form elements will not be serialized.
            $inputs.prop('disabled', true)
            $('#submit').val('Sending')
                // fire off the request to /form.php
            request = $.ajax({
                    url: 'https://script.google.com/macros/s/AKfycbwHOK8JjbPdQUyVoKsz7GeVX_pMjDvISfvmpPXqEraBMrKpR2UM/exec', // clone
                    type: 'post',
                    data: serializedData
                })
                // $('#comments_send').css({
                //   'display': 'none'
                // })
                // $('#result').css({
                //   'display': 'inline'
                // })
                // $('#question').val('')
                // callback handler that will be called on success
            request.done(function(response, textStatus, jqXHR) {
                    // log a message to the console
                    // console.log('sent2')
                    $('#submit').val('Sent!')
                })
                // callback handler that will be called on failure
            request.fail(function(jqXHR, textStatus, errorThrown) {
                    // log the error to the console
                    console.error(
                        'The following error occured: ' +
                        textStatus, errorThrown
                    )
                })
                // callback handler that will be called regardless
                // if the request failed or succeeded
            request.always(function() {
                    // reenable the inputs
                    $inputs.prop('disabled', false)
                })
                // prevent default posting of form
            event.preventDefault()
        })
        // var imageNumber = Math.floor(Math.random() * 11)
        // $('html').css({'background-image': 'url(./image' + imageNumber.toString() + '.jpeg)'})


    $('.upload-btn').on('click', function() {
        $('#upload-input').click()
    })

    $('#upload-input').on('change', function() {
        var files = $(this).get(0).files

        if (files.length > 0) {
            // create a FormData object which will be sent as the data payload in the
            // AJAX request
            var formData = new FormData()

            // loop through all the selected files and add them to the formData object
            for (var i = 0; i < files.length; i++) {
                var file = files[i]

                // add the files to formData object for the data payload
                formData.append('uploads', file, file.name)
            }

            $.ajax({
                url: '/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                },
                xhr: function() {
                    // create an XMLHttpRequest
                    var xhr = new XMLHttpRequest()

                    // listen to the 'progress' event
                    xhr.upload.addEventListener('progress', function(evt) {
                        if (evt.lengthComputable) {
                            // calculate the percentage of upload completed
                            var percentComplete = evt.loaded / evt.total
                            percentComplete = parseInt(percentComplete * 100)

                            // update the Bootstrap progress bar with the new percentage
                            $('.upload-btn').text(percentComplete + '%')

                            // once the upload reaches 100%, set the progress bar text to done
                            if (percentComplete === 100) {
                                $('.upload-btn').html('Done')
                            }
                        }
                    }, false)

                    return xhr
                }
            })
        }
    })

})

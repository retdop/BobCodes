/* global jQuery */

jQuery(document).ready(function ($) {
  // variable to hold request
  var request
  $('#question').focus()
  $('#question').keydown(function (event) {
    if (event.keyCode === 13) {
        // abort any pending request
      if (request) {
        request.abort()
      }
        // let's disable the inputs for the duration of the ajax request
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
      $('#question_form').css({
        'display': 'none'
      })
      $('#email_send').css({
        'display': 'inline'
      })
      $('#email').focus()
      $('#bob').css({
        'display': 'none'
      })
      $('#form').css({'margin-top': '14.5%'})
      $('#home').css({'display': 'inline-block'})
        // prevent default posting of form
      event.preventDefault()
    }
  })
    // bind to the submit event of our form
  $('#form').submit(function (event) {
    // abort any pending request
    if (request) {
      request.abort()
    }
    // setup some local variables
    var $form = $(this)
    // let's select and cache all the fields
    var $inputs = $form.find('input')
    // serialize the data in the form
    var serializedData = $form.serialize()
    // let's disable the inputs for the duration of the ajax request
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop('disabled', true)
    $('#result').val('Sending')
    // fire off the request to /form.php
    request = $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbwHOK8JjbPdQUyVoKsz7GeVX_pMjDvISfvmpPXqEraBMrKpR2UM/exec', // clone
      type: 'post',
      data: serializedData
    })
    $('#email_send').css({
      'display': 'none'
    })
    $('#result').css({
      'display': 'inline'
    })
    $('#question').val('')
    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
      // log a message to the console
      console.log('sent')
    })
    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown) {
      // log the error to the console
      console.error(
        'The following error occured: ' +
        textStatus, errorThrown
      )
    })
    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
      // reenable the inputs
      $inputs.prop('disabled', false)
    })
    // prevent default posting of form
    event.preventDefault()
  })
  // var imageNumber = Math.floor(Math.random() * 11)
  // $('html').css({'background-image': 'url(./image' + imageNumber.toString() + '.jpeg)'})
})

/*--------------------------------------------------------------------*/
//REPORT A PROBLEM MODAL
/*--------------------------------------------------------------------*/

//Creates modal and its HTML contents.
$(document).ready(function(){
	new jBox('Modal', {
		createOnInit: true,
		closeButton: 'box',
		width: 300,
		height: 100,
		attach: '#feedbackModal',
		title: 'Report a problem / Request feature',
		content: '<form name="sendFeedback" method="post" id="sendFeedback" action="/send_feedback"><span class="problabels">Name:</span><input type="text" name="name" id="name" required></input><span class="problabels">Feedback:</span><textarea form="sendFeedback" name="feedback" id="feedback" class="textarea1" method="post" rows="6" cols="40" required></textarea><input class="submitbtn" id="reportbtn" type="submit" value="Report Now!"></input></form>'
	});

	//*Form error handling.*//

	//Ensure Name and Problem fields do not contain only spaces.
	$('#reportbtn').click(function() {

		var name = $('#name').val();
		var feedback = $('#feedback').val();

		if(($.trim( name )).length==0){
			alert('Nice try. We know you didn\'t enter your name.');
			event.preventDefault();
		}
		else if(($.trim( feedback )).length==0){
			alert('Nice try. We know you didn\'t enter any feedback.');
			event.preventDefault();
		}

	});

	/*AJAX request that submits user's feedback.*/

	// Attach a submit handler to the form.
	$('#sendFeedback').submit(function(event) {

		// Stop form from submitting normally.
		event.preventDefault();

		// Get the action attribute from the <form action=""> element.
		var $form = $( this ),
			url = $form.attr( 'action' );

		// Send the data using post with element id name and feedback.
		var posting = $.post( url, { name: $('#name').val(), feedback: $('#feedback').val() } );

		// Displays success message.
		posting.done(function( data ) {

			$('.jBox-title').html('<h2>Thank you!<h2>');
			$('.jBox-content').html('<p>Your feedback has been submitted successfully.</p>');
			$('.jBox-closeButton').addClass('pulse');

		});
	});
});
/*--------------------------------------------------------------------*/

/*--------------------------------------------------------------------*/
//CUSTOMER GROUPS TOOL
/*--------------------------------------------------------------------*/

$(document).ready(function(){

	//Hide/Show API success/error messages.
	let pageUrl = window.location.pathname;

	if (pageUrl == '/customer_groups/submit') {

		let errorMsg = $('.errorMsg').html();

		if (errorMsg.length > 37) {

			$('.errorMsg').show();

		} else {

			$('.successMsg').show();

		}
	}

	//Handle clicking of the "Delete Customer Groups" button.
	$('#deleteCustomerGroups').click(function() {

		//Store user input.
		const storeUrl = $('#storeUrl').val();
		const apiUsername = $('#apiUsername').val();
		const apiToken = $('#apiToken').val();

		//Make sure all fields have input
		if(($.trim( storeUrl )).length==0){

			alert('Nice try. We know you didn\'t enter a Store URL.');
			event.preventDefault();

		}
		else if(($.trim( apiUsername )).length==0){

			alert('Nice try. We know you didn\'t enter an API Username.');
			event.preventDefault();

		}
		else if(($.trim( apiToken )).length==0){

			alert('Nice try. We know you didn\'t enter an API Token.');
			event.preventDefault();

		}
		else{

			//Create confirmation box
			const confirmDeletion = confirm('Are you sure you want to delete this store\'s customer groups?');

			if (confirmDeletion === false) {

				//If request cancelled, show confirmation of cancellation.
				alert('Request cancelled.');
				event.preventDefault();
				$('.cancelMsg').remove();
				$('.customergroups p:nth-last-of-type(1)').after('<div class=\'successMsg\'><p><i class=\'fa fa-info\'></i>Your delete request was successfully cancelled.</div>');

			}
		}
	});
});

/*------------------------------------------
DELETE CATEGORIES
-----------------------------------------*/

// confirm that the user wants to actually delete the categories
$(document).ready(function(){

  	//Hide/Show API success/error messages.
	let pageUrl = window.location.pathname;

	if (pageUrl == '/delete_categories/submit') {

		let errorMsg = $('.errorMsg').html();
		let successMsg = $('.successMsg').html();
		if (errorMsg.length >= 1) {

			$('.errorMsg').show();

		}
		if (successMsg.length >= 1) {
			$('.successMsg').show();
		}
	}



	$('#submitCategory').click(() => {
		const storeurl = $('#storeurl').val();
		console.log(storeurl);
		const token = $('#token').val();
		console.log(token);
		const username = $('#username').val();
		console.log(username);
		console.log('button pressed');
		let outPut = $('#outPut');

		//Make sure all fields have input
		if(($.trim( storeurl )).length==0){

			alert('Nice try. We know you didn\'t enter a Store URL.');
			event.preventDefault();

		}
		else if(($.trim( username )).length==0){

			alert('Nice try. We know you didn\'t enter an API Username.');
			event.preventDefault();

		}
		else if(($.trim( token )).length==0){

			alert('Nice try. We know you didn\'t enter an API Token.');
			event.preventDefault();

		} else {



			// Confirmation for user to ensure they want to remove empty categories
			let deleteCatAlert = confirm('Are you sure you want to delete all categories with 0 products?');

			if(deleteCatAlert === false) {
				alert('Request has been canceled');
				event.preventDefault();
			}
		}

		// confirmation end


	});
});

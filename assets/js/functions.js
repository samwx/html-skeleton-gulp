$(document).ready(function() {

	//placeholder crossbrowser
	$('form input[placeholder], form textarea[placeholder]').each(function(){
		var ph = $(this).attr('placeholder');

		$(this).val(ph).focus(function(){
			if($(this).val() == ph) $(this).val('');
		}).blur(function(){
			if(!$(this).val()) $(this).val(ph);
		});
	});
});
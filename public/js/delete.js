$(document).ready(function(){  
	$.ajax('/', {   
		complete: function(response){   
		 	var resume = response.responseJSON[0];    
		 	console.log(resume.id);    
		 	$('.name').attr('data-id', resume.id);   
		 } 
	});   

	$('.delete').submit(function() {   
		var id = $('.name').data('id');   
		console.log(id);   
		$.ajax({    
			url : '/api/resumes'+id,    
			type: 'DELETE'   
		});   
		window.location = window.location;  
	}); 
});
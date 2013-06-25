$(document).ready(function() {
	console.log('im alive');


	$('.education_block_add').click(function() {
		
				var html = $('.education_block').first().clone();
					html.css('display', 'none')
					$(this).parent().before(html);
					html.slideDown(600);
					$(html).children().val(""); 
					return false;	

		});

	$('.exp_block_add').click(function() {
		
				var html = $('.exp_block').first().clone();
					html.css('display', 'none')
					$(this).parent().before(html);
					html.slideDown(600);
					$(html).children().val(""); 
					return false;
			});

	$('.skills_block_add').click(function() {
	
			var html = $('.skills_block').first().clone();
				html.css('display', 'none')
				$(this).parent().before(html);
				html.slideDown(600);
				$(html).children().val(""); 
				return false;
		});

	$('.acc_block_add').click(function() {
	
			var html = $('.skills_block').first().clone();
				html.css('display', 'none')
				$(this).parent().before(html);
				html.slideDown(600);
				$(html).children().val(""); 
				return false;
		});

	$('#userDataForm').submit(function(){
			var userData = {}; 
			userData.firstName 	= $('#firstName').val();
			userData.lastName	=  $('#lastName').val();
			
			userData.phone 		=  $('#signup_phone').val();
			userData.address 	= $('#signup_address').val() + " " + $('#signup_aptNo').val();
			userData.city 		=  $('#signup_city').val();
			userData.state 		=  $('#signup_state').val();
			userData.zip 		=  $('#signup_zip').val();
			
			userData.schools 	=  []; 
			education_blocks 	= $('.education_block');

			education_blocks.each(function(index, item){ //each is a for loop written diferently
				userData.schools.push({ //push pushes the information into an array
					name 	: $(item).find('.schools_id').val(),
					degree 	: $(item).find('.schools_degree').val(),
					major	: $(item).find('.schools_major').val(),
					minor 	: $(item).find('.schools_minor').val(),
					gpa		: $(item).find('.schools_gpa').val(),
					sdate	: $(item).find('.schools_sdate').val(),
					edate 	: $(item).find('.schools_edate').val(),

				})
			
			});


			userData.experiences =  []; 
			experience_blocks 	= $('.exp_block');

			experience_blocks.each(function(index, item){ //each is a for loop written diferently
				userData.experiences.push({ //push pushes the information into an array
					org 	: $(item).find('.exp_org').val(),
					role	: $(item).find('.exp_role').val(),
					project : $(item).find('.exp_project').val(),
					location: $(item).find('.exp_location').val(),
					exp_sdate	: $(item).find('.exp_sdate').val(),
					exp_edate 	: $(item).find('.exp_edate').val(),
					exp_res1 	: $(item).find('.res1').val(),
					


				})
			
			});



				console.log(userData.experiences);
				console.log(userData.schools);


		return false;

	});


	$.ajax('/api/resumes/51c207cfcebd5ae789000001', {
		complete : function(response){
			var first = response.responseJSON.name_first; 
			var last = response.responseJSON.name_last;
			var fullName = first + " " + last; 
			$('#name').html(fullName);


			var email = response.responseJSON.contact_info.email; 
			$('#email').html(email);

			var phone = response.responseJSON.contact_info.phone; 
			$('#phone').html(phone);

			var city = response.responseJSON.contact_info.street_address.city;
			$('#city').html(city);

			var state = response.responseJSON.contact_info.street_address.state;
			$('#state').html(state);

			var street = response.responseJSON.contact_info.street_address.street;
			$('#street').html(street);

			var zipCode = response.responseJSON.contact_info.street_address.zip_code;
			$('#zipCode').html(zipCode);

			
			for (i = 0; i < response.responseJSON.skill.length; i++){
					

					var category = response.responseJSON.skill[i].category;
					$("#category").html(category );

					var experience = response.responseJSON.skill[i].experience;
					$("#experience" + i.toString()).html(experience);

					var title = response.responseJSON.skill[i].title;
					$("#title" + i.toString()).html(title);
				
				}
	

	for (i = 0; i < response.responseJSON.experience.length; i++){		

		var end_month_year = response.responseJSON.experience.end_month_year;

		var location = response.responseJSON.experience.location; 
		var organization = response.responseJSON.experience[i].organization; 
		$("#org").html(organization);
		var project = response.responseJSON.experience.project;
		$("#project").html(project)
		var role = response.responseJSON.experience[i].role;
		$("#role").html(role);
		var start_month_year = response.responseJSON.experience.start_month_year; 
}

	//	for  (k = 0; k < response.responseJSON.experience.responsibilities.length; k++){
	//		var responsibilities = response.responseJSON.experience.responsibilities[k]; 
	//		$(".respons").append("<li id='respos' + i ></li>")

//}

		console.log(response);
			
		}


	

	});
});
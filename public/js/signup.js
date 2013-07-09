$(document).ready(function() {

	$('.education_block_add').click(function() {
		
				var html = $('.education_block').first().clone();
				html.css('display', 'none');
				$(this).parent().before(html);
				html.slideDown(600);
				$(html).children().val(""); 
				return false;	

	});

	$('.exp_block_add').click(function() {
		
				var html = $('.exp_block').first().clone();
				html.css('display', 'none');
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
	
			var html = $('.acc_block').first().clone();
			html.css('display', 'none');
			$(this).parent().before(html);
			html.slideDown(600);
			$(html).children().val(""); 
			return false;
	});




	$('#userDataForm').submit(function(){

		console.log(userData);

			var userData = {}; 
			userData.name_first	= $('#firstName').val();
			userData.name_last	= $('#lastName').val();
			userData.twitter	= $('.twitter').val();
			userData.website	= $('#website').val();
			userData.linked_in	= $('#linked_in').val(); 
			
			userData.phone 		=  $('#signup_phone').val();
			userData.address 	= $('#signup_address').val() + " " + $('#signup_aptNo').val();
			userData.city 		=  $('#signup_city').val();
			userData.state 		=  $('#signup_state').val();
			userData.zip 		=  $('#signup_zip').val();
			
			userData.schools 	=  []; 
			education_blocks 	= $('.education_block');

			education_blocks.each(function(index, item){ //each is a for loop written diferently
				var startDate = $(item).find('.schools_sdate').val();
				var formattedStartDate = startDate.slice(5,7) + startDate.slice(2,4);
				var endDate = $(item).find('.schools_edate').val();
				var formattedEndDate = endDate.slice(5,7) + endDate.slice(2,4);
				userData.schools.push({ //push pushes the information into an array
					name 	: $(item).find('.schools_id').val(),
					degree 	: $(item).find('.schools_degree').val(),
					major	: $(item).find('.schools_major').val(),
					minor 	: $(item).find('.schools_minor').val(),
					gpa		: $(item).find('.schools_gpa').val(),	
					start_month_year : formattedStartDate, 
					end_month_year	 : formattedEndDate
				})		
			});


			userData.experiences =  []; 
			experience_blocks 	= $('.respons');
			experience_blocks.each(function(index, item){ //each is a for loop written diferently
				
				var responsibilities =[];
				$(item).find('.respons').each(function(index, item2){
					responsibilities.push(item2); 


				});  



				userData.experiences.push({ //push pushes the information into an array
					organization 	: $(item).find('.exp_org').val(),
					role			: $(item).find('.exp_role').val(),
					project 		: $(item).find('.exp_project').val(),
					location 		: $(item).find('.exp_location').val(),
					start_month_year: $(item).find('.exp_sdate').val(),
					exp_edate 		: $(item).find('.exp_edate').val(),
				
				
					responsibilities: responsibilities 
				})			
			});


			userData.skill =  []; 
			skills_blocks 	= $('.skills_block');

			skills_blocks.each(function(index, item){ //each is a for loop written diferently
				userData.skill.push({ //push pushes the information into an array
					title	 	: $(item).find('.skill_name').val(),
					category 	: $(item).find('.skill_years').val(),
					experience	: $(item).find('.skill_years').val()
					

				})
		
			});

			userData.accomplishments =  []; 
			acc_blocks 	= $('.acc_block');

			acc_blocks.each(function(index, item){ //each is a for loop written diferently
				userData.accomplishments.push({ //push pushes the information into an array
					title	 	: $(item).find('.acc_name').val(),
					description : $(item).find('.acc_des').val(),
					month_year	: $(item).find('.acc_date').val()
				})

			});	

			var postData = JSON.stringify (
				{'resume': userData});
			
			$.ajax({
				type: 'POST', 
				url: '/',  
				data: postData

			});
			
			// console.log(userData);
			console.log(postData);
			return false;

	}); 





}); 
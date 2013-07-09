$(document).ready(function() {

	$.ajax('/', {
		
		complete : function(response){
			var r = response.responseJSON[0];

			console.log(r);
			var first = r.name_first; 
			var last = r.name_last;
			var fullName = first + " " + last; 
			var email = r.contact_info.email; 
			var phone = r.contact_info.phone; 
			var city = r.contact_info.street_address.city;
			var state = r.contact_info.street_address.state;
			var street 	= r.contact_info.street_address.street;
			var zipCode = r.contact_info.street_address.zip_code;


			$('#name').html(fullName);
			$('#email').html(email);
			$('#phone').html(phone);
			$('#street').html(street);
			$('#street').append("<div id ='city'>" + city + ", " + state + " " + zipCode + "</div>"  );

			
			dates=[]; 
			boxes ={}; 

			for (m=0; m < r.experience.length; m++){
				
				var start_month_year = r.experience[m].start_month_year; 
				var formattedExStartMonth = start_month_year.slice(0,2) 
				var formattedExStartYear =  start_month_year.slice(2,4);
				var end_month_year = r.experience[m].end_month_year;
				var formattedExEndMonth = end_month_year.slice(0,2);
				var formattedExEndYear = end_month_year.slice(2,4);
				var location = r.experience[m].location; 
				var organization = r.experience[m].organization; 
				var project = r.experience[m].project;
				var role = r.experience[m].role;



				if(formattedExEndYear>15){
					var fullExFormattedDate = parseInt(("19") + formattedExEndYear);					
				}
				else {
					fullExFormattedDate = parseInt(("20") + formattedExEndYear);
				}

				date = fullExFormattedDate + "-" + formattedExEndMonth ;
			



				boxes[date]=  " <div class='entry clearfix'>"
									+ "<div class='dateRange'>" 
									+ fullExFormattedDate
									+ "</div>"
									+ "<div class='workbox'>" 
									+ "<div class='icon'>"
									+ "<img src='images/work.png'/>"
									+ "</div>"
									+ "<div id='org'>" + organization + "</div>"
									+"<div class='infobox clearfix'>"
									+"<div class='subentrybox'>	<div id='role'>"+ role + "</div>"
									+"<div class='project'>" + project + "</div></div>"
									+"<div class='responsbox'>"
									+ "<div class='respons'><ul>"; 
				for(u=0; u<r.experience[m].responsibilities.length; u++ ) {
					var res=r.experience[m].responsibilities[u];
					boxes[date] += "<li>" + res + "</li>"; 
				}
				
				boxes[date]+= "</ul></div>"	
										+ "</div></div>"
										+ "<div class= 'location'>" + location + "</div>"
										+ "</div></div>";


				
					
				dates.push(date);	
			}

			for (j=0; j < r.accomplishments.length; j++){

					var accomplishments_title = r.accomplishments[j].title;
					var accomplishments_descriptions = r.accomplishments[j].description; 
					var accomplishments_month_year = r.accomplishments[j].month_year; 
					var formattedAccMonth = accomplishments_month_year.slice(0,2); 
					var formattedAccYear = accomplishments_month_year.slice(2,4);

					if(formattedAccYear>15){
						var fullAccFormattedDate = parseInt(("19") + formattedAccYear);					
					}
					else {
						fullAccFormattedDate = parseInt(("20") + formattedAccYear);
					}

					date = fullAccFormattedDate + "-" + formattedAccMonth;
				
					boxes[date]=  " <div class='entry clearfix'>"
							
							+ "<div class='dateRange'>" 
							+ fullAccFormattedDate
							+ "</div>"
							+ "<div class='awardbox clearfix'>" 
							+ "<div class='icon'>"
							+ "<img src='images/award.png'/>"
							+ "</div>"
							+ "<div class='awardtitle'>" + accomplishments_title + "</div>"
							+"<div class='awarddesc'>"+ accomplishments_descriptions + "</div>"
							+ "</div>";

				dates.push(date);						
			}

			for (h=0; h < r.schools.length; h++){
				
					var schools_name = r.schools[h].name;
					var schools_degree = r.schools[h].degree;
					var schools_major = r.schools[h].major;
					var schools_minor = r.schools[h].minor;
					var schools_gpa = r.schools[h].gpa;
					var schools_start_month_year = r.schools[h].start_month_year;
					var schools_end_month_year = r.schools[h].end_month_year;				
					var formattedSchoolEndMonth = schools_end_month_year.slice(0,2);
					var formattedSchoolEndYear = schools_end_month_year.slice(2,4);
					var formattedSchoolStartMonth = schools_start_month_year.slice(0,2);
					var formattedSchoolStartYear =  schools_start_month_year.slice(2,4);
					//console.log(schools_start_month_year);
					//console.log(formattedSchoolStartDate);

					if(formattedSchoolEndYear>15){
						var fullSchoolFormattedDate = parseInt(("19") + formattedSchoolEndYear);					
					}
					else {
						fullSchoolFormattedDate = parseInt(("20") + formattedSchoolEndYear);
					}

					date = fullSchoolFormattedDate + "-" + formattedSchoolEndMonth;

				
					boxes[date]=  " <div class='entry clearfix'>"
									+ "<div class='dateRange'>" 
									 + fullSchoolFormattedDate 
									+ "</div>"
									+ "<div class='schoolbox clearfix'>" 
									+ "<div class='icon'>"
									+ "<img src='images/grad.png'/>"
									+ "</div>"
									+ "<div class='schooltitle'>" + schools_name + "</div>"
									+ "<div class='infobox clearfix'>" 
									+ "<div class='subentrybox'>" + schools_degree + "</div>"
									+"<div class='responsbox'> <ul>"
													+"<li>Major:"+ schools_major + "</li>"
													+"<li>Minor:"+ schools_minor + "</li>"
													+"<li>GPA:"+ schools_gpa + "</li>"
													+ "	</ul></div>";
									 +"<div class= 'location'>" + location + "</div>"
												
									+ "</div>";
				dates.push(date);		
				
			}

			dates.sort().reverse();

			

		// for(k=0; k<r.accomplishments.length + r.experience.length + r.schools.length; k++){
			for(k=0; k<dates.length; k++){
			$('#entrywrapper').append(boxes[dates[k]]);				
				
				// console.log(dates);
			}

			console.log(r.experience);


			for (n=0; n < r.skill.length; n++){

				var category = r.skill[n].category; 
				var specific_skill = r.skill[n].title; 
				var years_experience = r.skill[n].experience; 	



				$('#skillHeader').append( "<div class='skillBox clearfix'><div class='skillBar'>" + specific_skill + "</div>");
	
				// $('#skillHeader').append('<img src="//chart.googleapis.com/chart?chf=c,s,67676700&chxr=0,0,5&chxs=0,000000,11.5,0,_,000000&chxt=x&chbh=10,0,0&chs=426x40&cht=bhs&chco=3E02F0&chds=0,5&chd=t:' + years_experience + '&chma=0,5" width="426" height="40" alt="" />');
				// $('#skillHeader').append('<img src="//chart.googleapis.com/chart??chf=bg,s,FF990000|c,s,67676700&chxt=x&chbh=a&chs=440x220&cht=bhs&chco=FFCC33,C6D9FD&chds=0,160,0,160&chd=t:' + years_experience + ' &chma=0,5" width="440" height="40" alt="" />');
				$('#skillHeader').append("<div class='dateRange' style='height:30px; border-right: 0px '>" +years_experience+  ' years </div> <img src="//chart.googleapis.com/chart?chf=bg,s,FF990000|c,s,67676700&chxr=0,-3.333,155&&chxs=0,67676700,10.833,0,_,676767&chxt=x&chbh=80&chs=440x40&cht=bhs&chco=FFCC33,C6D9FD&chds=0,20,0,160&chd=t1:' + years_experience +' " width="440" height="220" alt="" />');
			}			
		}
	});		

});



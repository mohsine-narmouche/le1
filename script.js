//------------------------------------
//------------------------------------
//-------CUSTOM PAGE FUNCTIONS--------
//------------------------------------
//------------------------------------



function initStock(stock){	
	
	stock = stock.toLowerCase();
		
	var stockArray = new Array();
	stockArray = stock.split(',');

	for (var i=0;i<=(stockArray.length-1);i++){			
		
		var currentArrayValue = stockArray[i];
		var type;
		
		if (currentArrayValue.indexOf( "notext" ) > -1 || currentArrayValue.indexOf( "nobox" ) > -1 ){
			type = 'nobox';
		}else{
			type = '';
		}
		
		
		var temp = currentArrayValue.replace(/[^\d.]/g, "");
		selectNoStock(temp, type);			
		
	}
	
}

function selectNoStock(prize, nobox){

	if(prize!=''){
	    if(nobox != 'nobox'){
	        $('.prize'+prize+' .stock_box').show();
	    }
	    $('.prize'+prize+' .prize').addClass('nostock');    
	    $('.prize'+prize+' .prize_select .btn').addClass('nostock');      
	    initNoStock();
	    $('.prize'+prize+' .prize .prize_title').css('background', '#FFF');
	    $('.prize'+prize+' .prize p').css('background', '#FFF');
	    $('.prize'+prize+' .prize_select .btn').removeClass('rollover');  
	    $('.prize'+prize+' .prize_select .btn').prop('onclick', '').unbind('click');
	    $('.prize'+prize+' .prize_select .btn').css('cursor', 'default');
	    $('.prize'+prize+' span.quantity').html('0');	
	}

}
 
function initNoStock(){
    $('.nostock').css('opacity','0.4');
    $('.nostock').css('cursor','default');
}


// Global vars for initForm()
var checkemail = 1;
var checkcell = 1;
var maxlength_value;
var prepop_value;
var fields_value;

function initForm(include_form, collect_email, collect_cell){

	// hide prepop_spacer if no prepop exists (needed to preserve cross-browser inline-block)
	if(collect_cell.indexOf("prepop")==-1){
		$('.prepop_spacer').hide();
	}
	
		
	if (include_form=='yes'){		
		
		$('#form_loader').hide();
		// sets loader invis
		
		if(collect_email=='no'){
			$('#form_email').hide();
			checkemail = 0;
		}
		
		if(collect_cell=='no'){
			$('#form_cell').hide();
			checkcell = 0;	
		}else if(collect_cell==''){
			
			
		}else{
			

		
			// create array of cell rules
			var cellArray = collect_cell.split(',');
			
			// search array for rules and do stuff
			for (var i=0;i<=(cellArray.length-1);i++){			
				
				//rule - prepop
				if (cellArray[i].indexOf( "prepop" ) > -1){
					
					//stuff
					prepop_value = cellArray[i].replace(/[^\d.]/g, "");
					$('.prepop').html(prepop_value);
					$('.prepop_spacer').show();
				}
				
				//rule - number of fields
				if (cellArray[i].indexOf( "field" ) > -1){
					
					//stuff
					fields_value = cellArray[i].replace(/[^\d.]/g, "");
					if(fields_value==1){
						$('.mobile3').hide();
						$('.mobile1').show();
					}

				}
				
				//rule - maxlength
				if (cellArray[i].indexOf( "max" ) > -1){
					
					//stuff
					maxlength_value = cellArray[i].replace(/[^\d.]/g, "");
					$('.mobile1').prop( 'maxlength', maxlength_value );
				}
			}					
		}
		
	}else{
		$('.prize_select .btn').click(function(){setTimeout(function(){$('#form1').submit()},2000);});	
		$('#form_details').hide();	 // sets form invis
	}	

	
	


}


function initPage(){
	
	$('.rollover').hover(
	function(){
		$(this).addClass('btn_hover');
	},function(){
		$(this).removeClass('btn_hover');
	});
}

function initGo(go_page){
	
	go_page = go_page.toLowerCase();
	
	if(go_page.indexOf('steps')!=-1){
		$('.progress').hide();
		$('.steps').show();
	}else if(go_page.indexOf('hide')!=-1){
		$('.progress').hide();
		$('.steps').hide();		
	}
	
}

function selectPrize(prize ,prize_name, link, go_page){
	
	go_page = go_page.toLowerCase();
	

	if (go_page.indexOf('yes')!=-1|| go_page.indexOf('steps')!=-1 || go_page.indexOf('progress')!=-1 || go_page.indexOf('hide')!=-1){
		collectAnswer('gift', prize);
		collectAnswer('prize_name', prize_name);
		collectAnswer('linkstr', link);
		collectAnswer('go_type', go_page);
		switch(prize){
			case 'prize1':
				collectAnswer('prize_slug', prize1_slug);
				break;
			case 'prize2':
				collectAnswer('prize_slug', prize2_slug);
				break;
			case 'prize3':
				collectAnswer('prize_slug', prize3_slug);
				break;		
		}
	}
	else{
		$('#form1').attr('action', link);
	}
	 
    //----Animation Goes Here----//

	$('#'+prize).show();
	
}

function collectAnswer(name,answer,formID){
    if(formID==undefined){formID='#form1';}
    $(formID).prepend('<input type="hidden" value="'+answer+'" name="'+name+'"/>');
}


//------------------------------------
//------------------------------------
//--------- COMMON FUNCTIONS ---------
//------------------------------------
//------------------------------------
var loader_switch = 0;

function nextQuestion(question_id,isloader){
    
    if (isloader!=undefined){
    	if(loader_switch != 1){
	    	loader_switch = 1;
	    	$('.loader_fixed').fadeIn();
	        setTimeout(function(){
	        	$('.loader_fixed').fadeOut();
	        	nextQuestion(question_id);
	        	loader_switch = 0;
	        },2000);    	
    	}
    }else{
	    $('.fade').fadeIn(function(){
	    	 $('#question'+(question_id -1)).hide();
	    	 $('#question'+(question_id)).show();
	    	  $('.fade').fadeOut();
	    });  
    }
	

}
function expandWindow(){
		top.window.moveTo(1,1);
		top.window.resizeTo(screen.availWidth, screen.availHeight);
}
//------------------------------------
//------------------------------------
//----------FORM FUNCTIONS------------
//------------------------------------
//------------------------------------
function moveFocus(item,next_name){
    if(item.value.length == item.maxLength){
        $('#'+next_name).focus();
    }
}

function numbersonly(myfield, e, dec){
        var key;
        var keychar;
     
    if (window.event)
       key = window.event.keyCode;
    else if (e)
       key = e.which;
    else
       return true;
    keychar = String.fromCharCode(key);
     
    // control keys
    if ((key==null) || (key==0) || (key==8) ||
        (key==9) || (key==13) || (key==27) )
       return true;
     
    // numbers
    else if ((("0123456789").indexOf(keychar) > -1))
       return true;
     
    // decimal point jump
    else if (dec && (keychar == "."))
       {
       myfield.form.elements[dec].focus();
       return false;
       }
    else
       return false;
}
//------------------------------------
//------------------------------------
//----------VALIDATION CODE-----------
//------------------------------------
//------------------------------------

function final_validate(){
	
	if (checkemail == 1){
		if (validate_email($('#email').val()) == false)
		{return false;}
		else if(checkcell == 0){		
			submitNow();
		}
	}
	
	if (checkcell == 1){
		
		if (fields_value==1){
			if ($('#cell').val().length != maxlength_value){
				alert('Please enter a valid cell number'); return false;			
			}
			else{
				submitNow();
			}			
		}else{
			if ($('#cell1').val().length != 3 || $('#cell2').val().length != 3 || $('#cell3').val().length != 4){
				alert('Please enter a valid cell number'); return false;
			}
			else{		
				submitNow();
			}			
		}
	}	
}

function submitNow(){
	var temp_number = prepop_value+$('#cell1').val()+$('#cell2').val()+$('#cell3').val()+$('#cell').val();
	$('#full_cell').val(temp_number);	
	$('#form1').submit();
}


function validate_email(email){
	if (email == "") { 
		alert("Please enter your email address."); return false; 
	} 
	else {
		var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		var address = email;
		if(reg.test(address) == false) {
			alert('Invalid Email Address'); return false;
		}
	}
}


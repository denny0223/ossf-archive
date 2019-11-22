var runningTimer=new Array();
var rated=false;
jQuery(document).ready(function(){
	var ratingid = "#rating1,#rating2,#rating3,#rating4,#rating5";
	var link_rating=0;
	if( jQuery("#rating1").attr('src') != null ) {
		var src='';
		for(var i=1;i<=5;i++) {
			src = jQuery("#rating"+i).attr('src');
			if( src.indexOf( "components/com_mtree/img/star_10.png" ) != -1 ) {
				link_rating++;
			} else if( src.indexOf( "components/com_mtree/img/star_05.png" ) != -1 ) {
				link_rating=link_rating+0.5;
			} else {
				break
			}
		}
	}
	jQuery(ratingid).mouseout(function(){
		if(!rated) runningTimer.push(setTimeout('updateRating('+link_rating+',1)',1000));
	});
	jQuery(ratingid).hover(function(){
		if(!rated){
			var rating = getRating(jQuery(this).attr("id"));
			updateRating( rating, 0 );
			clearTimer();
		}
	},function(){});
});
function getRating(id){return (id.split('rating'))[1]}
function updateRating(rating,linkrating) {
	for(var i=0;i<Math.floor(rating);i++){
		jQuery("#rating"+(i+1)).attr("src",mosConfig_live_site+"/components/com_mtree/img/star_10.png");
	}
	if( (rating-i) >= 0.5 && rating > 0 ) {
		jQuery("#rating"+(i+1)).attr("src",mosConfig_live_site+"/components/com_mtree/img/star_05.png");
		i++;
	}
	for(i=Math.ceil(rating);i<5;i++){
		jQuery("#rating"+(i+1)).attr("src",mosConfig_live_site+"/components/com_mtree/img/star_00.png");
	}
	if(linkrating) {
		jQuery('#rating-msg').html(langRateThisListing);
	} else {
		jQuery('#rating-msg').html(ratingText[rating]);
	}
}
function rateListing(link_id,rating){
	if(!rated){
		jQuery.ajax({
		  type: "POST",
		  url: mosConfig_live_site+"/index.php",
		  data: "option=com_mtree&task=addrating&link_id="+link_id+"&rating="+rating+"&"+mtoken+"=1&tmpl=component&format=raw",
		  dataType: "html",
		  success: function(str){
				if(str != 'NA') {
					var result = str.split('|');
					jQuery('#rating-msg').fadeOut("slow",function(){jQuery('#rating-msg').html(result[0]);});
					jQuery('#total-votes').fadeOut("slow",function(){jQuery('#total-votes').html(result[1]);});
					jQuery('#rating-msg').fadeIn("slow");
					jQuery('#total-votes').fadeIn("slow");
				}
			}
		});
		clearTimer();
		rated=true;
		for(var i=1;i<=5;i++) jQuery("a[@onclick='return(rateListing("+link_id+","+i+"))']").css('cursor','default');
	}
}
function voteHelpful(rev_id,vote){
	jQuery.ajax({
	  type: "POST",
	  url: mosConfig_live_site+"/index.php",
	  data: "option=com_mtree&task=votereview&rev_id="+rev_id+"&vote="+vote+"&"+mtoken+"=1&format=raw&tmpl=component",
	  dateType: "html",
	  success: function(str){
		if(str != 'NA') {
			var result = str.split('|');
			var id="#rh"+rev_id;
			if(jQuery('#rhc'+rev_id).css('display')=='none'){
				jQuery(id).html(result[0]);
				jQuery('#rhc'+rev_id).slideDown("slow");
				
			} else {
				jQuery(id).fadeOut("slow",function(){
					jQuery(id).html(result[0]);
					jQuery(id).fadeIn("slow");
				});
			}
			jQuery('#ask'+rev_id).html(result[1]);
			jQuery('#rhaction'+rev_id).html('');
		}
	  }
	});
}
function clearTimer() {
	if(runningTimer.length>0) {
		len=runningTimer.length;
		for(i=0;i<len;i++) {
			clearTimeout(runningTimer[i]);
		}
	}
}
function fav(link_id,action){
	jQuery.ajax({
	  type: "POST",
	  url: mosConfig_live_site+"/index.php",
	  data: "option=com_mtree&task=fav&link_id="+link_id+"&action="+action+"&"+mtoken+"=1&format=raw&tmpl=component",
	  dateType: "html",
	  success: function(str){
		if(str != 'NA') {
			var result = str.split('|');
			jQuery('#fav-msg').fadeOut("slow",function(){jQuery('#fav-msg').html(result[0]);});
			jQuery('#fav-count').fadeOut("slow",function(){jQuery('#fav-count').html(result[1]);});
			jQuery('#fav-msg').fadeIn("slow");
			jQuery('#fav-count').fadeIn("slow");
		}
	  }
	});
}
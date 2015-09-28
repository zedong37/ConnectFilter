$(function(){

$.fn.ConnectFilter=function(options){
var settings=$.extend({
	tempField:"hotels",
	option1:$("<option value='-' selected class='select-all'>Не важно</option>"),
	source:{
		data:null,
		fieldName:null,
		fieldValue:null
	},
	target:{
		select:null,
		data:null,
		fieldName:null,
		fieldValue:null
	}
},options);
$.extend(settings.source,options.source);
$.extend(settings.target,options.target);
var dataField=settings.tempField;
var target=settings.target.select;

function fullFromData(select,info){
	select.empty();
	if(settings.option1)select.append(settings.option1.clone());
	if(info){
		var H=info.data;
		var B=[];
		var sub=info.fieldName;
		var sub_id=info.fieldValue||sub;
		H.sort(function(a,b){return (a[sub]>b[sub])?1:-1});
		$.each(H,function(index,hotel){
			if(jQuery.inArray(hotel[sub],B)==-1){
				B.push(hotel[sub]);
				var id=hotel[sub_id];
				var o=$("<option value='"+id+"'>"+hotel[sub]+"</option>");
				var data=$.grep(H,function(obj){return hotel[sub]==obj[sub]});
				o.data(dataField,data);
				select.append(o);
			}
		});
	}
	setFirst(target);
}

function setFirst(obj){
	if(obj){
	var o=obj.find("option");
	if(o.length>0){
		o.first().prop("selected","selected");
		o=obj.find("option:not(.select-all)");
		if(o.length==1)o.prop("selected","selected");
		obj.change();
	}
	}
}

if(settings.source.data){
	fullFromData($(this),settings.source);
	setFirst(this);
}
if(target){
target.empty();
if(settings.option1)target.append(settings.option1.clone());
$(this).on("change",function(){
	if(settings.target.data)
		var H=settings.target.data;
	else{
		var H=$(this).find("option:selected:first").data(dataField)||[];
		if(H.length==0){
			$(this).find("option").each(function(index,option){
				jQuery.merge(H,$(option).data(dataField)||[])
			})
		}
	}
	fullFromData(target,$.extend({},settings.target,{data:H}));
});
}

return this;
}


});
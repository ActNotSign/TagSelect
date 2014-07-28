/*
* power by act.yu
*/
(function($){
     function bindTagAction(){
         $("#select-tag-box .added-tag .one-tag").bind("mouseover",function(){$(this).addClass("move");});
         $("#select-tag-box .added-tag .one-tag").bind("mouseout",function(){$(this).removeClass("move");});
         $("#select-tag-box .delete-tag").bind("click",function(){
                                               $(this).parent().fadeOut("fast",function(){$(this).remove();});
                                               var text = $(this).parent().text();
                                               delTag(text);
                                               });
     }
     function unbindTagAction(){
         $("#select-tag-box .added-tag .one-tag").unbind("mouseover");
         $("#select-tag-box .added-tag .one-tag").unbind("mouseout");
         $("#select-tag-box .delete-tag").unbind("click");
     }
     function createTag(text){
         var hasit = false;
         $("#select-tag-box .one-tag:contains("+text+")").each(function(){
                                                               var objText = $(this).text();
                                                               if(objText==text)
                                                                    hasit = true;
                                                          });
         if(hasit)
            return false;
         unbindTagAction();//unbind
         var html = '<li class="one-tag"><i class="icon-tag delete-tag"></i>'+text+'</li>';
         $("#select-tag-box .added-tag .input-tag").before(html);
         $("#select-tag-box .select-tag:contains("+text+")").each(function(){
                                                                      var objText = $(this).text();
                                                                      if(objText==text)
                                                                        $(this).addClass("added");
                                                                  });
         bindTagAction();//renew bind
     }
     function listenInputTag(){
         $("#select-tag-box .append-tag").bind("keydown",function(event){
                                               var e = e|| event;
                                               var  keyCode = e.charCode || e.which || e.keyCode;
                                               var text = $(this).val().trim();
                                               switch(keyCode) {
                                                    case 13://enter
                                                        break;
                                                    case 32://space
                                                       if(text!="")
                                                       createTag(text);
                                                       $(this).val("");//clear input
                                                       break;
                                                   case 8://delete
                                                       if(text==""){
                                                           delTag($("#select-tag-box .one-tag:last").text());
                                                       }
                                                       break;
                                                   }
                                               });
     }
     function delTag(text){
         $("#select-tag-box .added:contains("+text+")").removeClass("added");
         $("#select-tag-box .one-tag:contains("+text+")").map(function(){
                                                                      if($(this).text()==text){
                                                                        $(this).fadeOut("fast",function(){$(this).remove();});
                                                                      }
                                                                  });
     }
     function initTagBox(){
         $("#select-tag-box .select-tag").bind("mouseover",function(){$(this).addClass("move");});
         $("#select-tag-box .select-tag").bind("mouseout",function(){$(this).removeClass("move");});
         $("#select-tag-box .select-tag").bind("click",function(){
                                                   $(this).toggleClass("added");
                                                   var text = $(this).text();
                                                   if($(this).is(".added")){
                                                       createTag(text)
                                                   }else{
                                                        delTag(text);
                                                   }
                                                   $("#select-tag-box .added-tag ul").removeClass("focusInput");
                                               });
         $("#select-tag-box .added-tag ul").bind("click",function(){
                                                     $("#select-tag-box .append-tag").focus();
                                                     $(this).addClass("focusInput");
                                                 });
         listenInputTag();
     }
 
     $.fn.createSelectTagBox = function(options){
         $.fn.createSelectTagBox.this = this ;
         $.fn.createSelectTagBox.createDefinedHtml(options);
         initTagBox();
     };
 
     $.fn.createSelectTagBox.createDefinedHtml = function(options){
         var taglist = '';
         var tags = options["tags"].split(" ");
         for(var i = 0 ; i < tags.length;i++){
            if(tags[i]!="")
                taglist+='<dt class="select-tag"><i class="icon-tag"></i>'+tags[i]+'</dt>';
         }
         var select_html  = '<div id="select-tag-box"><dl><dt><h2 class="title">'+options["title"]+'</h2></dt></dl><dl><div class="added-tag"><ul><li class="input-tag"><input type="text" autocomplete="off" class="input-defined append-tag" /></li></ul></div></dl><dl style="text-align: center;" class="list-tags">'+taglist+'</dl></div>';
         
        $.fn.createSelectTagBox.this.html(select_html);
        var definedTags = options["definedTags"].split(" ");
        for(var i = 0 ; i < definedTags.length;i++){
            createTag(definedTags[i]);
        } 
     };
    $.fn.getTags = function(){
        var tagStr = '';
        $("#select-tag-box .added-tag ul").children('.one-tag').each(function(){
            tagStr +=$(this).text()+" ";
        });
        return tagStr;
    }

})(jQuery);

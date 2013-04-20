/* Form data serialized ---------------------------------------------------------- */
(function  ($) {
    $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
      });
    return o;
    };
})(jQuery);

//All custom JS goes here. ------------------------------------------------------------------
$(document).ready(function(){
    $("#buttons-holder li>*").each(function(){
        $(this).popover({placement:'bottom'}).attr('data-content', objToString($(this).getStyleObject()));  
    })
    function objToString (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + ':' + obj[p] + ';\n';
            }
        }
        return str;
    }

}); 
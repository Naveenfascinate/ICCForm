$.ajax({
   url:"/enquiries",
   data: {'getdata': location.search.split("?")},
   type: 'POST',

   success: function (res, status) {
       document.getElementById("form-name").innerText=location.search.split("?")[1];
       responseData = res.formData.replaceAll('\'','"')
       responseData = jQuery.parseJSON(responseData);
       responseDataKeys = Object.keys(responseData)
       colNameTag = $("#col-name")
       tabelId = $("#table-id")
       for(keys=0;keys<responseDataKeys.length;keys++){
           colNameTag.append('<th>'+responseDataKeys[keys]+'</th>')
       }
        temp=''

           for(keys1=0;keys1<responseData[responseDataKeys[0]].length;keys1++){
               temp = temp+'<tr>'
               for(keys=0;keys<responseDataKeys.length;keys++){

               temp = temp +'<td>'+responseData[responseDataKeys[keys]][keys1]+'</td>'
           }
            temp = temp +'</tr>'



       }
           tabelId.append(temp)


   },
    error: function (res) {
     alert(res.status);
   }
});

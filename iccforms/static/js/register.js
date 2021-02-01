registerQuestionName = []
registerQuestionType = []
$.ajax({
   url:"/register",
   data: {'getdata': location.search.split("?")},
   type: 'POST',

   success: function (res, status) {
      document.getElementById("form-label").innerText=location.search.split("?")[1];
      console.log(res)
       formData = res.formData.replaceAll('\'','"')
       formData = jQuery.parseJSON(formData);
       formDataKeys = Object.keys(formData)
       data = formData["formdata"];
       for(dataIndex=0;dataIndex<data.length;dataIndex++){
           question = Object.keys(formData["formdata"][dataIndex])
           questionMain = question[0];
           questionTemp = question[0].split("-")
           question = questionTemp[0];
           if(questionTemp[1] === "true"){
              required = "  *";
           }
           else {
               required = "";
           }


           registerQuestionName.push(question)

           questionType = Object.keys(formData["formdata"][dataIndex][questionMain])
           questionType = questionType[0]
           registerQuestionType.push(questionType)
           questionTypeConstrains = formData["formdata"][dataIndex][questionMain]
           if(questionType === "text"){
                $("#add-div-id").append('<label  class="text-label" type="text" ' +
                    ' id="ques-id">'+question+required+'</label><br>')
               if(questionTypeConstrains[questionType][0] === "ShortAnswer"){
                   $("#add-div-id").append('<input  class="text-input2 add-choice-inputs" ' +
                       'type="text" placeholder="Your Answer"><br>')

               }
           else if(questionTypeConstrains[questionType][0] === "Your Number"){
               $("#add-div-id").append('<input  class="text-input2 add-choice-inputs" ' +
                       'type="number"  onkeyup="validationCb(this)" placeholder="Your Answer"><br>')
               }
           else if(questionTypeConstrains[questionType][0] === "Email"){
               $("#add-div-id").append('<input  class="text-input2 add-choice-inputs" ' +
                       'type="email" placeholder="Your Answer"><br>')

               }
           else if(questionTypeConstrains[questionType][0] === "LongAnswer"){
               $("#add-div-id").append('<input  class="text-input2 add-choice-inputs" ' +
                       'type="text" placeholder="Your Answer"><br>')

               }
           }
           else if(questionType === "radio"){
               $("#add-div-id").append('<label  class="text-label add-choice-inputs input-radio" type="text" ' +
                    ' id="ques-id">'+question+required+'</label><br>')
               for(radioIndex = 0;radioIndex< questionTypeConstrains[questionType].length;radioIndex++){
                   $("#add-div-id").append('<input type="radio"   value="'+questionTypeConstrains[questionType][radioIndex]+' " name="'+question+'" ><label  class="radio-label" type="text" ' +
                    ' id="ques-id">'+questionTypeConstrains[questionType][radioIndex]+'</label><br>')
               }


           }
           else if(questionType === "checkbox"){
               $("#add-div-id").append('<label  class="text-label add-choice-inputs input-checkbox" type="text" ' +
                    ' id="ques-id">'+question+required+'</label><br>')
               for(radioIndex = 0;radioIndex< questionTypeConstrains[questionType].length;radioIndex++){
                   $("#add-div-id").append('<input type="checkbox"   value="'+questionTypeConstrains[questionType][radioIndex]+' " name="'+question+'" ><label  class="radio-label" type="text" ' +
                    ' id="ques-id">'+questionTypeConstrains[questionType][radioIndex]+'</label><br>')
               }


           }


       }

        $("#parent-div").append('<input type="submit" id="submit-id" value="submit"' +
            'style="margin-top: 15px;width: 100px"   onclick="registerSubmitCb()" >')


   },
   error: function (res) {
     alert(res.status);
   }
});
function validationCb(obj){
    if(obj.type === "number"){
        if(obj.value.length === 10){
            obj.style.borderColor="green";
            document.getElementById("submit-id").disabled = false;
        }
        else{
            obj.style.borderColor="red";
            document.getElementById("submit-id").disabled = true;
        }
    }


}
function  registerSubmitCb(){
    tabelData = []
    tabelColName = []
    //$('[name="Gender"]:checked').val()
    result=[]
    inputDatas = $(".add-choice-inputs");
    for(ii = 0;ii<inputDatas.length;ii++){
        tag = inputDatas[ii].tagName;
        if(tag === "LABEL"){
            labelName = inputDatas[ii].innerText;
            labelName = labelName.split(" *")[0];
            temp = $('[name='+labelName+']:checked');
            tempres=[];
            for(i=0;i<temp.length;i++){
                tempres.push(temp[i].value)
            }
            result.push(tempres)

        }
        else {
            result.push([inputDatas[ii].value])
        }
    }
    result = JSON.stringify(result)
    console.log(result)

     $.ajax({
   url:"/submit",
         jsonp: 'callback',
        dataType: 'jsonp',
   data: {'resultdata': result,'question':registerQuestionName,'questionType':registerQuestionType,
   'getdata': location.search.split("?")[1]},
   type: 'POST',

   success: function (res, status) {
        document.getElementById("container").style.display="none";
      $("body").append('<h>Response Submitted</h>')

   },
   error: function (res) {
      document.getElementById("container").style.display="none";
      $("body").append('<h>Response Submitted</h>')
   }
});


}
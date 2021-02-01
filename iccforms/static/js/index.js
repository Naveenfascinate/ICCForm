colName = []
addChoiceDiv=0
function addDivCb(obj){
    obj.disabled=true;
    addChoiceDiv= addChoiceDiv +1;
    $("#parent-div").append(' <div class="add-div">\n' +
        '    \n' +
        '        <input  class="text-input1" type="text" placeholder="Your question" id="ques-id">' +
        '<input type="checkbox" title="Required" class="required" ><br>\n' +
        '       \n' +
        '    <div id="add-choice-div'+addChoiceDiv+'" class="add-choice-div-class">\n' +
        '        <input  class="text-input1 add-choice-inputs" type="text" placeholder="ShortAnswer"><br>\n' +
        '    </div>\n' +
        '    <div>\n' +
        '        <select onchange="addElementCb(this,'+addChoiceDiv+')" id="add-choice" class="add-select">\n' +
        '            <option>ShortAnswer</option>\n' +
        '            <option>Email</option>\n' +
        '            <option>Radio</option>\n' +
        '            <option>Checkbox</option>\n' +
        '            <option>PhoneNumber</option>\n' +
        '            <option>LongAnswer</option>\n' +
        '        </select>\n' +
        '    </div>\n' +
        '\n' +
        '    </div>\n' +
        ' <div style="padding: 5px" class="add-del">\n' +
        '        <button onclick="addDivCb(this)">add</button>\n' +
        '        <button disabled>delete</button>\n' +
        '    </div>  ')

}
function addElementCb(obj,divNum){
    console.log(obj,obj.value)
    colName.push(obj.value)
    if(obj.value === "PhoneNumber"){
        phoneNumberCb(divNum)
    }
    else if (obj.value === "ShortAnswer"){
        nameCb(divNum)
    }
    else if (obj.value === "LongAnswer"){
        nameCb(divNum)
    }
    else if (obj.value === "Email"){
        emailCb(divNum)
    }
    else if (obj.value === "Radio"){
        radioCb(divNum)
    }
    else if (obj.value === "Checkbox"){
        checkboxCb(divNum)
    }
}

function nameCb(divNum){
    $("#add-choice-div"+divNum).children().remove()
    $("#add-choice-div"+divNum).append('<input  class="text-input1 add-choice-inputs" type="text" ' +
        'placeholder="ShortAnswer"><br>')
}

function phoneNumberCb(divNum){
    $("#add-choice-div"+divNum).children().remove()
    $("#add-choice-div"+divNum).append('<input  class="text-input1 add-choice-inputs" type="number" ' +
        'placeholder="Your Number" ><br>')
}

function emailCb(divNum){
    $("#add-choice-div"+divNum).children().remove()
    $("#add-choice-div"+divNum).append('<input  class="text-input1 add-choice-inputs" type="email" ' +
        'placeholder="Your Email" ><br>')
}

function radioCb(divNum){
    $("#add-choice-div"+divNum).children().remove();
    ques = $("#ques-id").val();
    $("#add-choice-div"+divNum).append('<div class="radio-div add-choice-inputs radio '+ques+'"" id="radio-div-id'+divNum+'"><input type="radio"  ' +
        'id="male" name='+ques+'  value="male">' +
        '<input for="male" class="input-radio" type="text" value="option"><button ' +
        'onclick="radioAddCb('+divNum+')">+</button><br></div><br>')
}
function radioAddCb(divNum){
    ques = $("#ques-id").val();
    $("#radio-div-id"+divNum).append('<input type="radio"  id="male" name='+ques+' class='+ques+' value="female">' +
        '<input for="male" class="input-radio" type="text" value="option"><button onclick="radioAddCb('+divNum+')">+</button><br>')
}
function checkboxCb(divNum){
    $("#add-choice-div"+divNum).children().remove();
    ques = $("#ques-id").val();
    $("#add-choice-div"+divNum).append('<div class="checkbox-div add-choice-inputs checkbox" id="checkbox-div-id'+divNum+'"><input type="checkbox"  ' +
        'id="male" name='+ques+' class="add-choice-inputs '+ques+'" value="male">' +
        '<input for="male" class="input-checkbox" type="text" value="option"><button onclick="checkboxAddCb('+divNum+')">+</button><br></div><br>')
}
function checkboxAddCb(divNum){
    ques = $("#ques-id").val();
    $("#checkbox-div-id"+divNum).append('<input type="checkbox"  id="male" name='+ques+' class='+ques+' value="female">' +
        '<input for="male" class="input-checkbox" type="text" value="option"><button ' +
        'onclick="checkboxAddCb('+divNum+')">+</button><br>')
}
function deleteCb(obj,index){
    div = $(".add-div");
    addDiv = $(".add-del");
    div[index].remove();
    addDiv[index].remove();
}
function submitcb(){
    questionDiv = $(".add-div");
    questionArray=[];
    constrainsArray = [];
    inputsArray=[];
    result=[]
    for(i=0;i<questionDiv.length;i++){
        temp = questionDiv[i].children[0].value;
        temp1 = questionDiv[i].children[1].checked;
        questionArray.push(temp+"-"+temp1)

    }
    choiceInputs = $(".add-choice-inputs");
    for(i=0;i<choiceInputs.length;i++){
        classArr = choiceInputs[i].className.split(" ");
        for(j=0;j<classArr.length;j++){
            if(classArr[j] === "radio"){
                    temparr=[]
                for(ii=1;ii<choiceInputs[i].children.length;ii+=4){
                    temparr.push(choiceInputs[i].children[ii].value)
                }

                //inputsArray.push({'radio':temparr})
                result.push({[questionArray[i]]:{'radio':temparr}})
            }
            else if(classArr[j] === "text-input1"){
                temp = choiceInputs[i].placeholder
                //inputsArray.push({'text':[temp]})
                result.push({[questionArray[i]]:{'text':[temp]}})
            }
            else if(classArr[j] === "checkbox"){
                      temparr=[]
                for(ii=1;ii<choiceInputs[i].children.length;ii+=4){
                    temparr.push(choiceInputs[i].children[ii].value)
                }

                //inputsArray.push({'checkbox':temparr})
                result.push({[questionArray[i]]:{'checkbox':temparr}})

            }

        }
    }
    console.log(inputsArray,questionArray,result)

    formName = document.getElementById("formName").value
     $.ajax({
   url:"/homesubmit",
   data: JSON.stringify({'formdata': result,'formName':formName}),
   dataType:'json',
   contentType:'application/json',
   type: 'POST',

   success: function (res, status) {
      document.getElementById("container").style.display="none";
      $("body").append('<div id="container"><h>127.0.0.1:5000/register?'+formName+'</h></div>')




   },
   error: function (res) {

     document.getElementById("container").style.display="none";
      $("body").append('<div id="container"><h>127.0.0.1:5000/register?'+formName+'</h></div>')
      $("body").append('<div id="container"><h>127.0.0.1:5000/enquiries?'+formName+'</h></div>')

   }
});
}
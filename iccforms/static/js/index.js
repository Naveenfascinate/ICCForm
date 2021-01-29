colName = []
function addElementCb(obj){
    console.log(obj,obj.value)
    colName.push(obj.value)
    if(obj.value === "PhoneNumber"){
        phoneNumberCb()
    }
    else if (obj.value === "Name"){
        nameCb()
    }
    else if (obj.value === "Email"){
        emailCb()
    }
    else if (obj.value === "Gender"){
        genderCb()
    }
    else if (obj.value === "Subject"){
        subjectCb()
    }
    obj.value="Add";
}

function nameCb(){
    $("#form-parent-div").append('<fieldset><legend>Name</legend>' +
        '<input type="text"></fieldset>')
}

function phoneNumberCb(){
    $("#form-parent-div").append('<fieldset><legend>PhoneNumber</legend>' +
        '<input type="number" ></fieldset>')
}

function emailCb(){
    $("#form-parent-div").append('<fieldset><legend>Email</legend>' +
        '<input type="email"></fieldset>')
}

function genderCb(){
    $("#form-parent-div").append('<fieldset><legend>Gender</legend>' +
        '<input type="radio" id="male" name="gender" value="male">' +
        '<label for="male">Male</label><br>' +
        '<input type="radio" id="male" name="gender" value="male">' +
        '<label for="male">Female</label><br>' +
        '<input type="radio" id="male" name="gender" value="male">' +
        '<label for="male">Other</label><br>' +
        '</fieldset>')
}

function subjectCb(){
    $("#form-parent-div").append('<fieldset><legend>Subject</legend>' +
        '<input type="radio" id="male" name="subject" value="male">' +
        '<label for="male">Maths</label><br>' +
        '<input type="radio" id="male" name="subject" value="male">' +
        '<label for="male">Computer</label><br>' +
        '<input type="radio" id="male" name="subject" value="male">' +
        '<label for="male">Science</label><br>' +
        '</fieldset>')
}
function submitcb(){
    temp = document.getElementById("formName").value
    colName.push(temp)
     $.ajax({
   url:"/confim",
   data: {'getdata': colName},
   type: 'POST',

   success: function (res, status) {
      document.getElementById("parent-div").style.display="none";
      $("body").append('<h>127.0.0.1:5000/register?'+temp+'</h>')




   },
   error: function (res) {
     alert(res.status);
   }
});
}
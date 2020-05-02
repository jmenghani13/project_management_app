
$(document).ready(function () {

  function1(function2);
  update();
  task_check();


  var aweInput = new Awesomplete(search_box);
  search_box.addEventListener('awesomplete-select', function(e) {
  var url = e.text.value;
  console.log('navigating to: ' + url)
  e.preventDefault();
  e.target.value = e.text.label;
  aweInput.close();
  window.location.href = url;
});


  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });


  $(window).resize(function(e) {
    if($(window).width()<=768){
      $("#wrapper").removeClass("toggled");
    }else{
      $("#wrapper").addClass("toggled");
  }
  });


  $("#btn_drop1").click(function () {
      $(this).text(function(i, text){
          return text === "arrow_right" ? "arrow_drop_down" : "arrow_right";
      });

   });

   $("#btn_drop2").click(function () {

       $(this).text(function(i, text){
         return text === "arrow_right" ? "arrow_drop_down" : "arrow_right";
       });
    });



    $("#btn7_1").click(function(){

      if($("#btn7_1").html()=='<i class="material-icons" id="btn7_2">check</i>Mark Compelete')
      {
        $("#btn7_1").html('<i class="material-icons" id="btn7_2">check</i>Compeleted');
        $("#btn7_1").css({"color":"#ffffff","background-color":"#2dce17","border":"1px solid #2dce17"});
      }
      else {
        $("#btn7_1").html('<i class="material-icons" id="btn7_2">check</i>Mark Compelete');
        $("#btn7_1").css({"color":"#9ca6af","background-color":"#ffffff","border":"1px solid #9ca6af"});
      }
      console.log("hhhhhhhh");
    });

    $("#add_link").click(function(){
      $("#add_link").hide();
      $("#add_input").show();
      $("#btn17").show();
    });

    $("#btn17").click(function(){
      var pro_name=$("#add_inputtext").val();
      if(pro_name !== "")
      {
        $("#add_input").hide();
        $("#btn17").hide();
        $("ul#pro_list").append('<li class="projects"><span class="text-pro2">'+pro_name+'</span></li>');
      }
    });

    $("#btn9").click(function(){
      $("#btn9").css({"color":"#0fc3db"});
      $(".tooltiptext4").hide();
      $("#dropdown-content-css").show();
    });

  var colorOrig=$("#btn9").css('color');
   $("#btn9").hover(
   function() {
       //mouse over
       $(this).css('color', '#000000')
   }, function() {
       //mouse out
       $(this).css('color', colorOrig)
   });

   $("#btn15_1").click(function(){
     $("#btn15_1").hide();
     $("#assign").show();
     $("#btn18").show();
   });

   $("#btn16_1").click(function(){
     $("#btn16_1").hide();
     $("#due_date").show();
     $("#btn19").show();
   });

   $("#btn18").click(function(){
     $("#assign").hide();
     $("#btn18").hide();
     $("#btn15_1").css("color","#000000");
     $("#btn15_1").html('<i class="material-icons" id="btn15_2">account_box</i> '+$("#add_assignee").val());
     $("#btn15_1").show();
   });

   $("#nt").click(function(){
     $("#btn1").trigger("click");
   });

   $("#it2").on("click",function(){
     $("#it2").css("color","#24d4e4");
     $("#it1").css("color","#000000");
     $("#div1").hide();
     $("#div2").show();
   });

   $("#it1").on("click",function(){
     $("#it1").css("color","#24d4e4");
     $("#it2").css("color","#000000");
     $("#div2").hide();
     $("#div1").show();
   });

   $("#btn19").click(function(){
     $("#due_date").hide();
     $("#btn19").hide();
     $("#btn16_1").css("color","#000000");
      $("#btn16_1").html('<i class="material-icons" id="btn16_2">date_range</i>Due Date : '+$("#date").val());
     $("#btn16_1").show();
   });

      var date_input=$('input[name="date"]'); //our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'dd/mm/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      date_input.datepicker(options);




   //prepend item in list
   /*$("").click(function () {
     $("#add_project").prepend($("<li></li>").text("hello"));
 	   //$("<li></li>").text("prependTo() item").prependTo("#olTestList3");
  });*/

});

$(document).mouseup(function (e) {

      /*con2 options*/
      $("#dropdown-content-css").hide();
      $(".tooltiptext4").show();
      $("#btn9").css({"color":"#9ca6af"});
      /**/


     /*add_input*/
     var container = $("#add_input");
     var button=$("#btn17");
     if(!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target) && button.has(e.target).length === 0) {
          $("#add_input").hide();
          $("#btn17").hide();

        if($("#pro_list li").length===0)
         {
          $("#add_link").show();
        }
     }
     /**/

     /*due_date*/
     var container = $("#assign");
     var button=$("#btn18");
     if(!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target) && button.has(e.target).length === 0) {
          $("#assign").hide();
          $("#btn18").hide();
          $("#btn15_1").show();
     }
     /**/

     /*assign*/
     var container = $("#due_date");
     var button=$("#btn19");
     if( !button.is(e.target)  && button.has(e.target).length===0 && !container.is(e.target) && container.has(e.target).length === 0) {
          $("#due_date").hide();
          $("#btn19").hide();
          $("#btn16_1").show();
     }
     /**/



});

task_check = function(){
  if($("#task_list").text()=="")
  {
    $(".con").html("<span id='no_task'>No task due in the next five days </span>");
  }
}





update = function (){

  $('.logs').each(function(){
    var time = $(this).find('span').text();
    var now = moment(time).fromNow();
    $(this).find('small').text(now);
  });



  setTimeout(update, 20000);

};


update2 = function (){

  $('#activity_log').each(function(){
    console.log("updating");
  });

  setTimeout(update2, 20000);
};






function1 = function(callback){

      $("#wrapper").toggleClass("toggled");
      callback();
}

function2 = function(){
  $("#wrapper").css({"-webkit-transition:":"all 0.5s ease","-moz-transition:":"all 0.5s ease","-o-transition":"all 0.5s ease","transition":"all 0.5s ease"});
  $("#sidebar-wrapper").css({"display":"block","-webkit-transition:":"all 0.5s ease","-moz-transition:":"all 0.5s ease","-o-transition":"all 0.5s ease","transition":"all 0.5s ease"});
}


function put_request(){
    $.ajax({
    url: document.URL,
    type: 'PUT',
    data:{
      name: $("#task_name").val(),
      due_date: $("#date").val(),
      description: $("#task_description").val(),
      assigned_to: $("#add_assignee").val(),
      project: $("#add_inputtext").val(),
    },
    success: function(){
             console.log('Update was performed.');
           },
    error: function(err){
        console.log(err.message);
    }
  });
}

function post_request(){
    $.ajax({
    url: document.URL,
    type: 'POST',
    data:{
      email: $("#inputEmail").val(),
    },
    success: function(){
             console.log('Update was performed.');
             }
    });
}

function put_request2(){
    $.ajax({
    url: document.URL,
    type: 'PUT',
    data:{
      status: $("#btn7_1").text(),
    },
    success: function(){
             console.log('Update was performed.');
           },
    error: function(res){
      console.log(res.error);
    }
    });
}



function hideshow1() {
  var list = document.getElementById('add_project');

  if (list.style.display === "none") {
  list.style.display = "block";
  } else {
  list.style.display = "none";
  }
}

function validate(){
    if ($('#inputEmail').val().length    >   0) {
        $("#btn21").prop("disabled", false);
        $("#btn21").removeClass("btn-default");
        $("#btn21").addClass("btn-primary");
    }
    else {
        $("btn21").prop("disabled", true);
        $("#btn21").addClass("btn-default");
        $("#btn21").removeClass("btn-primary");
    }
  }



function hideshow2() {
  var list = document.getElementById('no_task');
  var list2 = document.getElementById('task_list');
  if(list !== null)
  {
  if (list.style.display === "none") {
  list.style.display = "block";
  } else {
  list.style.display = "none";
}
}
else{
    if (list2.style.display === "none") {
    list2.style.display = "block";
    } else {
    list2.style.display = "none";
    }
  }
}

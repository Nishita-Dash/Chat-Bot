var $messages = $('.messages-content');
var serverResponse = "wala";
 var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}
function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}
$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    serverMessage("hello i am customer support bot");
    speechSynthesis.speak( new SpeechSynthesisUtterance("hello I am a customer support bot"))
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  fetchmsg() 
  
  $('.message-input').val(null);
  updateScrollbar();
}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  //serverMessage("hello");
  //speechSynthesis.speak( new SpeechSynthesisUtterance("hello"))
}

function serverMessage(response2,name) {

  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://raw.githubusercontent.com/mukeshphulwani66/bot-ui/master/css/bot.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    if(name=='pic_from_bucket - custom')
    {
      $('<div height="180"><div id="img-insert" class="message new"><figure class="avatar"><img src="https://raw.githubusercontent.com/mukeshphulwani66/bot-ui/master/css/bot.png" /></figure><img width="200" height="121" src="https://mycasestudy-1.s3.amazonaws.com/'+response2+'.jpg"></div></div>').appendTo($('.mCSB_container')).addClass('new');
    }
    else if (name=='Map')
    {
      $('<div class="message new"><figure class="avatar"><img src="https://raw.githubusercontent.com/mukeshphulwani66/bot-ui/master/css/bot.png" /></figure><a  href="https://www.embedgooglemap.net/en/?gclid=Cj0KCQiAqdP9BRDVARIsAGSZ8AkjJYpASnE-fuLZznTrOf4BfXEzpTSjAmKan0D2zP0YXSAHMFSgxUQaAgLNEALw_wcB" target="_blank">' + response2 + '</a></div>').appendTo($('.mCSB_container')).addClass('new');
      
    }
    else if(name=='joke')
    {
      $('<div class="message new"><figure class="avatar"><img src="https://raw.githubusercontent.com/mukeshphulwani66/bot-ui/master/css/bot.png" /></figure><a  href="https://www.pinterest.es/nativeenglishes/english-jokes/" target="_blank">' + response2 + '</a></div>').appendTo($('.mCSB_container')).addClass('new');
    }
    else if(name=='course')
    {
      $('<div class="message new"><figure class="avatar"><img src="https://raw.githubusercontent.com/mukeshphulwani66/bot-ui/master/css/bot.png" /></figure><a  href="https://www.youtube.com/channel/UC7ZecSTselPy6MXdd3mGyig/videos" target="_blank">' + response2 + '</a></div>').appendTo($('.mCSB_container')).addClass('new');
      
    }
    else if(name=='world' || name=='youtube')
    {
      $('<div class="message new"><figure class="avatar"><img src="https://raw.githubusercontent.com/mukeshphulwani66/bot-ui/master/css/bot.png" /></figure><a  href="https://www.youtube.com/" target="_blank">' + response2 + '</a></div>').appendTo($('.mCSB_container')).addClass('new');
    }
    else
    {
      $('<div class="message new"><figure class="avatar"><img src="https://raw.githubusercontent.com/mukeshphulwani66/bot-ui/master/css/bot.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
    }
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);
}
function fetchmsg(){

     var url = 'http://localhost:8081/send-msg';
      
      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("mymsg"))) {
          data.append(pair[0], pair[1]);
          console.log(pair)
      }
      console.log("abc",data)
        fetch(url, 
        {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
           serverMessage(response.Reply.intent_response,response.Reply.intent_name);
          speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply.intent_response))
         })
          .catch(error => console.error('Error h:', error));
}


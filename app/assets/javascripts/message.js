$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat__messages--message" data-message-id=${message.id}>
         <div class="chat__messages--message--upperMessage">
           <div class="chat__messages--message--upperMessage--name">
             ${message.user_name}
           </div>
           <div class="chat__messages--message--upperMessage--date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat__messages--message--lowerMessage">
           <p class="chat__messages--message--lowerMessage--content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat__messages--message" data-message-id=${message.id}>
         <div class="chat__messages--message--upperMessage">
           <div class="chat__messages--message--upperMessage--name">
             ${message.user_name}
           </div>
           <div class="chat__messages--message--upperMessage--date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat__messages--message--lowerMessage">
           <p class="chat__messages--message--lowerMessage--content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat__messages').append(html);
    $('.chat__messages').animate({ scrollTop: $('.chat__messages')[0].scrollHeight});    
    $('form')[0].reset();
    $('.submit-btn').prop('disabled', false)
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    $('.submit-btn').prop('disabled', false)
});
});
});
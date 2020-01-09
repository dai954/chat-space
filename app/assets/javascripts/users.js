$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  // 非同期通信でそのビューから移動しない間のみ表示させている
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  // inputタグ内で配列を準備しvalueの値を入れている
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});



// 1. 不明点 hamlの%input{name: "group[user_ids][]", type: "hidden", value: user.id}、JS内の
         // let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`
         // の表記
      // 答え  name="group[user_ids][]"は group[user_ids]という箱を準備している。group[user_ids]という表記自体にも意味がある。
      //      一つのgroupに対して複数のidを入れてあるという意味を持っている。任意の表記ではダメ。
      //      inputタグ内で name="group[user_ids][]" を使って value="${userId}" の値を配列の形で用意している
// 2. JavaScriptでのDBへの保存の仕方、$(`#${userId}`)は何か。
      // 答え function addDeleteUser(name, id) 内のid="${id}"を指定していて、function addDeleteUser(name, id)に
      //     function addMember(userId)の内容を追加するため。
// 3. JavaScriptでの、data-user-id="${id}" data-user-name="${name}"、id="${id}"の表記は何のためにあるのか
      //  答え data-user-id="${id}",data-user-name="${name}"は削除、追加などの処理をする時に使用する。
      //      id="${id}"は function addMember(userId)の内容を受け取るために設定されている。

      // ！！！GroupsControllerで user_ids: []がpermitされているのがポイント、GroupsController内でbinding.pryでparamsの中身が確認できる





// $(function(){

//   function appendUser(user){
//     let html = `<div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${user.name}</p>
//                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
//                 </div>`
//                 $("#user-search-result").append(html);
//   };

//   function appendErrMsgToHTML(msg){
//     let html = `
//                <div class="chat-group-user clearfix">
//                 <p class="chat-group-user__name">${msg}</p>
//                </div>`
//                $("#user-search-result").append(html);
//   }

//   $("#user-search-field").on("keyup", function(){
//     let input = $(this).val()
//     $.ajax({
//       type: 'GET',
//       url: '/users',
//       dataType: 'json',
//       data: { keyword: input }
//     })
//     .done(function(users) {
//       $("#user-search-result").empty();
//       if (users.length !==0) {
//         users.forEach(function(user){
//           appendUser(user);
//         });
//       } else if (input.length == 0) {
//         return false;
//       } else {
//         appendErrMsgToHTML("ユーザーが見つかりません")
//       }
//     })
//     .fail(function() {
//       alert("ユーザー検索に失敗しました");
//     })
//   })
// });
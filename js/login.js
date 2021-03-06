(function(){
    document.addEventListener('keydown', function(e){
      const keyCode = e.keyCode;

      if(keyCode == 13){ // Enter key
        login();
      }
    })
})();

async function login(){

    let userEmail = $("#login__id").val();
    let emailType = $("#email-selectbox options:selected").val();
    let email = userEmail + "@" + emailType;
    let userPW = $("#login__password").val();

    if(userEmail === "" || userPW === ""){
        alert("모두 입력해주세요.")
        return;
    }else if(emailType === ""){
        alert("이메일 종류를 선택해주세요."); 
        return;
    }else{
        let userData ={
            userId : email,
            password: userPW
        }

        let response = await $.ajax({
            type: 'post',
            url : `http://localhost:8080/users/logins`,
            contentType : 'application/json',
            data : JSON.stringify(userData),
            beforeSend:()=>{
                $("#login__button").attr("disabled",true);
            },
            error:()=>{
                alert("로그인 에러");
                $("#login__button").attr("disabled",false);
            },
            complete:()=>{
            }
        })

        if(response.message != null){
            $("#login__button").attr("disabled",false);
            alert(response.message)
            return;
        }
    
        window.location.href = "/";
    }
    
}

function gosignup() {
    location.href='signup.html'
}
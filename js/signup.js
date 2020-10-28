let signupInfo = {
    emailFlag:false,
    email   : ""
};

$(document).ready(function(){

    $('.ui.dropdown').dropdown()
        
})


async function signup(){

    const $password      = $("#password").val();
    const $passwordCheck = $("#password-check").val();
    const $name          = $("#name").val();

    if(signupInfo.emailFlag === false){
        alert("이메일을 설정해주세요.")
        return;
    }else if($password != $passwordCheck){
        alert("비밀번호가 일치하지 않습니다.");
    }else{
        
        const userData = {
            email : signupInfo.email,
            password : $password,
            name : $name,
            
        }

        let response = await $.ajax({
            type: 'post',
            url : `http://localhost:8080/users/signups`,
            contentType : 'application/json',
            data : JSON.stringify(userData),
            beforeSend:()=>{
                //$("#loading__container").attr("style","display:inline-block;");
                $("#signup").attr("disabled",true);
            },
            error:()=>{
                $("#signup").attr("disabled",false);
                alert("회원가입 에러");
            },
            complete:()=>{
                //$("#loading__container").attr("style","display:none;");
            }
        })

        if(response.message != null){
            $("#signup").attr("disabled",false);
            alert(response.message)
            return;
        }
    
        alert("로그인 페이지로 이동합니다.");
        window.location.href = "login";
    }
}

async function emailAuth(){
    
    const emailID   = $("#email_input").val();
    const emailType = $("#email-selectbox option:selected").val();
    const email     =  emailID + "@" + emailType;
   
    if(emailID === ""){
        alert("이메일 계정을 입력해주세요."); 
        return;
    }else if(emailType === ""){
        alert("이메일 종류를 선택해주세요."); 
        return;
    }

    const response = await $.ajax({
        type : 'get',
        url : `http://localhost:8080/users/${email}`,
        contentType : 'application/json'
    })

    if(response.email === "ok"){    

        const msg = email + " 이메일을 사용하시겠습니까?";
        if (confirm(msg)!=0) {
            $("#email_input").attr("readonly",true);
            $('email-selectbox').attr("disabled",true);
            signupInfo.emailFlag = true;
            signupInfo.email = email;
        } 
    }else{
        alert("중복된 이메일입니다.")
    }
    
}

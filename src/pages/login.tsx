import {  useState } from "react";
import supabase from "../lib/supabase";


const Login = () => {
    const [pin, setPin] = useState('');
const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('로그아웃 중 오류 발생:', error.message);
  } else {
    // 로그아웃 성공 후 처리 (예: 홈으로 이동 또는 상태 초기화)
    console.log('성공적으로 로그아웃되었습니다.');
    // window.location.href = '/'; // 필요 시 리다이렉트
  }
};

const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log(session);
      console.log(session?.user.email);
      return session?.user;
    };

    return (
        <>
            <div>login page</div>
            <button className="btn"  onClick={async () => {
                const { error } = await supabase.auth.signInWithOtp({
                    email: 'sixtick65@gmail.com',// 'hungh4@naver.com',
                    options:{
                        shouldCreateUser:true,
                    },
                });
                if (error) console.error("발송 실패:", error.message);
  else alert("이메일로 6자리 PIN 번호가 발송되었습니다!");
            }}>login</button>

            <div>
                <input className="input"  type="text" value={pin} onChange={(e)=> setPin(e.target.value)}/>
                <button className="btn"  onClick={async () => {
  const { data, error } = await supabase.auth.verifyOtp({
    email : 'hungh4@naver.com',
    token : pin, // 사용자가 입력한 8자리 숫자
    type: 'email',
  });

  if (error) {
    console.error("인증 실패:", error.message);
  } else {
    console.log("로그인 성공!", data.user);
    setPin("");
  }
}}
                >인증</button>
            </div>
            <button className="btn" onClick={handleSignOut}>로그아웃</button>
            <button className="btn" onClick={checkUser}>checkUser</button>

        </>
    );
}

export default Login;
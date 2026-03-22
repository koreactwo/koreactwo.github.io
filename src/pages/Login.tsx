// import { useState, useEffect } from "react";
import {supabaseAuth, type User } from "../lib/supabase";

const Login = ({user}: {user: User | null}) => {
//   const [user, setUser] = useState<User | null>( null );

//   useEffect(() => {
//   // 현재 세션 확인 및 상태 업데이트
//   supabase.auth.getUser().then(({ data: { user } }) => {
//     setUser(user);
//   });

//   // 인증 상태 변경 감지 (로그인/로그아웃 등)
//   const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//     setUser(session?.user ?? null);
//   });

//   return () => subscription.unsubscribe(); // 클린업
// }, []);



  return (
    <>
      {user 
        ? <a>{user.email}</a>
        :<button className="btn rounded-full btn-ghost hover:text-error hover:scale-110 active:scale-90 transition-transform" onClick={supabaseAuth.signInWithGoogle}>Sign in</button> }

    </>
  );
}

export default Login;
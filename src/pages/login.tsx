import { useState, useEffect } from "react";
import { supabase, supabaseAuth, type User } from "../lib/supabase";

const Login = () => {
  const [user, setUser] = useState<User | null>( null );

  useEffect(() => {
  // 현재 세션 확인 및 상태 업데이트
  supabase.auth.getUser().then(({ data: { user } }) => {
    setUser(user);
  });

  // 인증 상태 변경 감지 (로그인/로그아웃 등)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe(); // 클린업
}, []);



  return (
    <>
      <h1 className="text-3xl font-bold">user: {user?.email}</h1>
      <button className="btn" onClick={supabaseAuth.signInWithGoogle}>로그인</button>
      <button className="btn" onClick={supabaseAuth.signOut}>로그아웃</button>
      <button className="btn" onClick={supabaseAuth.getUser}>getUser</button>

    </>
  );
}

export default Login;
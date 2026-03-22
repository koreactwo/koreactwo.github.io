import { createClient, type User } from "@supabase/supabase-js";


const redirect = import.meta.env.DEV ? 'http://localhost:5173' : 'https://koreactwo.github.io';  // TODO 나중에 전역 으로?
console.log('redirect: ', redirect);
const supabaseUrl = 'https://lyrubjkoihtrgcbfqhjd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5cnViamtvaWh0cmdjYmZxaGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDk0NTIsImV4cCI6MjA4OTYyNTQ1Mn0.0XGb4sXUCsuyAzMeJ5K2lSOnHSDqKdP_2gU7bKEVKY4';

export const supabase = createClient(supabaseUrl, supabaseKey);
export type { User };

const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirect, // 인증 후 돌아올 주소
        },
    });
    console.log(data);
    if (error) console.error('로그인 에러:', error.message);

    return data;
};

const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.error('로그아웃 에러:', error.message);
};

const getUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    console.log(session?.user);
    return session?.user;
};

export const supabaseAuth = { signInWithGoogle, signOut, getUser };

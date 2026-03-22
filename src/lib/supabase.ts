import { createClient, type User } from "@supabase/supabase-js";


const redirect = import.meta.env.VITE_REDIRECT_URL;
console.log('redirect: ', redirect);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


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

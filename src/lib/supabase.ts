import { createClient, type User } from "@supabase/supabase-js";
import type { TodoState } from "../pages/CloudTodo";


// const redirect = import.meta.env.VITE_REDIRECT_URL;
// console.log('redirect: ', redirect);
console.log('origin : ', window.location.origin);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseKey);
export type { User };

const signInWithGoogle = async (path? : string) => {
    console.log('path: ', path);
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            //redirectTo: redirect, // 인증 후 돌아올 주소
            redirectTo: path ?  `${window.location.origin}${path}` : `${window.location.origin}`,
        },
    });
    console.log(data);
    if (error) console.error('로그인 에러:', error.message);

    return data;
};

/**
 * 로그아웃 후 새로고침 실행
 */
const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) console.error('로그아웃 에러:', error.message);
    console.log('로그아웃');
    window.location.reload();
};

const getUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('getUser:', session?.user);
    return session?.user ?? null;
};

export const supabaseAuth = { signInWithGoogle, signOut, getUser };

//------------------------------------------------------------------------- CRUD
const todoCreate = async (text: string) => {
    const { data, error } = await supabase.from('todos').insert([
    { text: text, completed: false }
  ]).select(); // 생성된 데이터를 바로 확인하고 싶을 때 사용
  console.log('todoCreate: ', data, '\n error: ',  error);
  return { data, error };
}

const todoRead = async (id?: number) => {
    const { data, error } = id ? await supabase.from('todos').select().eq('id', id) : 
        await supabase.from('todos').select().order('completed', { ascending: true }).order('id', { ascending: false });
    console.log('todoRead: ', data, '\n error: ',  error);
    return { data, error };
}

const todoDelete = async (id: number) => {
    const { data, error } = await supabase.from('todos').delete().eq('id', id).select();
    console.log('todoDelete: ', data, '\n error: ',  error);
    return { data, error };
}

const todoUpdate = async (todo: TodoState) => {
    const { data, error } = await supabase.from('todos').update(
        { text: todo.text, completed: todo.completed, version: todo.version + 1}
        ).eq('id', todo.id).eq('version', todo.version).select();
    console.log('todoUpdate: ', data, '\n error: ',  error);
    return { data, error };
}


export const supabaseTodo = { todoCreate, todoRead, todoDelete, todoUpdate };


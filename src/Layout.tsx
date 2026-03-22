import { Outlet, Link, type LinkProps } from "react-router";
import { HomeMark, BarsMark } from "./Icons";
import Login from "./pages/Login";
import { supabase, supabaseAuth, type User} from "./lib/supabase";
import { useState, useEffect } from "react";




const MyLink = ({to, children, className, ...props}: LinkProps) => {
  const blur = () => {
  if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
  }
  return (
    <Link to={to} onClick={blur} className={`p-2 ${className}`} {...props}>{children}</Link>
  );

}


export const Layout = () => {
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
       <div className='flex flex-col h-screen mx-auto max-w-160 w-full h-full'> {/* root  */}
         <div className="navbar bg-base-100 shadow-sm">
           <div className="flex-none">
             <button className=" btn btn-circle btn-ghost hover:text-error hover:scale-110 active:scale-90 transition-transform">
                <Link to='/'>
                    <HomeMark />
                </Link>
             </button>
           </div>
           <div className="flex-1">
             <p className="ml-4 text-xl font-bold">SIXTICK</p>
           </div>
           <div className="flex-none">
            <Login user={user}/>

            <div className="dropdown dropdown-end">
      <button className=" btn btn-circle btn-ghost hover:text-error hover:scale-110 active:scale-90 transition-transform"><BarsMark /></button>
      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><MyLink to='/home' >Home</MyLink></li>
        <li><MyLink to='/todolist' >Todo List</MyLink></li>
        {/* <li><Link to='/home' onClick={blur} className={linkStyle}>Home</Link></li>
        <li><Link to='/todolist' onClick={blur} className={linkStyle}>Todo List</Link></li> */}
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        {user ? <li ><a href="#" onClick={(e) => {
          e.preventDefault();
          supabaseAuth.signOut();
          }}>Sign out</a></li>: <a></a>}       
      </ul>
    </div>

             



           </div>
         </div>

         {/* contents */}
         <div className='w-full flex-1 overflow-hidden'>
            <Outlet/>
         </div>


         <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
           <aside className="grid-flow-col items-center mx-auto">
             <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current">
              <path
                d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>Copyright © 2026 - All right reserved by <a className='font-bold' href='https://t.me/sixtick' target='_blank' rel='noreferrer noopener'>sixtick</a></p>
          </aside>
          
        </footer>

      </div>
    </>
    );
}   
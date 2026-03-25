import { Outlet, Link, type LinkProps } from "react-router";
import { HomeMark, BarsMark } from "./Icons";
import { supabaseAuth, type User } from "./lib/supabase";
import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from "react";

type PublicState = {
  mainRect?: DOMRect | undefined | null;
}

type PublicAction = {type: 'SET'; payload: DOMRect | undefined | null;
}

const publicReducer = (state: PublicState, action: PublicAction): PublicState => {
  switch (action.type) {
    case 'SET':
      return {...state, mainRect: action.payload}; // 전개 했다가 뒤에 같은이름이 있으면 뒤에꺼로 덮어씀
    default:
      return state;
  }
}

interface PublicStateContextType {
  state: PublicState;
  dispatch: React.Dispatch<PublicAction>;
}


const PublicStateContext = createContext<PublicStateContextType | undefined>(undefined);

export const PublicStateProvider = ({children}: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(publicReducer, {mainRect: null});
  return (
    <PublicStateContext.Provider value={{state, dispatch}}>
      {children}
    </PublicStateContext.Provider>
    );
}

export const usePublicState = () => {
  const context = useContext(PublicStateContext);
  if (!context) {
    throw new Error('usePublicState must be used within a PublicStateProvider');
  }
  return context;
}



const MyLink = ({ to, children, className, ...props }: LinkProps) => {
  const blur = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
  return (
    <Link to={to} onClick={blur} className={`p-2 ${className}`} {...props}>{children}</Link>
  );

}

type userState = {
  user: User | null;
}

type userAction = {type: 'SIGN_IN';} | 
                  {type: 'SIGN_OUT';} |
                  {type: 'INIT'; payload: User | null};

function userReducer(state: userState, action: userAction): userState {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state}; // 새로 고침되면서 쓸일이 없네
    case 'SIGN_OUT':
      return { ...state};
    case 'INIT':
      return {user:action.payload};
    default:
      return state;
  }
}

const Login = ({user}: userState) => {
  return (
    <>
      {user 
        ? <a>{user.email?.split('@')[0]}</a>
        :<button className="btn rounded-full btn-ghost hover:input-ghost hover:bg-transparent hover:text-error hover:scale-110 active:scale-90 transition-transform" onClick={() => supabaseAuth.signInWithGoogle()}>Sign in</button> }

    </>
  );
}

// type MainRefState = {
//   rect: DOMRect | undefined | null;
// }

// type MainRefAction = {type: 'SET'; payload: DOMRect | undefined | null};

// function mainRefReducer(state: MainRefState, action: MainRefAction): MainRefState {
//   switch (action.type) {
//     case 'SET':
//       return state;
//     default:
//       return state;
//   }
// }

export const Layout = () => {
  const [user, dispatch] = useReducer(userReducer, {user: null});
  const mainRef = useRef<HTMLMetaElement>(null);
  useEffect(() => {
    const initUser = async () => {
      const res = await supabaseAuth.getUser();
      console.log('useEffect', res);
      dispatch({type: 'INIT', payload: res});
    }
    initUser();
  }, []);


  // 변경감지가 구글 로그인이랑 직접적인 연관이 있나보군 ... 세션은 상관없네
  // useEffect(() => {
  //   // 현재 세션 확인 및 상태 업데이트
  //   supabase.auth.getUser().then(({ data: { user } }) => {
  //     console.log(user?.email?.split('@')[0]);
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
      <div className='flex flex-col h-screen mx-auto max-w-160 w-full '> {/* root  */}
        <header className="navbar bg-base-100 shadow-sm">
          <div className="flex-none">
            <button className=" btn btn-circle btn-ghost hover:input-ghost hover:bg-transparent hover:text-error hover:scale-110 active:scale-90 transition-transform mx-2">
              <Link to='/'>
                <HomeMark />
              </Link>
            </button>
          </div>
          <div className="flex-1">
            <p className=" text-xl font-bold">SIXTICK</p>
          </div>
          <div className="flex-none">
            <Login user={user.user} />

            <div className="dropdown dropdown-end">
              <button className=" btn btn-circle btn-ghost hover:input-ghost hover:bg-transparent hover:text-error hover:scale-110 active:scale-90 transition-transform mx-2"><BarsMark /></button>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow">
                <li><MyLink to='/home' >Home</MyLink></li>
                <li><MyLink to='/todolist' >Todo List</MyLink></li>
                <li><MyLink to='/cloudtodo' >Cloud Todo</MyLink></li>
                <li>
                  <details open>
                    <summary>Parent</summary>
                    <ul>
                      <li><a>Submenu 1</a></li>
                      <li><a>Submenu 2</a></li>
                    </ul>
                  </details>
                </li>
                {user.user ? <li ><a href="#" onClick={(e) => {
                  e.preventDefault();
                  supabaseAuth.signOut();
                }}>Sign out</a></li> : <a></a>}
              </ul>
            </div>





          </div>
        </header>

        {/* contents */}
        <main ref={mainRef} className='w-full flex-1 overflow-y-auto '>
          <Outlet context={{rect : mainRef.current?.getBoundingClientRect(), user: user.user}} />
        </main>


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
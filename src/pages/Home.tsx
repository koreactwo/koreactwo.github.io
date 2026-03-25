// import { LoadingMark } from "../Icons";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// import { HeartMark } from "../Icons";
import meImage from "../assets/me.jpg";



const Home = () => {
    
    const [count, setCount ] = useState(0);
    // const [loading, setLoading] = useState<boolean>(false);

    const handleHomeLike = async (type: 'up' | 'down') => {
  const rpcName = type === 'up' ? 'home_like_up' : 'home_like_down';

  // 인자(Parameter) 없이 함수 이름만 호출하면 끝!
  setCount(prev => type === 'up' ? prev + 1 : Math.max(0, prev - 1));
  const { error } = await supabase.rpc(rpcName);

  if (!error) {
    // 화면의 숫자를 즉시 업데이트 (setCount 등 활용)
    
  } else {
    console.error("좋아요 처리 중 오류:", error.message);
    setCount(prev => Math.max(0, prev - 1));
  }
};

    // 1. 처음 로드될 때 현재 숫자 가져오기
  useEffect(() => {
    const fetchCount = async () => {
      const { data } = await supabase.rpc('get_home_like');
      console.log(typeof data, data);
      if (data) setCount(data);
    };
    fetchCount();
  }, []);
    // const getCount = async () => {
    //     setLoading(true);
    //     try {
    //         const res = await fetch('http://localhost:3000/count')
    //         if(res.ok){
    //             const data = await res.json();
    //             console.log(data);
    //             setCount(data.test_count);
    //         }
            
    //     }catch(error){
    //         console.log(error);
    //     }finally{
    //         setLoading(false);
    //     }
    // }
    // const incrementCount = async () => {
    //     try {
    //         const res = await fetch('http://localhost:3000/count/increment', {
    //             method: 'POST'
    //         });
    //         if(res.ok){
    //             const data = await res.json();
    //             console.log('incrementCount', data);
    //             setCount(data.test_count);
    //         }
            
    //     }catch(error){
    //         console.log(error);
    //     }finally{
    //     }
    // }
    
    // // 컴포넌트 시작시 실행
    // useEffect(() => {
    //     getCount();
    // }, []);


    return (
        <>
            <div className="flex flex-col items-center justify-center h-full bg-primary/6">
                {/* <p className="">sixtick home</p> */}
                <div className="grid grid-cols-2 grid-flow-row p-4 gap-2">
                    <img src={meImage} alt= "me" className="  mask mask-squircle shadow-xl"/>
                    <ul className="my-auto mx-auto ">
                        <li>🔹이름 : 조영훈</li>
                        <li>🔹나이 : {new Date().getFullYear() - 1982}</li>
                        <li>🔹사는곳 : 포천 신읍동</li>
                        <li>🔹텔레그램 : <a className="font-bold underline hover:text-blue-500" href="https://t.me/sixtick" target="_blank" rel="noreferrer noopener">sixtick</a></li>
                    </ul>
                </div>
                
                <button className="btn btn-ghost hover:input-ghost hover:bg-transparent hover:scale-110 active:scale-90 transition-transform text-lg" onClick={() => handleHomeLike('up')}>🩷 {count}</button>
                <p className="">Last build : 20260324 2019</p>
            </div>
            





        </>
    );

}

export default Home;
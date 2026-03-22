// import { LoadingMark } from "../Icons";
// import { useState, useEffect } from "react";


const Home = () => {
    // const [count, setCount ] = useState(0);
    // const [loading, setLoading] = useState<boolean>(false);

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
            <div className="flex flex-col items-center justify-center h-screen bg-sky-100">
                <p className="">sixtick home</p>
                <p className="">20260322 1910</p>
            </div>
            





        </>
    );

}

export default Home;
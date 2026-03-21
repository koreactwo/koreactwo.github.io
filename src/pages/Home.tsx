import { LoadingMark } from "../Icons";
import { useState, useEffect } from "react";
import Login from "./login";

const Home = () => {
    const [count, setCount ] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);

    const getCount = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/count')
            if(res.ok){
                const data = await res.json();
                console.log(data);
                setCount(data.test_count);
            }
            
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    const incrementCount = async () => {
        try {
            const res = await fetch('http://localhost:3000/count/increment', {
                method: 'POST'
            });
            if(res.ok){
                const data = await res.json();
                console.log('incrementCount', data);
                setCount(data.test_count);
            }
            
        }catch(error){
            console.log(error);
        }finally{
        }
    }
    
    // 컴포넌트 시작시 실행
    useEffect(() => {
        getCount();
    }, []);


    return (
        <>
            <div>home page
                {/* <SequentialLoadingBar /> */}
            </div>
            <div>
                <button className="btn" onClick={incrementCount}>post</button>
                <button className="btn" onClick={getCount}> {loading ? <LoadingMark/> : "get"} {count}</button>
            </div>

            {/* <LoadingMark className="size-60 text-primary" /> */}


            <Login/>





        </>
    );

}

export default Home;
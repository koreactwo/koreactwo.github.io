import { useRef } from "react";
import { PlusMark } from "../Icons";


export type FloatButtonProps = {
    onClick: () => void;
    top : number;
    left : number;
}   


export const FloatButton = ( props : FloatButtonProps) => {
    const thisTag = useRef<HTMLButtonElement>(null);
    
    // useEffect(() => {
    //     // top, left 받아서 클래스에 넣어줌
    //     console.log('FloatButton useEffect top, left : ', props.top, props.left);
    //     thisTag.current!.style.top = props.top + 'px';
    //     thisTag.current!.style.left = props.left + 'px';
    // }, [props.top, props.left]);


    // 기본적인 위치? 지정? ... 디폴트로 우하단
    return (
        <>
            <button ref={thisTag} 
                style={{top : `${props.top}px`, left : `${props.left}px`}}
                onClick={props.onClick} className="fixed shadow btn btn-square bg-base-100 hover:bg-primary btn-outline btn-primary z-50"><PlusMark /></button>
        </>
    );
}

export default FloatButton;



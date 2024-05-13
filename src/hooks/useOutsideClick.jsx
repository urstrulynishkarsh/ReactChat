import React, {useState, useEffect, useRef} from 'react'

function useOutsideClick(initialValue) {

    const ref = useRef(null);
    const [showEmoji, setShowEmoji] = useState(initialValue);
    const handleClickOutside =(event)=>{
        if(ref.current && !ref.current.contains(event.target)){
            setShowEmoji(false)
        }
    }

    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);
        return()=>{
            document.removeEventListener('click', handleClickOutside, true);
        }

    },[ref])
  return (
    {showEmoji, setShowEmoji, ref}
  )
}

export default useOutsideClick

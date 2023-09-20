import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux/hooks";
import { setViewport } from "../redux/viewport";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

const useWindowWidth = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      const handleResize = () => {
        dispatch(setViewport(getWindowDimensions()));
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  }

export default useWindowWidth
import {useEffect, useRef} from "react";

/**
 Custom hook to get the previous value of a prop
*/
const usePrevious = <T extends {}>(prop: T) => {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = prop;
	});
	return ref.current;
};

export default usePrevious;

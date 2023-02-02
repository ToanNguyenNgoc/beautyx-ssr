import { useEffect } from 'react';

export const useScript = (script_content:any) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = script_content

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [script_content]);
};

export default useScript;
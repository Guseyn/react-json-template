import { useEffect, useState } from "react";

interface ReactJSONTemplateProps {
  src: string;
  headers?: HeadersInit;
  template: (data: any, statusCode?: number|null, headers?: {[key: string]: string}) => JSX.Element;
  fallback?: () => JSX.Element;
}

export function ReactJSONTemplate(props: ReactJSONTemplateProps) {
  const [response, setResponse] = useState({
    data: null,
    statusCode: 0,
    headers: {}
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(props.src, {
        headers: props.headers,
        method: 'GET'
      });
      setResponse({
        statusCode: response.status,
        data: await response.json(),
        headers: response.headers
      });
    })()
  }, [])

  if (!response.data && props.fallback) {
    return props.fallback();
  }
  if (!response.data) {
    return <></>
  }
  return props.template(response.data, response.statusCode, response.headers);
}

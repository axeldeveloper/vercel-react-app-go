import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}

export function getHeder()  {
  return new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
}

export function getOptions(payload, method)  {
  return {
    method: method,
    body: JSON.stringify(payload),
    headers: getHeder(),
  }
}
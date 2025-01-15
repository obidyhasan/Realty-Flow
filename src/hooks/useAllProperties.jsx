import { useEffect, useState } from "react";

const useAllProperties = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch("/propertiesData.json")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  return [properties];
};

export default useAllProperties;

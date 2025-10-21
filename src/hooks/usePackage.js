import { useEffect, useState } from "react";
import axios from "axios";

export const usePackage = () => {
  const [packages, setPackage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await axios.get("http://localhost:5000/package/");
        setPackage(res.data);
      } catch (error) {
        console.log("Error fetching package", error);
      } finally {
        setLoading(false);
      }
    };
    getPackage();
  }, []);
  return { data: packages, loading };
};

import { useEffect, useState } from "react";
import axios from "axios";

export const useVenue = () => {
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVenue = async () => {
      try {
        const res = await axios.get("http://localhost:5000/venue");
        setVenue(res.data)
      } finally {
        setLoading(false);
      }
    };
    getVenue();
    console.log("Data fetch", venue);
  }, []);

  return { data: venue, loading };
};

// src/components/TopCities.jsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getTopCities } from "../services/api";

const TopCities = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopCities(); // fetch top cities from API
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Bar dataKey="orders" fill="#FF5722" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopCities;

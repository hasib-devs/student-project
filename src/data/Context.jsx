/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import useLocalstorage from "./useLocalStorage";
import jsonData from "./data.json";

const DataContext = React.createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [data, setData] = useLocalstorage("data", jsonData);
  const [activeTab, setactiveTab] = useState(1);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const days = 7;
    const dateArray = [];

    for (let i = 0; i < days; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      dateArray.push(currentDate.toISOString().slice(0, 10)); // store date as string in yyyy-mm-dd format
    }
    setDays(dateArray);
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        activeTab,
        setactiveTab,
        days,
        setDays,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = React.useContext(DataContext);
  if (ctx === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return ctx;
};

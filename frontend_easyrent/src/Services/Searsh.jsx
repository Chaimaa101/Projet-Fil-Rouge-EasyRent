import { useState } from "react";

export default function useSearchFilter(data = [], key = "") {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = () => {
    if (!searchTerm) return data;

    return data.filter((item) =>
      item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
}

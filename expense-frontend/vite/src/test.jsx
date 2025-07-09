import { useEffect } from "react";
import api from "./api/axios";

const TestBackend = () => {
  useEffect(() => {
    api.get("/ping")
      .then((res) => console.log("Backend response:", res.data))
      .catch((err) => console.error("Backend error:", err));
  }, []);

  return <div>Check console for backend response</div>;
};

export default TestBackend;

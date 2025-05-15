import type * as React from "react";
import Calendar from "../ui/Calender.tsx";

const Planning: React.FC = () => {
  return (
    <div>
      <div className={"flex flex-col items-center"}>
        <h4 className="font-bold mb-10">Planning</h4>
        <Calendar />
      </div>
    </div>
  );
};

export default Planning;

import React from "react";
import { DeleteIcon } from "lucide-react";

const DisplaySelectedTimeSection = ({
  dateTimeSelection,
  handleRemoveTime,
}) => {
  return (
    <div className=' mt-6'>
      <h2 className=' mb-2'>Selected Date-Time</h2>
      <ul className=' space-y-3'>
        {Object.entries(dateTimeSelection).map(([date, times]) => (
          <li key={date}>
            <div className=' font-medium'>{date}</div>
            <div className=' flex flex-wrap gap-2 mt-1 text-sm'>
              {times.map((time) => (
                <div
                  key={time}
                  className='border border-primary px-2 py-1 flex items-center rounded'>
                  <span>{time}</span>
                  <DeleteIcon
                    onClick={() => handleRemoveTime(date, time)}
                    width={15}
                    className=' ml-2 text-red-500 hover:text-red-700 cursor-pointer'
                  />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySelectedTimeSection;

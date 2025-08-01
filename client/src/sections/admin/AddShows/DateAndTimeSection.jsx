import React from "react";

const DateAndTimeSection = ({
  dateTimeInput,
  setDateTimeInput,
  handleDateTimeAdd,
}) => {
  return (
    <div>
      <div className=' mt-6'>
        <label className=' block text-sm font-medium mb-2'>
          Select Date and Time
        </label>
        <div className=' inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
          <input
            type='datetime-local'
            value={dateTimeInput}
            min='2023-01-01T00:00'
            max='2030-12-31T23:59'
            onChange={(e) => setDateTimeInput(e.target.value)}
            className=' outline-none rounded-md text-gray-400'
          />
          <button
            onClick={handleDateTimeAdd}
            className=' bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'>
            Add Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateAndTimeSection;

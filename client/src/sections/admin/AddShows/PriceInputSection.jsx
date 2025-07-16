import React from "react";

const PriceInputSection = ({ showPrice, currency, setShowPrice }) => {
  return (
    <div className='mt-6'>
      <label className=' block text-sm font-medium mb-2'>Show Price</label>
      <div className=' inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
        <p className=' text-gray-400 text-sm'>{currency}</p>
        <input
          min={0}
          type='number'
          value={showPrice}
          onChange={(e) => setShowPrice(e.target.value)}
          placeholder='Enter Show Price'
          className=' outline-none'
        />
      </div>
    </div>
  );
};

export default PriceInputSection;

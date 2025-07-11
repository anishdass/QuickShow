import React from "react";

const CastSection = ({ show }) => {
  return (
    <div className=' overflow-x-auto no-scrollbar mt-8 pb-4'>
      <div className=' flex items-center gap-4 w-max px-4'>
        {show.movie.casts.slice(0, 12).map((cast) => (
          <div
            key={cast.id}
            className=' flex flex-col items-center text-center'>
            <img
              src={cast.profile_path}
              alt='cast-profile-picture'
              className='rounded-full h-20 aspect-square object-cover'
            />
            <p className=' font-medium text-xs mt-3'>{cast.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;

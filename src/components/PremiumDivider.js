import React from 'react';

const PremiumDivider = () => {
  return (
    <div className="relative h-[1px] w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-[#aa6bfe] to-purple-400"></div>
      <div className="absolute inset-0 shadow-[0_0_8px_#aa6bfe] blur-[1px]"></div>
    </div>
  );
};

export default PremiumDivider;

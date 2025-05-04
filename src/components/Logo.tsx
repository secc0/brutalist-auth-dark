
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <img 
        src="/lovable-uploads/69019202-5799-463a-bd22-1ecb0f4052cf.png" 
        alt="hypeLeads" 
        className="h-12 md:h-16"
      />
    </div>
  );
};

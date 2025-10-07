import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="h-24 bg-gray-900 flex items-center justify-center border-b border-gray-800">
        <div className="w-6 h-6 bg-gray-700 rounded-md"></div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between mb-2">
          {/* Title */}
          <div className="h-3 w-20 bg-gray-700 rounded"></div>
          {/* Menu Button */}
          <div className="h-3 w-3 bg-gray-700 rounded"></div>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-700 rounded"></div>
          <div className="h-3 w-16 bg-gray-700 rounded"></div>
        </div>

        {/* Tag */}
        <div className="h-4 w-12 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;

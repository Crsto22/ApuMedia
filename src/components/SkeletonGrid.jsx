import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Account Header Skeleton */}
        <div className="relative mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Account Info Skeleton */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-40 bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-44 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Pricing Info Skeleton */}
        <div className="border-t pt-4">
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
              <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
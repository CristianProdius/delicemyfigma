"use client";

import React from "react";

export const BlogPostLoading = () => {
  return (
    <div className="min-h-screen">
      <div className="relative h-[500px] bg-gradient-to-br from-[#451C15] to-[#5A241C] animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-4">
            <div className="h-8 w-32 bg-white/20 rounded-full mx-auto" />
            <div className="h-12 w-96 bg-white/20 rounded mx-auto" />
            <div className="h-6 w-64 bg-white/20 rounded mx-auto" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
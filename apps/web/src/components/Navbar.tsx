import React from "react";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <h1 className="cursor-pointer font-bold"> Logo </h1>
          <div className="font flex items-center gap-8 font-medium">
            <h3>Home</h3>
            <h4>write</h4>
            <h5>profile</h5>
          </div>
        </div>
      </div>
    </nav>
  );
};

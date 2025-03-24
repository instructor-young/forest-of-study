import React from "react";

function Page({ children }) {
  return (
    <main id="page" className="mx-auto py-10 max-w-[1200px]">
      {children}
    </main>
  );
}

export default Page;

import React from "react";

export const SectionContainer = ({
  children,
  title,
  actionEl,
}: {
  children: React.ReactNode;
  title: string;
  actionEl?: React.ReactNode;
}) => {
  return (
    <section className="space-y-1 border-0">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold tracking-tight text-gray-900 ">
          {title}
        </h3>
        {actionEl}
      </div>
      <div className="flex flex-col space-y-2 border-l pl-2 sm:pl-4 border-neutral-400 border-solid !mt-2">
        {children}
      </div>
    </section>
  );
};

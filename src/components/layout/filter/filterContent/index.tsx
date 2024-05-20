import clsx from "clsx";
import React from "react";

interface InFilterContent {
  title: string;
  value: string;
  options: InOptions[];
  onClickFilter: (value: InOptions, name:string) => void;
}

export interface InOptions {
  label: string;
  value: string;
}

const FilterContent: React.FC<InFilterContent> = (props) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <span className="text-[#6B7280] font-semibold text-sm">
        {props.title}
      </span>
      <div className="grid grid-cols-3 gap-4">
        {props.options.map((e, i: number) => (
          <button
            className={clsx(
              "py-2 text-[#111827] hover:bg-[#EEE3FF] text-sm rounded-lg border border-[#E5E7EB] font-semibold  hover:border-none hover:text-[#8054C7] ",
              props.value === e.value &&
                "bg-[#EEE3FF] !text-[#8054C7]  !border-none"
            )}
            onClick={() => props.onClickFilter(e, props.title.toLowerCase())}
            key={i}
          >
            {e.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterContent;

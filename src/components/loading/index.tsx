import React from "react";

const Loading = () => {
  return (
    <div  className="relative h-full w-full  ">
      <img
        className="rounded-full h-40 w-40 absolute top-0 bottom-0 left-0 right-0 m-auto "
        src="/video/rick-loading.gif"
        alt="rick loading"
      ></img>
    </div>
  );
};

export default Loading;

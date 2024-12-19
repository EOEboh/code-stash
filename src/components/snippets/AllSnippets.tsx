import { Star } from "lucide-react";
import React from "react";

const AllSnippets = () => {
  return (
    <div className="mt-5 flex flex-wrap gap-5">
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
      <SingleSnippet />
    </div>
  );
};

export default AllSnippets;

const SingleSnippet = () => {
  return (
    <div className="max-sm:w-full w-[320px] rounded-md py-4">
      <SnippetHeader />
      <SnippetTags />
      <SnippetDate />
      <SnippetDescription />
      <SnippetCode />
      <SnippetFooter />
    </div>
  );
};

const SnippetHeader = () => {
  return (
    <div className="flex justify-between mx-4">
      <span className="font-bold text-lg w-[87%]">Title</span>

      <Star aria-label="Favourite" />
    </div>
  );
};
const SnippetTags = () => {
  return (
    <div className="text-[11px] mx-4 flex flex-wrap gap-1 mt-4">
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
      <span className="bg-purple-100 p-1 px-2 rouded-lg">functions</span>
    </div>
  );
};
const SnippetDate = () => {
  return (
    <div className="text-[11px] flex gap-1 font-light mx-4 mt-1">
      19th December, 2024
    </div>
  );
};

const SnippetDescription = () => {
  return (
    <div className="text-[13px] mx-4 mt-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla maxime vero
      neque, molestiae adipisci harum cumque assumenda quam labore fugiat
      dolorum laborum, fugit facilis? Pariatur!
    </div>
  );
};
const SnippetCode = () => {
  return <div>Code Area</div>;
};

const SnippetFooter = () => {
  return <div>Footer</div>;
};

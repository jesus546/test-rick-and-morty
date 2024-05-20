import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_CHARACTER } from "../../queries/queries";

import Loading from "../loading";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  InCommentsCharacter,
  setCommentCharacter,
} from "../../store/characters";
import { clsx } from "clsx";
import DrawerCondition from "../drawerCondition";

const Details = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_SINGLE_CHARACTER, {
    variables: { id },
  });
  const commentsCharacter = useAppSelector(
    (state) => state.characters.commentsCharacters
  );
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(true);

  const dispatch = useAppDispatch();
  const [valueTextArea, setValueTextArea] = React.useState("");
  const filterCommentsCharacter = (
    comments: InCommentsCharacter[]
  ): String[] | undefined => {
    return comments ? comments.find((e) => e.id === id)?.comments : [];
  };

  const handleSubmitComment = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      dispatch(setCommentCharacter({ id: id || "", comment: valueTextArea }));
      setValueTextArea("");
    }
  };
  React.useEffect(() => {
    if (id) {
      setOpenDrawer(true);
    }
  }, [id]);

  return (
    <DrawerCondition openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
      {loading && <Loading />}
      {data && (
        <div className="flex flex-col space-y-4 px-8 py-5  w-full">
          <img
            onClick={() => setOpenDrawer(false)}
            className="  h-5 w-5 md:block 2xl:hidden cursor-pointer  "
            src="/icons/arrowLeft.svg"
            alt="search"
          ></img>
          <div className="flex flex-col ">
            <img
              className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
              src={data.character.image}
              alt={data.character.name || ""}
            ></img>
            <h1 className="text-[#1F2937] font-bold text-2xl">
              {data.character.name || ""}
            </h1>
          </div>

          <div className="flex flex-col pb-3 space-y-0 text-base border-b border-[#E5E7EB]">
            <b className="text-[ #111827]">Specie</b>
            <span className="text-[#6B7280]"> {data.character.species}</span>
          </div>
          <div className="flex flex-col pb-3 space-y-0 text-base border-b border-[#E5E7EB]">
            <b className="text-[ #111827]">Status</b>
            <span className="text-[#6B7280]"> {data.character.status}</span>
          </div>
          <div className="flex flex-col  pb-3 space-y-0 text-base border-b border-[#E5E7EB]">
            <b className="text-[ #111827]">Gender</b>
            <span className="text-[#6B7280]"> {data.character.gender}</span>
          </div>

          {filterCommentsCharacter(commentsCharacter)?.length ? (
            <div className="columns-3">
              {filterCommentsCharacter(commentsCharacter)?.map(
                (e, i: number) => (
                  <div
                    key={i}
                    className={clsx(
                      "max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow ",
                      i > 0 && "mt-4"
                    )}
                  >
                    <div className="flex px-4 py-2 border-b items-center gap-4">
                      <img
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={data.character.image}
                        alt={data.character.name}
                      ></img>
                      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-[#111827] ">
                        Comment {i + 1}
                      </h5>
                    </div>

                    <p className="mb-3 font-normal text-justify text-md p-4 text-[#111827] overflow-hidden dark:text-gray-400">
                      {e}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-semibold text-[#111827] ">
              Add your comment
            </label>
            <textarea
              rows={4}
              value={valueTextArea}
              className="block p-2.5 w-full text-sm text-[#111827] bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-[#8054C7] focus:border-blue-[#8054C7] outline-none"
              placeholder="Write your thoughts here..."
              maxLength={300}
              onChange={(e) => setValueTextArea(e.target.value)}
              onKeyDown={handleSubmitComment}
            ></textarea>
          </div>
        </div>
      )}
    </DrawerCondition>
  );
};

export default Details;

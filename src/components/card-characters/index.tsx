import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDeleteStarredCharacters,
  setStarredCharacters,
} from "../../store/characters";

export interface InCharacter {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  location: Location;
}
export interface Location {
  name: string;
}
export const CardCharacter: React.FC<InCharacter> = (props) => {
  const [hoverCharacter, setHoverCharacter] = React.useState<boolean>(false);
  const valuesStarredCharacter = useAppSelector(
    (state) => state.characters.starredCharacters
  );
  const dispatch = useAppDispatch();
  const updatedStarredCharacters = () => {
    if (valuesStarredCharacter?.includes(props.id)) {
      dispatch(setDeleteStarredCharacters(props.id));
    } else {
      dispatch(setStarredCharacters(props.id));
    }
  };
  return (
    <div className="flex relative flex-col w-full py-1 group border-t border-[#E5E7EB] ">
      <Link
        to={`/character/${props.id}`}
        className="hover:bg-[#EEE3FF]  cursor-pointer  py-4 flex justify-between gap-4 items-center px-5 rounded-lg"
      >
        <div className="flex items-center gap-4">
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={props.image}
            alt={props.name + "-"}
          ></img>
          <div className="flex flex-col space-y-0 text-base">
            <b className="text-[#111827]">{props.name}</b>
            <span className="text-[#6B7280]">{props.species}</span>
          </div>
        </div>
      </Link>
      <div
        onMouseOver={() => setHoverCharacter(true)}
        onMouseOut={() => setHoverCharacter(false)}
        onClick={updatedStarredCharacters}
        className="absolute right-4 top-7 bottom-0 cursor-pointer h-9 group w-9 z-10 flex items-center group-hover:bg-white rounded-full justify-center"
      >
        <img
          className=" h-4 w-4 "
          src={
            valuesStarredCharacter?.includes(props.id) || hoverCharacter
              ? "/icons/hearth.svg"
              : "/icons/hearthOutline.svg"
          }
          alt="hearth"
        ></img>
      </div>
    </div>
  );
};

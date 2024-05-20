import React from "react";
import Search from "../search";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARACTERS } from "../../../queries/queries";
import { CardCharacter, InCharacter } from "../../card-characters";
import { useAppSelector } from "../../../hooks/redux";
import clsx from "clsx";

const Sidebar: React.FC = () => {
  const selectFilter = useAppSelector(
    (state) => state.characters.filterCharacters
  );
  const valuesStarredCharacter = useAppSelector(
    (state) => state.characters.starredCharacters
  );
  const [searchCharacter, setSearchCharacter] = React.useState("");
  const { data } = useQuery(GET_ALL_CHARACTERS, {
    variables: { name: searchCharacter, ...selectFilter },
  });

  const allCharactersSort = (
    array: InCharacter[],
    filtro: string[],
    starred: boolean
  ): InCharacter[] => {
    let newArray: InCharacter[] = [];
    if (starred) {
      newArray = array
        ? array.filter((elem: InCharacter) => filtro.includes(elem.id))
        : [];
    } else {
      newArray = array
        ? array.filter((elem: InCharacter) => !filtro.includes(elem.id))
        : [];
    }
    if (selectFilter.sort === "down") {
      newArray = newArray.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (selectFilter.sort === "up") {
      newArray = newArray.sort((a, b) => b.name.localeCompare(a.name));
    }

    return newArray;
  };
  return (
    <div className="bg-[#FBFBFB] py-7 px-3 h-full 2xl:w-1/3 md:w-full">
      <div className="space-y-4">
        <h1 className="text-[#1F2937] font-bold text-2xl">
          Rick and Morty list
        </h1>
        <Search
          setSearchCharacter={setSearchCharacter}
          searchCharacter={searchCharacter}
        />
      </div>
      {allCharactersSort(
        data?.characters?.results,
        valuesStarredCharacter,
        true
      ).length ? (
        <div className="pt-4 h-1/4">
          <span className="text-[#6B7280] px-4">
            Starred Characters (
            {
              allCharactersSort(
                data?.characters?.results,
                valuesStarredCharacter,
                true
              ).length
            }
            )
          </span>
          <div className="overflow-auto py-2  pr-2 h-full ">
            {allCharactersSort(
              data?.characters?.results,
              valuesStarredCharacter,
              true
            ).map((e: InCharacter, i: number) => (
              <CardCharacter {...e} key={i} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div
        className={clsx(
          "pt-8  ",
          allCharactersSort(
            data?.characters?.results,
            valuesStarredCharacter,
            true
          ).length
            ? "h-[59%] "
            : "h-[83.33%]"
        )}
      >
        <span className="text-[#6B7280] px-4 py-6 ">
          Characters (
          {allCharactersSort(
            data?.characters?.results,
            valuesStarredCharacter,
            false
          ).length || 0}
          ){" "}
        </span>
        <div className="overflow-auto py-2 pr-2 pt-3 h-full">
          {allCharactersSort(
            data?.characters?.results,
            valuesStarredCharacter,
            false
          ).map((e: InCharacter, i: number) => (
            <CardCharacter {...e} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

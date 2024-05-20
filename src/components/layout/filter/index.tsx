import React from "react";
import Popover from "@mui/material/Popover";
import FilterContent, { InOptions } from "./filterContent";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux/index";
import {
  setFilterCharacter,
  InFilterCharacter,
} from "../../../store/characters/index";
import DrawerCondition from "../../drawerCondition";
import useWindow from "../../../hooks/useWindows";

const Filter = () => {
  const onlyWidth = useWindow();
  const selectFilter = useAppSelector(
    (state) => state.characters.filterCharacters
  );
  const dispatch = useAppDispatch();
  const [selectFilterContent, setSelectFilterCharacter] =
    React.useState<InFilterCharacter>(selectFilter);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onlyWidth.width <= 767 ? setOpenDrawer(true) : setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const statusOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Alive",
      value: "alive",
    },
    {
      label: "Dead",
      value: "dead",
    },
    {
      label: "Unknown",
      value: "unknown",
    },
  ];

  const genderOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Genderless ",
      value: "genderless ",
    },
    {
      label: "Unknown ",
      value: "unknown ",
    },
  ];
  const spechiesOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Human",
      value: "human",
    },
    {
      label: "Alien",
      value: "alien",
    },
    {
      label: "Unknown",
      value: "unknown",
    },
  ];
  const orderOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "A-Z",
      value: "down",
    },
    {
      label: "Z-A",
      value: "up",
    }
  ];

  const handlerFilter = (e: InOptions, name: string) => {
    let newResult = { ...selectFilterContent };

    const returnResult = Object.assign(newResult, { [name]: e.value });
    setSelectFilterCharacter(returnResult);
  };

  const onSubmit = () => {
    dispatch(setFilterCharacter(selectFilterContent));
    handleClose();
    setOpenDrawer(false);
  };
  const returnChildren = (): React.ReactNode => {
    return (
      <>
       <FilterContent
          title="Sort"
          onClickFilter={handlerFilter}
          options={orderOptions}
          value={selectFilterContent.sort}
        />
        <FilterContent
          title="Status"
          onClickFilter={handlerFilter}
          options={statusOptions}
          value={selectFilterContent.status}
        />
        <FilterContent
          title="Species"
          onClickFilter={handlerFilter}
          options={spechiesOptions}
          value={selectFilterContent.species}
        />
        <FilterContent
          title="Gender"
          onClickFilter={handlerFilter}
          options={genderOptions}
          value={selectFilterContent.gender}
        />
      </>
    );
  };

  return (
    <>
      <button
        aria-describedby={id}
        className="group h-10 w-10 hover:bg-[#EEE3FF]  flex items-center justify-center  rounded-md"
        onClick={handleClick}
      >
        <img
          className=" h-4 w-4 block group-hover:hidden "
          src="/icons/iconFilter.svg"
          alt="search"
        ></img>
        <img
          className=" h-4 w-4 hidden group-hover:block "
          src="/icons/iconFilterActive.svg"
          alt="search"
        ></img>
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        PaperProps={{
          style: {
            width: "23%",
          },
        }}
        className="w-full"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="w-full p-5 space-y-4 ">
          {returnChildren()}
          <button
            onClick={onSubmit}
            className="bg-[#F3F4F6] font-medium hover:bg-[#8054C7] text-sm w-full hover:text-white text-[ #6B7280] rounded-lg py-3"
          >
            Filter
          </button>
        </div>
      </Popover>
      <DrawerCondition openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
        <div className="w-full h-full  flex-col hidden  sm:flex  justify-between p-5  ">
          <div className="w-full space-y-4">
            <div className="w-full relative text-[ #111827] text-center">
              <img
                onClick={() => setOpenDrawer(false)}
                className=" absolute top-1 left-1 h-5 w-5 block cursor-pointer  "
                src="/icons/arrowLeft.svg"
                alt="search"
              ></img>
              <b>Filter</b>
            </div>
            {returnChildren()}
          </div>

          <button
            onClick={onSubmit}
            className="bg-[#F3F4F6] font-medium hover:bg-[#8054C7] text-sm w-full hover:text-white text-[ #6B7280] rounded-lg py-3"
          >
            Filter
          </button>
        </div>
      </DrawerCondition>
    </>
  );
};

export default Filter;

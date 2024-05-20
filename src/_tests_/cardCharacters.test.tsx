import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { CardCharacter } from "../components/card-characters";
import { renderWithProviders } from "../configureStore/setupStore";
import { RootState } from "../store/store";
import { BrowserRouter as Router } from "react-router-dom";

describe("CardCharacter Component", () => {
  let initialState: RootState;

  beforeEach(() => {
    initialState = {
      characters: {
        commentsCharacters: [],
        filterCharacters: {
          species: "",
          gender: "",
          status: "",
          sort: ""
        },
        starredCharacters: ["1", "2"],
      },
    };
  });

  it("renders correctly", () => {
    renderWithProviders(
      <Router>
        <CardCharacter
          id="1"
          name="Test Character"
          image="/path/to/image.jpg"
          status="Alive"
          species="Human"
          location={{ name: "Earth" }}
        />
      </Router>,

      {
        preloadedState: initialState,
      }
    );

    expect(screen.getByText("Test Character")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
  });

  it("toggles star icon on click", () => {
    renderWithProviders(
      <Router>
        <CardCharacter
          id="1"
          name="Test Character"
          image="/path/to/image.jpg"
          status="Alive"
          species="Human"
          location={{ name: "Earth" }}
        />
      </Router>,
      {
        preloadedState: initialState,
      }
    );

    const starIcon = screen.getByAltText("hearth") as HTMLImageElement;
    expect(starIcon.src).toContain("http://localhost/icons/hearth.svg");
    fireEvent.click(starIcon);
    expect(starIcon.src).toContain("http://localhost/icons/hearthOutline.svg");
  });
});

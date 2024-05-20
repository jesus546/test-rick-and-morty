import React from "react";
import { screen, fireEvent, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { useParams } from "react-router-dom";

import Details from "../components/details";
import { GET_SINGLE_CHARACTER } from "../queries/queries";
import { RootState } from "../store/store";
import { renderWithProviders } from "../configureStore/setupStore";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockCharacterData = {
    request: {
      query: GET_SINGLE_CHARACTER,
      variables: { id: "1" }, 
    },
    result: {
      data: {
        character: {
          id: "1",
          name: "Rick Sanchez",
          image: "/path/to/image.jpg",
          species: "Human",
          status: "Alive",
          gender: "Male",
          location: { name: "earth" },
          origin: { name: "earth" },
          type: ""
        },
      },
    },
  };
  

const initialState: RootState = {
  characters: {
    commentsCharacters: [
      {
        id: "1",
        comments: ["Test comment 1", "Test comment 2"],
      },
    ],
    filterCharacters: {
      species: "",
      gender: "",
      status: "",
      sort: ""
    },
    starredCharacters: [],
  },
};

describe("Details Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("renders loading state initially", () => {
    renderWithProviders(
      <MockedProvider mocks={[mockCharacterData]} addTypename={false}>
        <Details />
      </MockedProvider>,
      {
        preloadedState: initialState,
      }
    );

    expect(screen.getByAltText(/rick loading/i)).toBeInTheDocument();
  });

  it("renders character details correctly", async () => {
    renderWithProviders(
      <MockedProvider mocks={[mockCharacterData]} addTypename={false}>
        <Details />
      </MockedProvider>,
      {
        preloadedState: initialState,
      }
    );

    expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText(/specie/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
  });

  it("renders comments correctly", async () => {
     renderWithProviders(
      <MockedProvider mocks={[mockCharacterData]} addTypename={false}>
        <Details />
      </MockedProvider>,
      {
        preloadedState: initialState,
      }
    );

    expect(await screen.findByText("Test comment 1")).toBeInTheDocument();
    expect(screen.getByText("Test comment 2")).toBeInTheDocument();
  });

  it("handles adding a new comment", async () => {
    renderWithProviders(
      <MockedProvider mocks={[mockCharacterData]} addTypename={false}>
        <Details />
      </MockedProvider>,
      {
        preloadedState: initialState,
      }
    );

    const textarea = await screen.findByPlaceholderText(
      "Write your thoughts here..."
    );
    fireEvent.change(textarea, { target: { value: "New comment" } });
    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
});

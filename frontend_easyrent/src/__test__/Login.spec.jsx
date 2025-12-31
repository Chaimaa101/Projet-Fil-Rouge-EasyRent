import React from "react"
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import { AuthContext } from "../Context/AuthProvider";

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Component", () => {
  const mockLogin = vi.fn();

  const renderLogin = (errors = {}, loading = false, user = null) => {
    render(
      <AuthContext.Provider value={{ login: mockLogin, errors, loading, user }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it("renders login form correctly", () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Votre email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Se connecter/i })).toBeInTheDocument();
  });

  it("calls login function with correct data", async () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText(/Votre email/i);
    const passwordInput = screen.getByPlaceholderText(/Mot de passe/i);
    const submitButton = screen.getByRole("button", { name: /Se connecter/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("shows errors if provided", () => {
    const errors = { email: "Email est requis", password: "Mot de passe est requis" };
    renderLogin(errors);

    expect(screen.getByText(errors.email)).toBeInTheDocument();
    expect(screen.getByText(errors.password)).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    renderLogin({}, true);
     expect(
    screen.getByRole("button", { name: /Connexion/i, exact: false })
  ).toBeDisabled();
  });
});

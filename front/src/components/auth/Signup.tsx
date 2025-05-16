import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";

const Signup: FC = () => {
  const [signupMethod, setSignupMethod] = useState("public");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchSignup = async ({
    body,
  }: {
    body: {
      email: string;
      password: string;
      role: string;
      firstName: string;
      lastName: string;
    };
  }): Promise<void> => {
    await fetch(`${import.meta.env.VITE_API_HOST}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            enqueueSnackbar(text || "Erreur lors de l'inscription", {
              variant: "error",
            });
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          enqueueSnackbar("Inscription réussie !", { variant: "success" });
          // Redirect to login or home page
          navigate("/login");
        }
      });
  };

  const [signup, setSignup] = useState({
    role: "public",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <AuthLayout>
      <div className="flex justify-center mt-10">
        <ToggleButtonGroup
          color="error"
          value={signupMethod}
          exclusive
          onChange={(_, newAuthMethod) => {
            if (newAuthMethod !== null) {
              setSignupMethod(newAuthMethod);
            }
          }}
          aria-label="Platform"
        >
          <ToggleButton sx={{ width: "130px" }} value="classic">
            Classic
          </ToggleButton>
          <ToggleButton sx={{ width: "130px" }} value="speaker">
            Conférencier
          </ToggleButton>
          <ToggleButton sx={{ width: "130px" }} value="organizer">
            Organisateur
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="login flex justify-center mt-10">
        <div className="flex flex-col items-center w-3/4 max-w-md gap-6">
          <Typography className="text-center">
            Créer-vous un compte afin de consulter nos conférences.
          </Typography>
          <div className="flex flex-col gap-2 w-full">
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                await fetchSignup({
                  body: {
                    role: signupMethod,
                    firstName: signup.firstName,
                    lastName: signup.lastName,
                    email: signup.email,
                    password: signup.password,
                  },
                });
              }}
            >
              <div className="flex flex-row gap-2">
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel sx={{ color: "white" }}>Prénom</InputLabel>
                  <Input
                    sx={{ color: "white" }}
                    onChange={({ target: { value } }) => {
                      setSignup((prev) => ({ ...prev, firstName: value }));
                    }}
                  />
                </FormControl>
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel sx={{ color: "white" }}>Nom</InputLabel>
                  <Input
                    sx={{ color: "white" }}
                    onChange={({ target: { value } }) => {
                      setSignup((prev) => ({ ...prev, lastName: value }));
                    }}
                  />
                </FormControl>
              </div>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel sx={{ color: "white" }}>Email</InputLabel>
                <Input
                  sx={{ color: "white" }}
                  onChange={({ target: { value } }) => {
                    setSignup((prev) => ({ ...prev, email: value }));
                  }}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel sx={{ color: "white" }}>Mot de passe</InputLabel>
                <Input
                  sx={{ color: "white" }}
                  onChange={({ target: { value } }) => {
                    setSignup((prev) => ({ ...prev, password: value }));
                  }}
                  type="password"
                />
              </FormControl>
              <Button
                className="w-full"
                size="large"
                variant="contained"
                type="submit"
              >
                Valider
              </Button>
            </form>
          </div>
          {/* <Button
            className="w-full"
            size="large"
            variant="contained"
            onClick={() => {
              handleLogin();
            }}
          >
            Valider
          </Button> */}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;

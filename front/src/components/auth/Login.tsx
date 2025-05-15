import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import { type FC, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthLayout from "./Layout";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login: FC = () => {
  const [authMethod, setAuthMethod] = useState("speaker");
  const { enqueueSnackbar } = useSnackbar();

  const query = useQuery();
  const privateAuth = query.get("private") === "true";

  const fetchLogin = async ({
    body,
  }: {
    body: { email: string; password: string };
  }): Promise<void> => {
    await fetch(`${import.meta.env.VITE_API_HOST}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            enqueueSnackbar(error.message || "Erreur lors de la connexion", {
              variant: "error",
            });
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          document.cookie = `token=${data.token}; path=/; max-age=86400;`;
          handleLogin();
          enqueueSnackbar("Connexion réussie", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Identifiants incorrects", {
            variant: "error",
          });
          throw new Error("Identifiants incorrects");
        }
      });
  };

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (authMethod === "organizer") {
      window.location.href = "/organizer/management";
    } else {
      window.location.href = "/talk";
    }
  };
  return (
    <AuthLayout>
      {privateAuth && (
        <div className="flex justify-center mt-10">
          <ToggleButtonGroup
            color="error"
            value={authMethod}
            exclusive
            onChange={(_, newAuthMethod) => {
              if (newAuthMethod !== null) {
                setAuthMethod(newAuthMethod);
              }
            }}
            aria-label="Platform"
          >
            <ToggleButton sx={{ width: "200px" }} value="speaker">
              Conférencier
            </ToggleButton>
            <ToggleButton sx={{ width: "200px" }} value="organizer">
              Organisateur
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      )}
      <div className="login flex justify-center mt-10">
        <div className="flex flex-col items-center w-3/4 max-w-md gap-6">
          <Typography className="text-center">
            {!privateAuth
              ? "Connectez-vous afin de consulter les conférences à venir. "
              : `Connectez-vous en tant que ${authMethod === "organizer" ? "organisateur" : "conférencier"
              } afin d'organiser le programme.`}
          </Typography>
          <div className="flex flex-col gap-2 w-full">
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                await fetchLogin({
                  body: {
                    email: login.email,
                    password: login.password,
                  },
                });
              }}
            >
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel sx={{ color: "white" }}>Email</InputLabel>
                <Input
                  sx={{ color: "white" }}
                  onChange={({ target: { value } }) => {
                    setLogin((prev) => ({ ...prev, email: value }));
                  }}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel sx={{ color: "white" }}>Mot de passe</InputLabel>
                <Input
                  sx={{ color: "white" }}
                  onChange={({ target: { value } }) => {
                    setLogin((prev) => ({ ...prev, password: value }));
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
          <Typography className="text-center">
            Pas de compte ?<a href="/signup"> Inscrivez-vous !</a>
          </Typography>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;

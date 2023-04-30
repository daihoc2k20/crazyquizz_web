import reactLogo from "./assets/react.svg";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { Builder } from "./components/Builder";
import { Button } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { authProvider, fireauth } from "./firebase";
import { Home } from "./pages";

function App() {
  const [auth, loading] = useAuth();

  return (
    <>
      <Builder
        isLoading={loading}
        fallback={
          <a className="loading">
            <img src={reactLogo} className="logo react" alt="React logo" />
            loading...
          </a>
        }
      >
        <Builder
          isLoading={!auth}
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                colorScheme="green"
                onClick={() => signInWithPopup(fireauth, authProvider)}
              >
                Login with google
              </Button>
            </div>
          }
        >
          <Home />
        </Builder>
      </Builder>
    </>
  );
}

export default App;

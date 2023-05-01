import reactLogo from "./assets/react.svg";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { Builder } from "./components/Builder";
import { Button } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { authProvider, fireauth } from "./firebase";
import { Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Complete } from "./pages/complete";

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
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/complete/:testid"
              element={
                <>
                  <Complete />
                </>
              }
            ></Route>
          </Routes>
        </Builder>
      </Builder>
    </>
  );
}

export default App;

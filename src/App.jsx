import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Componets/home";
import PlaygroundProvider from "./Componets/Provider/playgroundprovider/playgroundprovider";
import "./App.css";
import Playground from "./playground/playground";
import ModalProvider from "./Componets/Provider/modalProvider/modalProvider";
function App() {
  return (
    <>
      <PlaygroundProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
                {" "}
              </Route>
              <Route path="/playground/:fileId/:folderId" element={<Playground />}>
                {" "}
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </PlaygroundProvider>
    </>
  );
}

export default App;

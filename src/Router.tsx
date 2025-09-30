import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";

export default function Router() {
  return (
    <BrowserRouter>
           <Route  path="/" Component={Home} />
    </BrowserRouter>
  )
}

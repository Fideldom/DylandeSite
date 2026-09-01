import { ThemeProvider } from "@/contexts/ThemeContext";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteLayout } from "./components/SiteLayout";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Software from "./pages/Software";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><SiteLayout><Switch><Route path="/" component={Home} /><Route path="/empresa" component={Company} /><Route path="/servicos" component={Services} /><Route path="/solucoes" component={Solutions} /><Route path="/software" component={Software} /><Route path="/certificacoes" component={Certifications} /><Route path="/contacto" component={Contact} /><Route component={NotFound} /></Switch></SiteLayout></ThemeProvider></ErrorBoundary>;
}

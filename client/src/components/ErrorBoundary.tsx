/**
 * DYLANDE — Navy Precision / Corporate Rebuild
 * Boundary de erro do frontend para evitar ecrãs vazios em produção.
 */
import { Component, type ErrorInfo, type ReactNode } from "react";
export default class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError(){ return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo){ console.error("DYLANDE UI error", error, info); }
  render(){ return this.state.hasError ? <div className="inner-page"><div className="container page-intro"><span className="eyebrow">Sistema temporariamente indisponível</span><h1>Vamos tentar novamente.</h1><p>Atualiza a página para voltar à experiência DYLANDE.</p></div></div> : this.props.children; }
}

/**
 * DYLANDE — Navy Precision / Corporate Rebuild
 * Fallback simples para rotas não encontradas.
 */
import { Link } from "wouter";
export default function NotFound(){return <div className="inner-page"><div className="container page-intro"><span className="eyebrow">404 · Rota não encontrada</span><h1>Este caminho não está no mapa.</h1><p>Volta ao início para explorar as soluções e serviços DYLANDE.</p><Link href="/" className="button button-primary">Voltar ao início</Link></div></div>}

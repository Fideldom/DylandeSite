/**
 * DYLANDE — Navy Precision
 * Página editorial B2B: tipografia forte, composição assimétrica, linhas técnicas e azul atlântico para acções.
 */
import { useEffect, useState } from "react";
import { heroSlides, siteConfig } from "@/lib/siteConfig";
import { useTheme } from "@/contexts/ThemeContext";
import { loadAnalytics, trackEvent } from "@/lib/analytics";
import { toast } from "sonner";
import {
  ArrowUpRight, BarChart3, Boxes, BriefcaseBusiness, Check, ChevronRight, Cloud,
  Code2, Database, FileText, Globe2, Headphones, Menu, Network, Palette,
  Phone, Play, Quote, Send, ShieldCheck, Sparkles, Terminal, X, Moon, Sun,
} from "lucide-react";

const teamImage = "/assets/dylande-team.webp";
const dashboardImage = "/assets/dylande-dashboard.webp";
const markImage = "/assets/dylande-mark.webp";

const navItems = ["Sobre nós", "Serviços", "Softwares", "Soluções", "Projetos", "Contactos"];
const services = [
  [Code2, "Desenvolvimento de software", "Sistemas e aplicações personalizados para os processos reais do seu negócio."],
  [Boxes, "Sistemas de gestão", "Gestão empresarial, financeira, comercial, stock e recursos humanos num só ecossistema."],
  [BriefcaseBusiness, "Consultoria em TI", "Estratégia tecnológica clara para investir melhor, reduzir fricção e crescer com confiança."],
  [Headphones, "Suporte técnico", "Assistência próxima para manter computadores, sistemas e ambientes críticos em funcionamento."],
  [Network, "Redes e infraestrutura", "Configuração, manutenção e optimização de redes preparadas para o dia a dia."],
  [ShieldCheck, "Segurança da informação", "Boas práticas e soluções para proteger sistemas, dados e continuidade operacional."],
  [Cloud, "Cloud e soluções digitais", "Implementação e suporte de ferramentas digitais flexíveis, escaláveis e acessíveis."],
  [Terminal, "Manutenção informática", "Manutenção preventiva e correctiva para equipamentos que não podem parar."],
] as const;
const projects = [
  { name: "Núcleo Gestão", type: "Software", text: "Arquitectura modular para acompanhar operações, equipas e indicadores.", tags: ["React", "Cloud"] },
  { name: "Atlas Comercial", type: "Sistemas", text: "Fluxos comerciais com visão partilhada do cliente e do negócio.", tags: ["Web app", "Dados"] },
  { name: "Portal Connect", type: "Websites", text: "Presença digital com conteúdo claro, performance e conversão.", tags: ["UX", "Frontend"] },
  { name: "Base Operacional", type: "Infraestrutura", text: "Rede e organização de activos para uma operação mais previsível.", tags: ["Redes", "Suporte"] },
];
const filters = ["Todos", "Software", "Websites", "Sistemas", "Infraestrutura"];

function SectionIntro({ index, eyebrow, title, text, light = false }: { index: string; eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-intro ${light ? "section-intro-light" : ""}`}>
    <div className="section-index">{index}</div>
    <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [currentHero, setCurrentHero] = useState(0);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => { loadAnalytics(); }, []);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { const timer = window.setInterval(() => setCurrentHero((index) => (index + 1) % heroSlides.length), 6000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")); if (!("IntersectionObserver" in window)) { nodes.forEach(node => node.classList.add("is-visible")); return; } const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: "0px 0px -36px" }); nodes.forEach(node => observer.observe(node)); return () => observer.disconnect(); }, []);
  const visibleProjects = filter === "Todos" ? projects : projects.filter(p => p.type === filter);
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const data = new FormData(e.currentTarget); trackEvent("contact_form_submit", { service: String(data.get("service") || "") }); const subject = encodeURIComponent(`Solicitação DYLANDE — ${data.get("service") || "novo contacto"}`); const body = encodeURIComponent(`Nome: ${data.get("name")}\nEmpresa: ${data.get("company")}\nEmail: ${data.get("email")}\nTelefone: ${data.get("phone")}\nMensagem: ${data.get("message")}`); toast.success("Pedido preparado", { description: "O seu cliente de email será aberto para concluir o envio." }); window.setTimeout(() => { window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`; }, 250); e.currentTarget.reset(); };
  const closeMenu = () => setMenuOpen(false);

  return <div className="site-shell">
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#inicio" className="brand" onClick={closeMenu}><img src={markImage} alt="" /><span><strong>DYLANDE</strong><small>Prestação de Serviços Comércio Geral</small></span></a>
      <nav className={menuOpen ? "nav-open" : ""}>{navItems.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => { trackEvent("nav_click", { label: item }); closeMenu(); }}>{item}</a>)}<a className="nav-cta" href="#contactos" onClick={closeMenu}>Solicitar orçamento <ArrowUpRight size={16} /></a></nav>
      <div className="header-actions"><button className="theme-button" aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"} title={theme === "dark" ? "Modo claro" : "Modo escuro"} onClick={() => { trackEvent("theme_toggle", { next_theme: theme === "dark" ? "light" : "dark" }); toggleTheme?.(); }}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button><button className="menu-button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => { trackEvent("mobile_menu_toggle", { open: !menuOpen }); setMenuOpen(!menuOpen); }}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>

    <main>
      <section id="inicio" className="hero-section">
        <div className="hero-media" key={heroSlides[currentHero].image} style={{ backgroundImage: `url(${heroSlides[currentHero].image})` }} />
        <div className="hero-overlay" />
        <div className="container hero-content"><div className="hero-copy"><span className="eyebrow hero-eyebrow"><span className="status-dot" /> {heroSlides[currentHero].label}</span><h1>Tecnologia que <em key={heroSlides[currentHero].accent} className="hero-accent">{heroSlides[currentHero].accent}</em> negócios.</h1><p>Menos complexidade no dia a dia. Mais controlo sobre processos, suporte e decisões tecnológicas — com uma equipa próxima para fazer avançar o negócio.</p><div className="hero-actions"><a className="button button-primary" href="#softwares" onClick={() => trackEvent("hero_cta_click", { action: "solutions" })}>Conheça as nossas soluções <ArrowUpRight size={17} /></a><a className="button button-ghost" href="#contactos" onClick={() => trackEvent("hero_cta_click", { action: "contact" })}>Fale connosco <ChevronRight size={17} /></a></div><div className="trust-row">{["Soluções personalizadas", "Suporte especializado", "Tecnologia moderna"].map(x => <span key={x}><Check size={15} />{x}</span>)}</div></div><div className="hero-note"><span>0{currentHero + 1} / 03</span><span>Construímos o próximo passo</span><div className="hero-dots">{heroSlides.map((slide, index) => <button aria-label={`Ver imagem ${index + 1}`} className={index === currentHero ? "active" : ""} onClick={() => { trackEvent("hero_slide_select", { slide: index + 1 }); setCurrentHero(index); }} key={slide.image} />)}</div></div></div>
      </section>

      <section className="signal-strip"><div className="container signal-grid">{[["01", "Tecnologia", "que simplifica"], ["02", "Parceria", "que acompanha"], ["03", "Resultados", "que avançam"]].map(([n, a, b]) => <div key={n}><span>{n}</span><p><strong>{a}</strong> {b}</p></div>)}</div></section>

      <section data-reveal id="sobre-nós" className="section about-section"><div className="container about-grid"><div><SectionIntro index="02" eyebrow="Sobre a DYLANDE" title="Tecnologia criada para impulsionar o seu negócio." text="A DYLANDE Prestação de Serviços Comércio Geral é uma empresa orientada para soluções tecnológicas e serviços especializados, oferecendo software e serviços de TI destinados a melhorar processos, aumentar a produtividade e apoiar a transformação digital de empresas." /><a href="#contactos" className="text-link">Conheça a nossa forma de trabalhar <ArrowUpRight size={17} /></a></div><div className="about-visual"><img src={teamImage} alt="Equipa de tecnologia a colaborar num projecto" /><div className="visual-caption"><span>DY / 2026</span><span>Ideias que ganham estrutura.</span></div></div></div><div className="container values-row">{["Inovação", "Qualidade", "Segurança", "Compromisso", "Transparência", "Satisfação"].map((v, i) => <span key={v}><b>0{i + 1}</b>{v}</span>)}</div></section>

      <section data-reveal id="serviços" className="section services-section"><div className="container"><SectionIntro index="03" eyebrow="O que fazemos" title="Serviços de Tecnologia da Informação" text="Da primeira conversa ao suporte contínuo, reunimos visão estratégica e execução cuidadosa para tornar a tecnologia útil." /><div className="services-grid">{services.map(([Icon, title, text], i) => <article className="service-card" key={title}><div className="card-top"><span>0{i + 1}</span><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><a href="#contactos" className="card-link">Saiba mais <ArrowUpRight size={15} /></a></article>)}</div></div></section>

      <section data-reveal id="softwares" className="section software-section"><div className="container software-grid"><div className="software-copy"><SectionIntro index="04" eyebrow="Catálogo em evolução" title="Softwares para tornar a sua empresa mais eficiente." text="Produtos modulares e soluções à medida para organizar operações, reduzir tarefas repetitivas e dar à sua equipa uma visão accionável do negócio." /><div className="catalog-note"><Sparkles size={18} /><span>Catálogo DYLANDE<span>Produtos demonstrativos — substitua por soluções comerciais reais.</span></span></div></div><div className="software-card"><img src={dashboardImage} alt="Mockup de dashboard de gestão empresarial" /><div className="software-card-body"><span className="tag">GESTÃO EMPRESARIAL</span><h3>Núcleo Gestão</h3><p>Operações, indicadores e equipas ligados numa visão única para decidir com mais contexto.</p><div className="feature-list"><span><Check size={14} />Operações num só lugar</span><span><Check size={14} />Indicadores accionáveis</span></div><div className="card-actions"><button className="button button-dark" onClick={() => toast.info("Detalhes do produto", { description: "Este produto está estruturado como demonstração e pode ser personalizado." })}>Ver detalhes</button><a href="#contactos" className="button button-outline">Solicitar demonstração</a></div></div></div></div></section>

      <section data-reveal id="soluções" className="section differentiators-section"><div className="container"><div className="dark-heading"><SectionIntro index="05" eyebrow="Porque escolher a DYLANDE" title="Uma parceria tecnológica para o crescimento do seu negócio." text="A diferença está na forma como ouvimos, traduzimos e acompanhamos cada desafio." light /></div><div className="diff-grid">{[[Globe2, "Soluções personalizadas", "Tecnologia adaptada às necessidades reais de cada cliente."], [Phone, "Atendimento profissional", "Acompanhamento próximo antes, durante e depois da implementação."], [BarChart3, "Tecnologia moderna", "Ferramentas actuais para criar soluções eficientes e escaláveis."], [ShieldCheck, "Segurança", "Prioridade na protecção dos dados e sistemas dos clientes."], [Palette, "Custo-benefício", "Soluções pensadas para gerar valor real para o negócio."], [Headphones, "Suporte contínuo", "Assistência para garantir o funcionamento adequado das soluções."]].map(([Icon, t, d]) => <div className="diff-item" key={t as string}><Icon size={21} /><div><h3>{t as string}</h3><p>{d as string}</p></div></div>)}</div></div></section>

      <section data-reveal className="section process-section"><div className="container"><SectionIntro index="06" eyebrow="Método DYLANDE" title="Do desafio à solução." text="Um processo transparente para que cada decisão tecnológica tenha contexto, direcção e continuidade." /><div className="process-line">{[["01", "Diagnóstico", "Compreendemos necessidades e desafios."], ["02", "Planeamento", "Definimos a melhor estratégia."], ["03", "Desenvolvimento", "Criamos e implementamos."], ["04", "Implementação", "Colocamos a solução em funcionamento."], ["05", "Suporte", "Acompanhamos de forma contínua."]].map(([n, t, d]) => <div className="process-step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div></div></section>

      <section data-reveal id="projetos" className="section projects-section"><div className="container"><SectionIntro index="07" eyebrow="Portefólio" title="Projetos e soluções" text="Sistemas, experiências digitais e infraestruturas desenhados para resolver um ponto concreto da operação." /><div className="filter-row">{filters.map(f => <button className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div><div className="projects-grid">{visibleProjects.map((p, i) => <article className="project-card" key={p.name}><div className={`project-art project-art-${i + 1}`}><span>{p.type}</span><div className="project-lines" /><ArrowUpRight size={21} /></div><div className="project-body"><span className="project-number">0{i + 1}</span><h3>{p.name}</h3><p>{p.text}</p><div className="project-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button onClick={() => toast.info("Projecto em preparação", { description: "Adicione aqui os detalhes reais do projecto quando estiverem disponíveis." })}>Ver projecto <ArrowUpRight size={15} /></button></div></article>)}</div></div></section>

      <section data-reveal className="testimonials-section"><div className="container testimonial-heading"><SectionIntro index="08" eyebrow="Prova de confiança" title="O que os nossos clientes dizem" text="Esta área foi desenhada para acolher histórias reais de implementação, com autorização dos respetivos clientes." /></div><div className="container testimonial-slots"><article><div className="quote-mark"><Quote size={20} /></div><div><span className="slot-label">TESTEMUNHO REAL · EM BREVE</span><h3>Uma história de transformação pode começar aqui.</h3><p>Adicione o nome do cliente, cargo, empresa e resultado alcançado quando tiver autorização para publicar.</p></div></article><article><div className="quote-mark"><Quote size={20} /></div><div><span className="slot-label">TESTEMUNHO REAL · EM BREVE</span><h3>Resultados concretos merecem contexto.</h3><p>Use este espaço para explicar o desafio, o trabalho realizado e o impacto observado pelo cliente.</p></div></article></div><div className="container testimonial-foot"><span className="content-status">{siteConfig.testimonials.status}</span><span>{siteConfig.testimonials.note}</span></div></section><section data-reveal className="stats-section"><div className="container stats-grid">{siteConfig.stats.map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>

      <section data-reveal className="section contact-section" id="contactos"><div className="container contact-grid"><div><SectionIntro index="08" eyebrow="Vamos conversar" title="Vamos conversar sobre o seu projeto." text="Partilhe o desafio. Nós ajudamos a desenhar um caminho tecnológico claro, realista e orientado a resultados." /><div className="contact-list"><a href={`mailto:${siteConfig.contact.email}`}><FileText size={18} /><span><small>Email</small>{siteConfig.contact.email}</span></a><a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noreferrer"><Phone size={18} /><span><small>WhatsApp / Telefone</small>{siteConfig.contact.phone}</span></a><div><Globe2 size={18} /><span><small>Localização</small>{siteConfig.contact.location}</span></div></div></div><form className="contact-form" onSubmit={handleForm}><div className="form-row"><label>Nome completo<input required name="name" placeholder="Como devemos chamar-lhe?" /></label><label>Empresa<input name="company" placeholder="Nome da organização" /></label></div><div className="form-row"><label>Email<input required type="email" name="email" placeholder="nome@empresa.com" /></label><label>Telefone<input name="phone" placeholder="+244 ..." /></label></div><label>Serviço pretendido<select name="service" defaultValue=""><option value="" disabled>Seleccione uma área</option><option>Desenvolvimento de software</option><option>Consultoria em TI</option><option>Suporte técnico</option><option>Outra necessidade</option></select></label><label>Mensagem<textarea required name="message" rows={5} placeholder="Conte-nos brevemente o que precisa de resolver." /></label><button className="button button-primary" type="submit">Enviar solicitação <Send size={16} /></button></form></div></section>

      <section data-reveal className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">Próximo passo</span><h2>Mais controlo para o próximo passo do seu negócio.</h2></div><a className="button button-light" href="#contactos">Fale com a nossa equipa <ArrowUpRight size={17} /></a></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-grid"><div className="footer-brand"><a href="#inicio" className="brand"><img src={markImage} alt="" /><span><strong>DYLANDE</strong><small>Prestação de Serviços Comércio Geral</small></span></a><p>Tecnologia próxima para organizar operações, apoiar decisões e manter o negócio em movimento.</p><div className="footer-socials"><a href="#contactos">in</a><a href="#contactos">f</a><a href="#contactos">ig</a></div></div><div><h4>Empresa</h4><a href="#sobre-nós">Sobre nós</a><a href="#serviços">Serviços</a><a href="#projetos">Projetos</a><a href="#contactos">Contactos</a></div><div><h4>Soluções</h4><a href="#softwares">Softwares</a><a href="#soluções">Sistemas</a><a href="#serviços">Desenvolvimento</a><a href="#contactos">Consultoria</a></div><div><h4>Contacto</h4><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a><a href={`https://wa.me/${siteConfig.contact.whatsapp}`}>{siteConfig.contact.phone}</a><span>{siteConfig.contact.location}</span></div></div><div className="container footer-bottom"><span>© 2026 DYLANDE Prestação de Serviços Comércio Geral. Todos os direitos reservados.</span><span><a href="#contactos">Política de Privacidade</a><a href="#contactos">Termos e Condições</a></span></div></footer>
    <a className="whatsapp-float" href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">◔</a>
  </div>;
}

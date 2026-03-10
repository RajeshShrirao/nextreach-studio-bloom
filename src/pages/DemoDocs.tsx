import { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Command,
  FileText,
  Gauge,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  X,
  ExternalLink,
  BookOpen,
  Layers3,
  Settings2,
  Sparkles,
  ArrowRight,
  Maximize2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { docsSections, allDocs, docsMap, docsConfig, DocPage } from "@/data/docs";
import { cn } from "@/lib/utils";

const sectionIcons: Record<string, typeof Sparkles> = {
  "getting-started": Sparkles,
  "core-concepts": BookOpen,
  "product-guides": Layers3,
  "reference": Settings2,
};

export default function DemoDocs() {
  const { articleId } = useParams<{ articleId?: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeArticle = articleId ? docsMap.get(articleId) : undefined;
  const isHome = !articleId;
  const isIframe = typeof window !== "undefined" && window.self !== window.top;

  useEffect(() => {
    if (articleId && !activeArticle) {
      navigate(docsConfig.baseUrl, { replace: true });
    }
  }, [activeArticle, articleId, navigate]);

  const filteredSections = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return docsSections;

    return docsSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const content = [
            item.title,
            item.description,
            item.section,
            ...item.body,
            ...(item.steps ?? []),
            ...(item.keyPoints ?? []),
          ]
            .join(" ")
            .toLowerCase();
          return content.includes(normalized);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchTerm]);

  const activeIndex = activeArticle
    ? allDocs.findIndex((article) => article.slug === activeArticle.slug)
    : -1;
  const previousArticle = activeIndex > 0 ? allDocs[activeIndex - 1] : undefined;
  const nextArticle =
    activeIndex >= 0 && activeIndex < allDocs.length - 1 ? allDocs[activeIndex + 1] : undefined;

  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return activeArticle.related
      .map((slug) => docsMap.get(slug))
      .filter((article): article is DocPage => Boolean(article))
      .slice(0, 3);
  }, [activeArticle]);

  const openArticle = (slug: string) => {
    navigate(`${docsConfig.baseUrl}/${slug}`);
    setMobileMenuOpen(false);
  };

  const openHome = () => {
    navigate(docsConfig.baseUrl);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900">
      <SEO
        pageKey="docs"
        customMetadata={{
          title: activeArticle
            ? `${activeArticle.title} | ${docsConfig.title}`
            : docsConfig.title,
          description: activeArticle?.description ?? docsConfig.description,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to={docsConfig.baseUrl} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-[#a3e635]">
                <Gauge className="h-4 w-4" />
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-slate-900">Pulseboard</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Docs</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search docs..."
                className="w-64 border-slate-200 bg-slate-50 pl-9 text-sm focus:bg-white"
              />
            </div>
            {isIframe && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(docsConfig.baseUrl, '_blank')}
                className="hidden lg:flex"
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                Open in new tab
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white pt-16 transition-transform lg:static lg:translate-x-0 lg:pt-0",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            sidebarOpen ? "lg:w-72" : "lg:w-0 lg:border-0 lg:overflow-hidden"
          )}
        >
          <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search docs..."
                  className="border-slate-200 pl-9"
                />
              </div>
            </div>

            {/* Home Link */}
            <button
              onClick={openHome}
              className={cn(
                "mb-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isHome
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <FileText className="h-4 w-4" />
              Documentation
            </button>

            {/* Sections */}
            <nav className="space-y-6">
              {filteredSections.map((section) => {
                const Icon = sectionIcons[section.slug] || BookOpen;
                return (
                  <div key={section.slug}>
                    <div className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                      <Icon className="h-3.5 w-3.5" />
                      {section.title}
                    </div>
                    <div className="space-y-0.5">
                      {section.items.map((item) => {
                        const isActive = item.slug === activeArticle?.slug && !isHome;
                        return (
                          <button
                            key={item.slug}
                            onClick={() => openArticle(item.slug)}
                            className={cn(
                              "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                              isActive
                                ? "bg-slate-100 font-medium text-slate-900"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                          >
                            <div className="truncate">{item.title}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>

            {filteredSections.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
                No results found
              </div>
            )}
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {isHome ? (
            <DocsHomePage
              sections={filteredSections}
              onArticleClick={openArticle}
              searchTerm={searchTerm}
            />
          ) : activeArticle ? (
            <DocsArticlePage
              article={activeArticle}
              onHomeClick={openHome}
              previousArticle={previousArticle}
              nextArticle={nextArticle}
              relatedArticles={relatedArticles}
              onArticleClick={openArticle}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

function DocsHomePage({
  sections,
  onArticleClick,
  searchTerm,
}: {
  sections: typeof docsSections;
  onArticleClick: (slug: string) => void;
  searchTerm: string;
}) {
  const featuredArticles = ["quickstart", "events", "dashboards", "api-keys"];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-10">
      {/* Hero */}
      <div className="mb-12">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          {docsConfig.title}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Everything you need to build better products
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Comprehensive guides, API references, and tutorials to help you get the most out of Pulseboard.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">Pages</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{allDocs.length} articles</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">Sections</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{docsSections.length} categories</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-slate-500">Format</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">Fumadocs</div>
        </div>
      </div>

      {/* Quick search results */}
      {searchTerm ? (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Search results for "{searchTerm}"</h2>
          <div className="space-y-2">
            {allDocs
              .filter((doc) => {
                const term = searchTerm.toLowerCase();
                return (
                  doc.title.toLowerCase().includes(term) ||
                  doc.description.toLowerCase().includes(term)
                );
              })
              .map((doc) => (
                <button
                  key={doc.slug}
                  onClick={() => onArticleClick(doc.slug)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="font-medium text-slate-900">{doc.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{doc.description}</div>
                </button>
              ))}
          </div>
        </div>
      ) : null}

      {/* Featured */}
      {!searchTerm && (
        <>
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold">Popular pages</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredArticles.map((slug) => {
                const article = docsMap.get(slug);
                if (!article) return null;
                return (
                  <button
                    key={slug}
                    onClick={() => onArticleClick(slug)}
                    className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-slate-300 hover:shadow-sm"
                  >
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {article.section}
                    </Badge>
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600">
                      {article.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-600 line-clamp-2">{article.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* All sections */}
          <div className="space-y-8">
            {sections.map((section) => {
              const Icon = sectionIcons[section.slug] || BookOpen;
              return (
                <div key={section.slug}>
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-500" />
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => onArticleClick(item.slug)}
                        className="group rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900 group-hover:text-blue-600">
                            {item.title}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <div className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function DocsArticlePage({
  article,
  onHomeClick,
  previousArticle,
  nextArticle,
  relatedArticles,
  onArticleClick,
}: {
  article: DocPage;
  onHomeClick: () => void;
  previousArticle?: DocPage;
  nextArticle?: DocPage;
  relatedArticles: DocPage[];
  onArticleClick: (slug: string) => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onHomeClick} className="hover:text-slate-900">
          Docs
        </button>
        <ChevronRight className="h-4 w-4" />
        <span>{article.section}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-slate-900">{article.title}</span>
      </nav>

      {/* Meta */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="border-slate-200 bg-white">
          {article.section}
        </Badge>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Clock3 className="h-4 w-4" />
          {article.readTime}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-lg text-slate-600">{article.description}</p>

      {/* Body */}
      <div className="mt-8 space-y-6">
        {article.body.map((paragraph, idx) => (
          <p key={idx} className="text-base leading-7 text-slate-700">
            {paragraph}
          </p>
        ))}

        {/* Steps */}
        {article.steps && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Command className="h-5 w-5 text-slate-500" />
              Steps
            </div>
            <div className="space-y-4">
              {article.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code block */}
        {article.codeBlock && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#1e1e2e]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 font-mono text-xs text-slate-400">example</span>
            </div>
            <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-100">
              <code>{article.codeBlock}</code>
            </pre>
          </div>
        )}

        {/* Key points */}
        {article.keyPoints && (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Key points</h3>
            <ul className="space-y-3">
              {article.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {previousArticle ? (
          <button
            onClick={() => onArticleClick(previousArticle.slug)}
            className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-slate-300"
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </div>
            <div className="mt-2 font-medium text-slate-900 group-hover:text-blue-600">
              {previousArticle.title}
            </div>
          </button>
        ) : (
          <div />
        )}
        {nextArticle ? (
          <button
            onClick={() => onArticleClick(nextArticle.slug)}
            className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-slate-300"
          >
            <div className="flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              Next
              <ChevronRight className="h-4 w-4" />
            </div>
            <div className="mt-2 text-right font-medium text-slate-900 group-hover:text-blue-600">
              {nextArticle.title}
            </div>
          </button>
        ) : null}
      </div>

      {/* Related */}
      {relatedArticles.length > 0 && (
        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Related articles</h3>
          <div className="space-y-3">
            {relatedArticles.map((related) => (
              <button
                key={related.slug}
                onClick={() => onArticleClick(related.slug)}
                className="flex w-full items-center justify-between rounded-lg bg-white p-3 text-left transition-colors hover:bg-slate-100"
              >
                <span className="font-medium text-slate-900">{related.title}</span>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

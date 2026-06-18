import { Container } from "@/components/ui/container";
import { ArticleForm } from "@/components/admin/article-form";

export const metadata = {
  title: "Nouvel article",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  return (
    <Container className="max-w-3xl py-12">
      <h1 className="font-display text-3xl font-semibold text-forest-900">Nouvel article</h1>
      <div className="mt-8">
        <ArticleForm />
      </div>
    </Container>
  );
}

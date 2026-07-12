import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ArticleBlock } from "@/lib/article-blocks";

function BlockText({ children }: { children: string }) {
  if (!children.trim()) return null;
  return (
    <div className="prose-article">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

function BlockImages({ images }: { images: string[] }) {
  if (images.length === 0) return null;
  // Une seule image : on la garde modeste (largeur bornée) plutôt qu'en pleine
  // largeur. Deux images : côte à côte, chacune sur la moitié.
  // Chaque image a une largeur fixe (w-72) : ainsi l'espacement (gap) et la
  // taille des images sont indépendants — augmenter le gap n'écrase plus les images.
  return (
    <div className="flex flex-wrap justify-center gap-35">
      {images.map((url, i) => (
        <div
          key={`${url}-${i}`}
          className="relative aspect-[3/2] w-100 max-w-full overflow-hidden rounded-xl"
        >
          <Image src={url} alt="" fill sizes="18rem" className="object-contain" />
        </div>
      ))}
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  if (block.layout === "text-images-right") {
    // Texte à gauche (plus large), une ou deux images empilées à droite.
    return (
      <div className="grid items-start gap-8 md:grid-cols-[2fr_1.5fr]">
        <BlockText>{block.text}</BlockText>
        <div className="grid gap-8">
          {block.images.map((url, i) => (
            <div key={`${url}-${i}`} className="relative aspect-[3/2] overflow-hidden rounded-xl">
              <Image
                src={url}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // "text-images-below" : texte, puis les images, puis un texte optionnel.
  return (
    <div className="space-y-6">
      <BlockText>{block.text}</BlockText>
      <BlockImages images={block.images} />
      <BlockText>{block.textAfter}</BlockText>
    </div>
  );
}

export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  if (blocks.length === 0) return null;
  return (
    <div className="mt-12 space-y-12">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

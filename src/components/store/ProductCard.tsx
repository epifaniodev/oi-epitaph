import { brl, stockClass, stockLabel } from "@/lib/format";
import type { Product } from "@/lib/categories";

/**
 * `alt` vazio de propósito: a imagem e o título dizem o mesmo e o card já é um
 * botão com nome acessível. Descrever a imagem outra vez duplicava a leitura.
 *
 * Sem `aria-label` próprio: o nome acessível do botão já junta categoria,
 * título, preço e o texto do estoque — "Sem estoque" incluído, que é o que tira
 * o estado de esgotado da dependência exclusiva da cor.
 */
export function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product;
  index: number;
  onOpen: (id: string) => void;
}) {
  const id = String(product.id ?? "");
  const stock = stockLabel(product.stock_quantity);

  return (
    <button
      type="button"
      className="product"
      style={{ animationDelay: `${Math.min(index, 14) * 30}ms` }}
      onClick={() => onOpen(id)}
    >
      <div className="product-thumb">
        {product.image_url ? (
          <img src={product.image_url} alt="" loading="lazy" />
        ) : (
          <span className="placeholder" aria-hidden="true">
            {(product.title || "?").slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div className="product-body">
        <span className="product-cat">{product.category ?? ""}</span>
        <h3 className="product-title">{product.title || "Sem título"}</h3>
        <div className="product-row">
          <div>
            <div className="price">{brl(product.price)}</div>
            {product.compare_price ? (
              <span className="compare">{brl(product.compare_price)}</span>
            ) : null}
          </div>
          <span className={`stock ${stockClass(product.stock_quantity)}`}>{stock}</span>
        </div>
      </div>
    </button>
  );
}

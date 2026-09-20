import { MARKET_NAV, type NavItem } from "@/lib/categories";

/** Secção do catálogo → URL. `produtos` é a raiz da loja. */
function sectionHref(id: string): string {
  return id === "produtos" ? "/loja" : `/loja/${id}`;
}

function Item({ item, current }: { item: NavItem; current: string }) {
  if (item.type === "link") {
    return (
      <a className="nav-link nav-link-ext" href={item.href}>
        {item.label}
      </a>
    );
  }

  if (item.type === "page") {
    const href = item.id === "tutorial" ? "/tutorial" : "/suporte";
    return (
      <a
        href={href}
        className={`nav-link${item.id === current ? " is-active" : ""}`}
        aria-current={item.id === current ? "page" : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <a
      href={sectionHref(item.id)}
      className={`nav-link${item.id === current ? " is-active" : ""}`}
      aria-current={item.id === current ? "page" : undefined}
    >
      {item.label}
    </a>
  );
}

export function SideNav({ current, balance }: { current: string; balance: string }) {
  return (
    <aside className="side" id="side">
      <div className="side-brand">
        <span className="brand-mark" aria-hidden="true">
          ax
        </span>
        <div>
          <p className="brand-name">Marketplace</p>
          <p className="brand-sub">Catálogo Axye</p>
        </div>
      </div>

      <nav className="side-nav" aria-label="Seções do catálogo">
        {MARKET_NAV.map((g) => (
          <div key={g.group}>
            <p className="nav-group-label">{g.group}</p>
            <div className="nav-list">
              {g.items.map((item) => (
                <Item key={item.id} item={item} current={current} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="side-balance">
        <span className="balance-label">Saldo</span>
        <span className="balance-value">{balance}</span>
      </div>
    </aside>
  );
}

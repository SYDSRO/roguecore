import { Link } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/products";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

export function Header() {
  const count = useCart((s) => s.count());
  const open = useCart((s) => s.open);
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link to="/" className="font-display text-2xl tracking-tight">
            ROGUE<span className="text-accent">CORE</span>
          </Link>
          <nav className="hidden gap-6 text-sm font-medium uppercase tracking-wider md:flex">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop/$category"
                params={{ category: c.slug }}
                className="transition-colors hover:text-accent"
                activeProps={{ className: "text-accent" }}
              >
                {c.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={open}
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto border-t border-border px-4 py-2 text-xs font-medium uppercase tracking-wider md:hidden">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="whitespace-nowrap"
              activeProps={{ className: "text-accent" }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </header>
      <CartDrawer isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}

function CartDrawer({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (o: boolean) => void;
}) {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-6">
          <SheetTitle className="font-display text-2xl uppercase">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
              <div>
                <ShoppingBag className="mx-auto mb-4 h-12 w-12 opacity-30" />
                <p>Your cart is empty.</p>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.productId + i.size} className="flex gap-4 p-4">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="h-24 w-24 rounded-sm bg-muted object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-semibold leading-tight">{i.name}</p>
                        <p className="text-xs uppercase text-muted-foreground">
                          Size {i.size}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(i.productId, i.size)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-center gap-2 border border-border">
                        <button
                          onClick={() =>
                            setQty(i.productId, i.size, Math.max(0, i.quantity - 1))
                          }
                          className="px-2 py-1 hover:bg-secondary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-medium">
                          {i.quantity}
                        </span>
                        <button
                          onClick={() => setQty(i.productId, i.size, i.quantity + 1)}
                          className="px-2 py-1 hover:bg-secondary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-semibold">
                        ${(i.price * i.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border bg-background p-6">
          <div className="mb-4 flex items-center justify-between text-lg">
            <span className="font-display uppercase">Total</span>
            <span className="font-display">${total.toFixed(2)}</span>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">Shipping calculated at checkout.</p>
          <Button
            className="h-12 w-full rounded-none bg-accent text-base font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/90"
            disabled={items.length === 0}
            onClick={() => {
              setOpen(false);
              navigate({ to: "/checkout" });
            }}
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

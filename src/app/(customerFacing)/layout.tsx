import { Nav, NavLink } from '@/components/Nav';

// force nextjs to not cache any of the admin pages, by default nextjs caches all the pages
export const dynamic = 'force-dynamic';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
};

export default Layout;

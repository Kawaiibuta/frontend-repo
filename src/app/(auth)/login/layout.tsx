export const metadata = {
  title: "Login page - Intern app",
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}

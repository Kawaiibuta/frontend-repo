export const metadata = {
  title: "Sign up page - Intern app",
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}

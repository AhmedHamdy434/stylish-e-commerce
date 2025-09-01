// // import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "next-themes";
// import { NextIntlClientProvider } from "next-intl";
// import Header from "@/components/templates/Header";
// import Footer from "@/components/templates/Footer";
// import { AuthProvider } from "@/context/AuthContext";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });
// // export async function generateMetadata({
// //   params,
// // }: {
// //   params:  Promise<{ locale: string }>;
// // }): Promise<Metadata> {
// //   const { locale } = await params;

// //   const isArabic = locale === "ar";

// //   return {
// //     title: isArabic ? "ستايليش" : "Stylish",
// //     description: isArabic ? "أفضل متجر إلكتروني" : "Best e-commerce store",
// //     icons: {
// //       icon: "/logo.png",
// //     },
// //   };
// // }

// export default async function RootLayout({
//   children,
//   params,
// }: Readonly<{
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }>) {
//   const { locale } = await params;
//   return (
//     <html
//       lang={locale}
//       dir={locale === "ar" ? "rtl" : "ltr"}
//       suppressHydrationWarning
//     >
//       <body className={`${inter.variable} antialiased`}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <NextIntlClientProvider>
//             <AuthProvider>
//               <Header />
//               {children}
//               <Footer />
//             </AuthProvider>
//           </NextIntlClientProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx  (Server component — NOT async)
import { Inter } from "next/font/google";
import "./globals.css";
// import Providers from "./Providers"; // client Providers component
import Header from "@/components/templates/Header";
import Footer from "@/components/templates/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${inter.variable} antialiased`}>
        {/* <Providers locale={locale}> */}
        <Header />
        {children}
        <Footer />
        {/* </Providers> */}
      </body>
    </html>
  );
}

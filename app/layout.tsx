import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { Poppins } from "next/font/google";

// Fonts

// Favicon
import Favicon from "@/public/assets/favicon/favicon.ico";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

// ShadCn
import { Toaster } from "@/components/ui/toaster";

// Components
import PageLoader from "@/app/components/reusables/PageLoader/PageLoader";
import Spinner from "@/app/components/reusables/Spinner/Spinner";
import Header from "@/components/Header";

// Contexts
import { AuthProvider } from "@/contexts/AuthContext";
import Providers from "@/contexts/Providers";

// SEO
import { ROOTKEYWORDS } from "@/lib/seo";

// Variables
import { BASE_URL, GOOGLE_SC_VERIFICATION } from "@/lib/variables";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Invoify | Free Invoice Generator",
  description:
    "Create invoices effortlessly with Invoify, the free invoice generator. Try it now!",
  icons: [{ rel: "icon", url: Favicon.src }],
  keywords: ROOTKEYWORDS,
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
  authors: {
    name: "Ali Abbasov",
    url: "https://aliabb.vercel.app",
  },
  verification: {
    google: GOOGLE_SC_VERIFICATION,
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Spinner />
        <Providers>
          <AuthProvider>
            <PageLoader>
              <main className="bg-white mt-16">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  }
                >
                  <Header />
                  <div className="flex flex-col">{children}</div>
                </Suspense>
              </main>
              {/* Toast component */}
              <Toaster />
              {/* Vercel analytics */}
              <Analytics />
            </PageLoader>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

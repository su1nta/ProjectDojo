import type { Metadata } from "next";
import { Geist, Geist_Mono, Jockey_One } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const jockeyOne = Jockey_One({
    variable: "--font-jockey-one",
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ProjectDojo - Mastery through Repetition",
    description:
        "ProjectDojo is a practice-first learning platform where developers build real skills through repetition, deliberate practice, and project-based learning.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="favicon.ico" sizes="any" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${jockeyOne.variable} antialiased min-h-screen overflow-x-hidden`}
            >
                <div
                    className="flex min-h-screen w-full flex-col items-center"
                    style={{
                        background: `
                            radial-gradient(circle at 1px 1px, rgba(34, 34, 34, 0.10) 1px, transparent 0),
                            linear-gradient(to bottom, transparent, var(--accent))
                        `,
                        backgroundSize: "20px 20px, 100% 100%",
                    }}
                >
                    <Nav />
                    {children}
                </div>
            </body>
        </html>
    );
}

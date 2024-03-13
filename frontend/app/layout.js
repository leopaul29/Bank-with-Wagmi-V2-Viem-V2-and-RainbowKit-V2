import RainbowKitAndChakraProvider from "./RainbowKitAndChakraProvider";
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "@/app/context/store";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Bank Dapp",
	description: "Bank Dapp frontend",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<RainbowKitAndChakraProvider>
					<GlobalContextProvider>
						<Layout>{children}</Layout>
					</GlobalContextProvider>
				</RainbowKitAndChakraProvider>
			</body>
		</html>
	);
}

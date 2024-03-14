"use client";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "@/utils/sepolia";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const WALLETCONNECT_PROJECTID =
	process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID || "";

const config = getDefaultConfig({
	appName: "Bank Dapp",
	projectId: WALLETCONNECT_PROJECTID,
	chains: [sepolia],
	ssr: true,
});

const queryClient = new QueryClient();

const RainbowKitAndChakraProvider = ({ children }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<ChakraProvider>{children}</ChakraProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default RainbowKitAndChakraProvider;

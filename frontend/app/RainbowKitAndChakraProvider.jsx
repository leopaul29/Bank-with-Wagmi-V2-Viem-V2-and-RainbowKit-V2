"use client";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "@/utils/sepolia";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
	appName: "Bank Dapp",
	projectId: "03f8ec0f8ad40a9b543bb4a1051dd071",
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

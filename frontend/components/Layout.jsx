"use client";
import Header from "./Header";
import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
	return (
		<Flex direction="column" minH="100vh" justifyContent="center" minW="960px">
			<Header />
			<Flex grow="1" p="2rem" justify="center">
				{children}
			</Flex>
			<Footer />
		</Flex>
	);
};

export default Layout;

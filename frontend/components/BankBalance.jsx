import { Spinner, Text, Box } from "@chakra-ui/react";
import { formatEther } from "viem";

const BankBalance = ({ isPending, balance }) => {
	return (
		<Box mb="1rem">
			{isPending ? (
				<Spinner />
			) : (
				<Text>
					You have <Text as="b">{formatEther(balance?.toString())}</Text> Eth on
					the smart contract.
				</Text>
			)}
		</Box>
	);
};

export default BankBalance;

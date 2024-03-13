import { useState, useEffect } from "react";
import { Flex, Box, Button, Input, useToast } from "@chakra-ui/react";
import { contractAddress, contractAbi } from "@/constants";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import TransacAlert from "./TransacAlert";

const Deposit = ({ refetch, getEvents }) => {
	const [depositETH, setDepositETH] = useState(null);

	const toast = useToast();

	const {
		data: hash,
		error,
		isPending: setIsPending,
		writeContract,
	} = useWriteContract({
		mutation: {
			onSuccess: () => {
				toast({
					title: "La transaction du deposit à été lancée",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			},
			onError: (error) => {
				toast({
					title: error.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			},
		},
	});

	const setTheDepositETH = async () => {
		if (!isNaN(depositETH)) {
			writeContract({
				address: contractAddress,
				abi: contractAbi,
				functionName: "deposit",
				value: parseEther(depositETH?.toString()),
			});
		} else {
			toast({
				title: "FAUT RENTRER UN NOMBRE !!!",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	useEffect(() => {
		if (isConfirmed) {
			refetch();
			getEvents();
			toast({
				title: "Votre nombre a été inscrit dans la Blockchain",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			setDepositETH("");
		}
		if (error) {
			toast({
				title: error.message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}, [isConfirmed]);

	return (
		<Box mb="1rem">
			<TransacAlert
				hash={hash}
				isConfirming={isConfirming}
				isConfirmed={isConfirmed}
				error={error}
			/>
			<Flex>
				<Input
					placeholder="Amount in ETH"
					type="number"
					value={depositETH}
					onChange={(e) => setDepositETH(e.target.value)}
				/>
				<Button disabled={setIsPending} onClick={setTheDepositETH}>
					{setIsPending ? "Confirming..." : "Deposit"}{" "}
				</Button>
			</Flex>
		</Box>
	);
};

export default Deposit;

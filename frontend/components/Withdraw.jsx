import { useState, useEffect } from "react";
import { Box, Flex, Button, Input, useToast } from "@chakra-ui/react";
import { contractAddress, contractAbi } from "@/constants";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import TransacAlert from "./TransacAlert";

const Withdraw = ({ refetch, getEvents }) => {
	const [withdrawETH, setWithdrawETH] = useState(null);

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
					title: "La transaction du withdraw à été lancée",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			},
			// Si erreur
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

	const setTheWithdraw = async () => {
		if (!isNaN(withdrawETH)) {
			writeContract({
				address: contractAddress,
				abi: contractAbi,
				functionName: "withdraw",
				args: [parseEther(withdrawETH?.toString())],
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
			setWithdrawETH("");
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
					value={withdrawETH}
					onChange={(e) => setWithdrawETH(e.target.value)}
				/>
				<Button disabled={setIsPending} onClick={setTheWithdraw}>
					{setIsPending ? "Confirming..." : "Withdraw"}{" "}
				</Button>
			</Flex>
		</Box>
	);
};

export default Withdraw;

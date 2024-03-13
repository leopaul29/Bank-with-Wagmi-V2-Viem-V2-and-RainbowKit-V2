"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { contractAddress, contractAbi } from "@/constants";
import { parseAbiItem, formatEther } from "viem";
import { useReadContract, useAccount } from "wagmi";
import { publicClient } from "@/utils/client";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
	const { address } = useAccount();

	const {
		data: balanceOfConnectedAddress,
		isPending,
		refetch,
	} = useReadContract({
		address: contractAddress,
		abi: contractAbi,
		functionName: "getBalanceOfUser",
		account: address,
	});

	const [events, setEvents] = useState([]);

	const getEvents = async () => {
		const etherDeposited = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event etherDeposited(address indexed account, uint amount)"
			),
			fromBlock: 0n,
			toBlock: "latest",
		});

		const etherWithdrawed = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event etherWithdrawed(address indexed account, uint amount)"
			),
			fromBlock: 0n,
			toBlock: "latest",
		});

		const combinedEvents = etherDeposited
			.map((log) => ({
				name: "Deposit",
				account: log.args.account.toString(),
				amount: formatEther(log.args.amount.toString()),
				blockNumber: Number(log.blockNumber),
			}))
			.concat(
				etherWithdrawed.map((log) => ({
					name: "Withdraw",
					account: log.args.account.toString(),
					amount: formatEther(log.args.amount.toString()),
					blockNumber: Number(log.blockNumber),
				}))
			);

		combinedEvents.sort(function (a, b) {
			return b.blockNumber - a.blockNumber;
		});

		setEvents(combinedEvents);
	};

	useEffect(() => {
		const getAllEvents = async () => {
			if (address !== "undefined") {
				await getEvents();
			}
		};
		getAllEvents();
	}, [address]);

	return (
		<GlobalContext.Provider
			value={{
				isPending,
				balanceOfConnectedAddress,
				refetch,
				getEvents,
				events,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);

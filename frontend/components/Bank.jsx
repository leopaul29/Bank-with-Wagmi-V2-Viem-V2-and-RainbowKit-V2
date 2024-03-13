import { Center, Heading, Flex, Spacer } from "@chakra-ui/react";
import BankBalance from "@/components/BankBalance";
import Deposit from "@/components/Deposit";
import Withdraw from "@/components/Withdraw";
import Events from "@/components/Events";
import { useGlobalContext } from "@/app/context/store";

const Bank = () => {
	const { isPending, balanceOfConnectedAddress, refetch, getEvents, events } =
		useGlobalContext();

	return (
		<Flex direction="column">
			<Center>
				<Heading mb="1rem">Bank DApp</Heading>
			</Center>
			<BankBalance isPending={isPending} balance={balanceOfConnectedAddress} />
			<Spacer />
			<Deposit refetch={refetch} getEvents={getEvents} />
			<Withdraw refetch={refetch} getEvents={getEvents} />
			<Events events={events} />
		</Flex>
	);
};

export default Bank;

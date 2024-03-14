import {
	Box,
	Center,
	Heading,
	Text,
	Badge,
	Stack,
	Skeleton,
} from "@chakra-ui/react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from "@chakra-ui/react";

const Events = ({ events }) => {
	return (
		<Box>
			<Center pb="5">
				<Heading>Last events</Heading>
			</Center>
			{events.length > 0 ? (
				<TableContainer>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>NAME</Th>
								<Th>ACCOUNT</Th>
								<Th isNumeric>AMOUNT</Th>
							</Tr>
						</Thead>
						<Tbody>
							{events.map((event) => {
								return (
									<Tr key={crypto.randomUUID()}>
										<Td>
											{event.name === "Deposit" ? (
												<Badge colorScheme="green">Deposit</Badge>
											) : (
												<Badge colorScheme="red">Withdraw</Badge>
											)}
										</Td>
										<Td>{event.account}</Td>
										<Td>{event.amount}</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</TableContainer>
			) : (
				<Stack>
					<Skeleton height="20px" />
					<Skeleton height="20px" />
					<Skeleton height="20px" />
				</Stack>
			)}
		</Box>
	);
};

export default Events;

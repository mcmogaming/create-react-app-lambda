import { Box, VStack, Container } from "@chakra-ui/react";

type WalletBalanceProps = {
  walletAddress: string | undefined;
  balanceETH: string | undefined;
  balanceFMD: string | undefined;
  chainId: number | undefined;
  chainname: string | undefined;
};

export default function WalletBalance(props: WalletBalanceProps) {
  return (
    <>
      <Container rounded="3xl" bg="pink.100">
        <VStack padding="5">
          <Box>
            <b>Wallet Balance:</b>
          </Box>
          <Box fontSize="md">
            <b>ETH Balance: {props.balanceETH}</b>
          </Box>
          <Box fontSize="md">
            <b>FMD Balance: {props.balanceFMD}</b>
          </Box>
          <Box fontSize="sm">
            {" "}
            Refresh to see updated balance after confirmed transaction!
          </Box>
          <Box fontSize="sm">
            Chain Name: {props.chainname} {props.chainId}
          </Box>
        </VStack>
      </Container>
    </>
  );
}

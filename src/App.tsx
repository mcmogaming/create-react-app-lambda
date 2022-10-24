import { useState } from "react";
import { ChakraProvider, Box, VStack, Grid, theme } from "@chakra-ui/react";
import NavBar from "./components/NavBar/NavBar";
import Deposit from "./components/Deposit/Deposit";
import ReadERC20 from "./components/ReadERC20/ReadERC20";
import WalletBalance from "./components/WalletBalance/WalletBalance";
import CreateSpending from "./components/CreateSpending/CreateSpending";
import VoteSpending from "./components/VoteSpending/VoteSpending";
import ExecuteSpending from "./components/ExecuteSpending/ExecuteSpending";

export const App = () => {
  const contractAddress = "0xe72254CB2b12D7919ef86E691F896585a809c485";

  const [balanceETH, setBalanceETH] = useState<string | undefined>();
  const [balanceFMD, setBalanceFMD] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainname, setChainName] = useState<string | undefined>();

  return (
    <ChakraProvider theme={theme}>
      <NavBar
        setBalance={setBalanceETH}
        setBalanceFMD={setBalanceFMD}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        setChainId={setChainId}
        setChainName={setChainName}
      ></NavBar>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack>
            <WalletBalance
              balanceETH={balanceETH}
              walletAddress={currentAccount}
              balanceFMD={balanceFMD}
              chainId={chainId}
              chainname={chainname}
            ></WalletBalance>
            <Deposit
              balance={balanceETH}
              contractAddress={contractAddress}
              currentAccount={currentAccount}
            ></Deposit>
            <CreateSpending
              balance={balanceETH}
              contractAddress={contractAddress}
              currentAccount={currentAccount}
            ></CreateSpending>
            <VoteSpending
              balance={balanceETH}
              contractAddress={contractAddress}
              currentAccount={currentAccount}
            ></VoteSpending>
            <ExecuteSpending
              balance={balanceETH}
              contractAddress={contractAddress}
              currentAccount={currentAccount}
            ></ExecuteSpending>
            <VStack spacing={8}>
              <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
                <ReadERC20
                  addressContract={contractAddress}
                  currentAccount={currentAccount}
                  balanceFMD={balanceFMD}
                  setBalanceFMD={setBalanceFMD}
                />
              </Box>
            </VStack>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

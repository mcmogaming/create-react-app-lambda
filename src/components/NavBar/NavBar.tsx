import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";

declare let window: any;

type NavBarProps = {
  setBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
  setBalanceFMD: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentAccount: string | undefined;
  setCurrentAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
  setChainId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setChainName: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const NavBar = ({
  setBalance,
  setBalanceFMD,
  currentAccount,
  setCurrentAccount,
  setChainId,
  setChainName,
}: NavBarProps) => {
  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    //client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
  }, [currentAccount]);

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setBalance(undefined);
    setBalanceFMD(undefined);
    setCurrentAccount(undefined);
  };

  return (
    <>
      <ChakraProvider>
        <Box bg={useColorModeValue("pink.100", "pink.900")} px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box fontSize="xl">
              {" "}
              <b>CSCD71 A2: Fund Managament</b>{" "}
            </Box>
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                {currentAccount ? (
                  <Button
                    type="button"
                    w="100%"
                    onClick={onClickDisconnect}
                    bg="pink.500"
                    color="white"
                    rounded="3xl"
                    width="9xs"
                  >
                    Account:{currentAccount}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    w="100%"
                    onClick={onClickConnect}
                    bg="pink.500"
                    color="white"
                    rounded="3xl"
                    width="2xs"
                  >
                    Connect Wallet
                  </Button>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default NavBar;

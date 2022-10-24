import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { ERC20ABI as abi } from "../../abi/ERC20ABI";
import { ethers } from "ethers";

interface Props {
  addressContract: string;
  currentAccount: string | undefined;
  balanceFMD: string | undefined;
  setBalanceFMD: React.Dispatch<React.SetStateAction<string | undefined>>;
}

declare let window: any;

export default function ReadERC20(props: Props) {
  const addressContract = props.addressContract;
  const currentAccount = props.currentAccount;
  const [totalSupply, setTotalSupply] = useState<string>();
  const [symbol, setSymbol] = useState<string>("");

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20 = new ethers.Contract(addressContract, abi, provider);
    erc20
      .symbol()
      .then((result: string) => {
        setSymbol(result);
      })
      .catch("error", console.error);

    erc20
      .totalSupply()
      .then((result: string) => {
        setTotalSupply(ethers.utils.formatEther(result));
      })
      .catch("error", console.error);
    //called only once
  }, []);

  const [balanceFMD, SetBalanceFMD] = useState<number | undefined>(undefined);
  //call when currentAccount change
  useEffect(() => {
    if (!window.ethereum) return;
    if (!currentAccount) return;

    queryTokenBalance(window);
  }, [currentAccount]);

  async function queryTokenBalance(window: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20 = new ethers.Contract(addressContract, abi, provider);

    erc20
      .balanceOf(currentAccount)
      .then((result: string) => {
        props.setBalanceFMD(String(ethers.utils.formatEther(result)));
      })
      .catch("error", console.error);
  }

  return <div></div>;
}

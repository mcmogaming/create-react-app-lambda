import { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Container,
  Box,
  Button,
  NumberInputStepper,
  NumberInput,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ERC20ABI as abi } from "../../abi/ERC20ABI";
import { FMDABI as fmd } from "../../abi/FMDABI";
import { Contract } from "ethers";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/abstract-provider";

declare let window: any;

type DepositProps = {
  balance: string | undefined;
  contractAddress: string;
  currentAccount: string | undefined;
};

export default function Deposit(props: DepositProps) {
  const addressContract = "0x94eEA30bd59E7BB40866d77eb00B92C045Fe741b";
  const currentAccount = props.currentAccount;
  const [amount, setAmount] = useState<string>("0.1");
  const [toAddress, setToAddress] = useState<string>("");

  async function transfer(event: React.FormEvent) {
    event.preventDefault();
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const FMD: Contract = new ethers.Contract(addressContract, fmd, signer);

    FMD.deposit(parseEther(amount), { value: ethers.utils.parseEther(amount) })
      .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`);
        tr.wait().then((receipt: TransactionReceipt) => {
          console.log("transfer receipt", receipt);
        });
      })
      .catch((e: Error) => console.log(e));
  }

  const handleChange = (value: string) => setAmount(value);

  return (
    <>
      <Container rounded="3xl" bg="pink.100">
        <VStack padding="5">
          <Box>
            <b>Deposit:</b>
          </Box>
          <Box bg="pink.50" rounded="3xl" width="2xl" padding="10">
            <form onSubmit={transfer}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  min={0.1}
                  defaultValue={amount}
                  step={0.05}
                  onChange={handleChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  marginTop="5"
                  bg="pink.600"
                  color="white"
                  type="submit"
                  _hover={{
                    background: "pink.700",
                    color: "white",
                  }}
                  isDisabled={!currentAccount}
                >
                  Deposit
                </Button>
              </FormControl>
            </form>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

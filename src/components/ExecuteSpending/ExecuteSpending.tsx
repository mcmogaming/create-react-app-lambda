import { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Container,
  Box,
  Button,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { FMDABI as fmd } from "../../abi/FMDABI";
import { Contract } from "ethers";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/abstract-provider";

declare let window: any;

type ExecuteSpendingProps = {
  balance: string | undefined;
  contractAddress: string;
  currentAccount: string | undefined;
};

export default function ExecuteSpending(props: ExecuteSpendingProps) {
  const addressContract = "0x94eEA30bd59E7BB40866d77eb00B92C045Fe741b";
  const currentAccount = props.currentAccount;
  const [amount, setAmount] = useState<string>("");
  const [bool, setBool] = useState<string>();

  async function transfer(event: React.FormEvent) {
    event.preventDefault();
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const FMD: Contract = new ethers.Contract(addressContract, fmd, signer);

    FMD.executeSpending(amount)
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
            <b>Execute Spending:</b>
          </Box>
          <Box bg="pink.50" rounded="3xl" width="2xl" padding="10">
            <form onSubmit={transfer}>
              <FormControl>
                <FormLabel>Spending ID</FormLabel>
                <NumberInput defaultValue={amount} onChange={handleChange}>
                  <NumberInputField />
                </NumberInput>
                <Button
                  marginTop={"5"}
                  bg="pink.600"
                  color="white"
                  type="submit"
                  _hover={{
                    background: "pink.700",
                    color: "white",
                  }}
                  isDisabled={!currentAccount}
                >
                  Execute
                </Button>
              </FormControl>
            </form>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

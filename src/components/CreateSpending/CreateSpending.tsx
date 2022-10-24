import { useState } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Container,
  Box,
  Button,
  Input,
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

type CreateSpendingProps = {
  balance: string | undefined;
  contractAddress: string;
  currentAccount: string | undefined;
};

export default function CreateSpending(props: CreateSpendingProps) {
  const addressContract = "0x94eEA30bd59E7BB40866d77eb00B92C045Fe741b";
  const currentAccount = props.currentAccount;
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  async function transfer(event: React.FormEvent) {
    event.preventDefault();
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const FMD: Contract = new ethers.Contract(addressContract, fmd, signer);

    FMD.createSpending(address, parseEther(amount), purpose)
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
            <b>Create Spending:</b>
          </Box>
          <Box bg="pink.50" rounded="3xl" width="2xl" padding="10">
            <form onSubmit={transfer}>
              <FormControl>
                <FormLabel>Purpose</FormLabel>
                <Input
                  id="purpose"
                  type="text"
                  required
                  onChange={(e) => setPurpose(e.target.value)}
                />
                <FormLabel>Reciever Address:</FormLabel>
                <Input
                  id="address"
                  type="text"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormLabel>Spending Amount:</FormLabel>
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
                  Create Spending
                </Button>
              </FormControl>
            </form>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

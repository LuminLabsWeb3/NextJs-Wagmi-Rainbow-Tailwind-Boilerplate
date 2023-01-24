import { React, useEffect } from 'react';
import {
  useAccount,
  useBalance,
  useBlockNumber,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useSigner,
  useSwitchNetwork,
  useNetwork,
} from 'wagmi';

import {
  Container,
  Card,
  Row,
  Text,
  Spacer,
  Button,
  Image,
  Grid,
  Loading,
  Textarea,
  useInput,
} from '@nextui-org/react';
import {
  STORAGE_CONTRACT_ADDRESS,
  STORAGE_ABI,
} from '../constants/simpleStorage';

function SetValue({ value }) {
  const { data: signer } = useSigner();

  const { config } = usePrepareContractWrite({
    address: STORAGE_CONTRACT_ADDRESS,
    abi: STORAGE_ABI,
    functionName: 'set',
    signer: signer,
    args: [value],
    onSuccess(data) {
      console.log('Success', data);
    },
    onError(error) {
      console.log('Error', error);
    },
    overrides: {
      value: ethers.utils.parseEther('0.01'),
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      <Button color="warning" disabled={!write} onClick={() => write?.()}>
        Set Value
      </Button>
    </>
  );
}
function GetValue({}) {
  const contractRead = useContractRead({
    address: STORAGE_CONTRACT_ADDRESS,
    abi: STORAGE_ABI,
    functionName: 'get',
    watch: true,
  });
  const data = contractRead.data;
  return (
    <Text h6 size={15} color="black" css={{ m: 0 }}>
      Value : {data.toString()}
    </Text>
  );
}
function GetBalance({ data, loading }) {
  if (loading) return <div>Loading</div>;
  else
    return (
      <Text>
        Balance: {data?.formatted} {data?.symbol}
      </Text>
    );
}
function GetAddress({ data, connecting, reconnecting, disconnected }) {
  if (connecting || reconnecting) return <Text>Loading</Text>;
  if (disconnected) return <Text>Disconnected</Text>;
  else return <Text>Address: {data}</Text>;
}
export default function Body() {
  const {
    address,
    isConnected,
    connector,
    isConnecting: userConnecting,
    isReconnecting: userReconnecting,
    isDisconnected: userDisconnected,
  } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput('999');

  return (
    <Container>
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <GetBalance data={balance} loading={isBalanceLoading} />
          </Row>
        </Card.Body>
      </Card>{' '}
      <Spacer />
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <GetAddress
              data={address}
              connecting={userConnecting}
              reconnecting={userReconnecting}
              disconnected={userDisconnected}
            />
          </Row>
        </Card.Body>
      </Card>
      <Spacer />
      <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <GetValue></GetValue>
          </Row>
        </Card.Body>
      </Card>{' '}
      <Spacer />
      <Card css={{ backgroundColor: '$errorShadow' }}>
        <Card.Body>
          <Row align="flex-end" justify="center">
            <Textarea {...bindings} label="insert Value" maxRows={1} />
            <Spacer x={1} y={0} />
            <SetValue value={controlledValue}></SetValue>
          </Row>
        </Card.Body>
      </Card>{' '}
    </Container>
  );
}

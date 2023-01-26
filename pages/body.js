import { React } from 'react';
import {
  useAccount,
  useBalance,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useSigner,
} from 'wagmi';

import {
  Container,
  Card,
  Row,
  Text,
  Spacer,
  Button,
  Textarea,
  useInput,
} from '@nextui-org/react';
import {
  STORAGE_CONTRACT_ADDRESS,
  STORAGE_ABI,
} from '../constants/simpleStorage';
import Carousel from '../components/carousel';
import Timeline from '../components/Timeline';
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
    // overrides: {
    //   value: ethers.utils.parseEther('0.01'),
    // },
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
  if (data === undefined) return null;
  return (
    <Text h6 size={15} color="black" css={{ m: 0 }}>
      Value : {data.toString()}
    </Text>
  );
}
function GetBalance({ data, loading, fetched }) {
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
    isConnecting: userConnecting,
    isReconnecting: userReconnecting,
    isDisconnected: userDisconnected,
  } = useAccount();
  const {
    data: balance,
    isLoading: isBalanceLoading,
    isFetched: isBalanceFetched,
  } = useBalance({
    address: address,
  });
  const {
    value: controlledValue,
    setValue: setControlledValue,
    reset,
    bindings,
  } = useInput('999');

  return (
    <div>
      <section className="h-5/6">
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
            <div className="relative z-10 lg:py-16">
              <div className="relative h-64 sm:h-80 lg:h-full">
                <img
                  alt="House"
                  src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="relative flex items-center bg-gray-100">
              <span className="hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-100" />
              <div className="p-8 sm:p-16 lg:p-24">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Tempore, debitis.
                </h2>
                <p className="mt-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid, molestiae! Quidem est esse numquam odio deleniti,
                  beatae, magni dolores provident quaerat totam eos, aperiam
                  architecto eius quis quibusdam fugiat dicta.
                </p>
                <a
                  href="#"
                  className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-8 dark:bg-gray-800 dark:text-gray-100  items-center">
        <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            About the&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Collection
            </span>{' '}
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vitae facilisis diam. className aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
          </p>{' '}
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vitae facilisis diam. className aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
          </p>
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              className="px-8 py-3 font-semibold rounded-full bg-green-700 text-white"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      <section>
        <Carousel></Carousel>
      </section>{' '}
      <Timeline></Timeline>
    </div>
  );
}

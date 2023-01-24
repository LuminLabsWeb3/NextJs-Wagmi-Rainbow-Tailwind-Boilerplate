import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Avatar,
} from '@nextui-org/react';

function ConnectWallet({ show = 'always' }) {
  const { isConnected } = useAccount();
  if (
    (show === 'connected' && !isConnected) ||
    (show === 'disconnected' && isConnected)
  )
    return null;
  return <ConnectButton />;
}

function Header() {
  return (
    <Navbar>
      <Navbar.Brand className="justify-between">
        <Avatar text="JR" size="md" />
        <Text b color="inherit" hideIn="xs" className="p-4">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="#">Features</Navbar.Link>
        <Navbar.Link isActive href="#">
          Customers
        </Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Company</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <ConnectWallet />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default Header;

import React from "react";
import { Navbar, Text, Avatar } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <Navbar>
      <Navbar.Brand>
        <Avatar
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="sm"
        />
        <Text b hideIn="xs" css={{ pl: "$8" }}>
          Yusuf
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <ConnectButton></ConnectButton>
      </Navbar.Content>
    </Navbar>
  );
}

export default Header;

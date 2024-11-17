import React, {useState} from "react";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Icon
} from "@chakra-ui/react";
import { SiWwise } from "react-icons/si";
import { IoIosArrowDropright } from "react-icons/io";
import { useSidenav } from "./sidenav-context/sidenav-context";
import SidenavItems, { SidenavItem } from "./sidenav-items/sidenav-items";

export interface SidenavProps {
  navItems: SidenavItem[];
}

export function Sidenav({ navItems }: SidenavProps) {
  const [isOpen, onClose ] = useState(false);
  return (
    <React.Fragment>
      {!isOpen &&
      <VStack spacing="5" as="nav" display="flex" background="aliceblue" borderRadius="15px" height="100%" paddingTop={5} >
        <Icon as={IoIosArrowDropright} boxSize={4} onClick={()=>{
          onClose(!isOpen);
        }} cursor="pointer" className="expand-icon"/>
        <Icon as={SiWwise} boxSize={8}/> {/*OR PUT YOUR LOGO HERE */}
        <SidenavItems navItems={navItems} />
      </VStack>
      }
      <Drawer placement="left"
      onClose={()=>{
        onClose(!isOpen);
      }} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className="drawerContent--Expanded">
          <DrawerCloseButton />
          <DrawerHeader>P&D Health Inc.</DrawerHeader>
          <DrawerBody>
            <SidenavItems navItems={navItems} mode="over" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidenav;

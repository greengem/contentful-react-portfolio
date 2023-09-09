import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import React from 'react';
import { useRouter } from 'next/router';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Gem } from 'react-bootstrap-icons';
import { Switch } from "@nextui-org/react";
import { SunIcon } from "../Icons/SunIcon";
import { MoonIcon } from "../Icons/MoonIcon";

function AppNavbar({ isDarkMode, setIsDarkMode }) {
  const router = useRouter();

  return (
    <Navbar isMenuDefaultOpen maxWidth="full" className="container">
      
      <NavbarBrand><Link color="foreground" href="/"><Gem className='me-2' /></Link> <p className="font-bold text-inherit"><Link color="foreground" href="/">CHRIS WAITT</Link></p></NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem isActive={router.pathname === '/'}>
          <Link href="/" as={NextLink} color="danger">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname.startsWith('/projects')}>
          <Link href="/projects" as={NextLink} color="danger">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname.startsWith('/tech-stack')}>
          <Link href="/tech-stack" as={NextLink} color="danger">
            Tech
          </Link>
        </NavbarItem>
      <Switch
          size="sm"
          className="ms-2"
          isSelected={isDarkMode}
          color="danger"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          onValueChange={(isSelected) => setIsDarkMode(isSelected)}
        ></Switch>
      </NavbarContent>
    </Navbar>
  );
}

export default AppNavbar;

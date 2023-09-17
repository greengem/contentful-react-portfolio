'use client'
{/* Find alternative to useState, documentation needs updating */}
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import React from 'react';
import {  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/navbar";
import { Gem, ChevronDown, ArrowLeftRight } from 'react-bootstrap-icons';
import { ThemeSwitcher } from "../DarkModeToggle/DarkModeToggle";

function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const icons = {
    arrowlr: <ArrowLeftRight />,
    chevron: <ChevronDown />,
  }

  return (
    <Navbar maxWidth="xl" onMenuOpenChange={setIsMenuOpen}>
      <NavbarBrand><Link color="foreground" href="/" as={NextLink}><span className="text-secondary"><Gem className='me-2' /></span> Chris Waitt</Link></NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link href="/" as={NextLink} color="foreground">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/projects" as={NextLink} color="foreground">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/tech-stack" as={NextLink} color="foreground">
            Tech Stack
          </Link>
        </NavbarItem>
        </NavbarContent>
        <ThemeSwitcher />
        <NavbarMenu>
          <NavbarMenuItem><Link href="/" as={NextLink} color="foreground" className="w-full" size="lg">Home</Link></NavbarMenuItem>
          <NavbarMenuItem><Link href="/projects" as={NextLink} color="foreground" className="w-full" size="lg">Projects</Link></NavbarMenuItem>
          <NavbarMenuItem><Link href="/tech-stack" as={NextLink} color="foreground" className="w-full" size="lg">Tech Stack</Link></NavbarMenuItem>
      </NavbarMenu>
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
    </Navbar>
  );
}

export default AppNavbar;

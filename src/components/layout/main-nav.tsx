"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          className="h-9 w-9 rounded-lg"
          src="/images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <Button variant="ghost">Features</Button>
        <Button variant="ghost">Products</Button>
      </nav>
    </div>
  );
}

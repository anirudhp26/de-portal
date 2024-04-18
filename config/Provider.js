"use client";
import React from "react";
import SessionProvider from "./providers/SessionProvider";
export function Provider({ children, session }) {
  return (
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
  );
}
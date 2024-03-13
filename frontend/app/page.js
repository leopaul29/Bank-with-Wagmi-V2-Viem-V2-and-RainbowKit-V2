"use client";
import { useAccount } from "wagmi";
import NotConnected from "@/components/NotConnected";
import Bank from "@/components/Bank";

export default function Home() {
	const { isConnected } = useAccount();

	return <>{isConnected ? <Bank /> : <NotConnected />}</>;
}

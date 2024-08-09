"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Billionaire {
	id: string;
	name: string;
	squareImage: string;
	netWorth: string;
	industries: string[];
}

export default function BillionaireList() {
	const [billionaires, setBillionaires] = useState<Billionaire[]>([]);

	useEffect(() => {
		async function fetchBillionaires() {
			try {
				const res = await fetch("https://billions-api.nomadcoders.workers.dev/");
				const data = await res.json();

				setBillionaires(data);
			} catch (error) {
				console.error("Failed to fetch billionaires:", error);
			}
		}

		fetchBillionaires();
	}, []);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
			{billionaires.map((billionaire) => (
				<Link
					href={`/person/${billionaire.id}`}
					key={billionaire.id}
				>
					<div className='border p-4 rounded shadow hover:scale-105 transition'>
						<Image
							src={billionaire.squareImage}
							alt={billionaire.name}
							width={400}
							height={400}
							className='w-full h-48 object-cover rounded mb-4'
						/>
						<h2>{billionaire.name}</h2>
						<p>{`${billionaire.netWorth} / ${billionaire.industries}`}</p>
					</div>
				</Link>
			))}
		</div>
	);
}

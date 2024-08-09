"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface BillionaireDetail {
	id: string;
	state: string;
	city: string;
	name: string;
	country: string;
	position: number;
	industries: string[];
	financialAssets: [
		{
			exchange: string;
			ticker: string;
			companyName: string;
			numberOfShares?: number;
			sharePrice: number;
			currencyCode: string;
			exchangeRate: number;
			interactive: boolean;
			currentPrice: number;
		}
	];
	netWorth: string;
	bio: string;
	image: string;
	squareImage: string;
}

const PersonDetail = () => {
	const [billionaire, setBillionaire] = useState<BillionaireDetail | null>(null);
	const { id } = useParams();

	useEffect(() => {
		async function fetchBillionaire() {
			const res = await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`);
			const data = await res.json();
			setBillionaire(data);
		}

		fetchBillionaire();
	}, [id]);

	if (!billionaire) return <div>Loading...</div>;

	return (
		<>
			<main className='container mx-auto p-5 bg-gray-950 h-screen'>
				<Image
					src={billionaire.squareImage} // squareImage 사용
					alt={billionaire.name}
					width={400}
					height={400}
					className='w-full md:w-1/3 h-auto rounded mb-4 md:mb-0 md:mr-4 pb-3'
				/>
				<h1 className='text-3xl font-bold mb-4'>{billionaire.name}</h1>
				<div className='flex flex-col md:flex-row gap-2'>
					<div>
						<p className='text-gray-200 mb-2'>Net Worth: {billionaire.netWorth}</p>
						<p className='text-gray-200 mb-2'>Country: {billionaire.country}</p>
						<p className='text-gray-200 mb-2'>Industries: {billionaire.industries.join(", ")}</p>
						<p className='text-gray-200'>{billionaire.bio}</p>
					</div>
				</div>
			</main>

			<div className='bg-gray-950 mt-5 py-10 px-5'>
				<h1 className='text-3xl mb-3'>Financial Assets</h1>
				<div className='flex flex-row'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
						{billionaire.financialAssets.map((financialAsset, index) => (
							<article
								key={index}
								className='border border-slate-600 p-3'
							>
								<p>Ticker: {financialAsset.ticker}</p>
								<p>Shares: {financialAsset.sharePrice}</p>
								{financialAsset.numberOfShares ? <p>Excersie Price: {financialAsset.numberOfShares}</p> : <></>}
							</article>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default PersonDetail;
